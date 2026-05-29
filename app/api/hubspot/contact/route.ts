import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, firstName, lastName, nationality, income, lifeStage, industry, topCountry, source, marketingOptIn } = body;

    const apiKey = process.env.HUBSPOT_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "HubSpot API key not configured" }, { status: 500 });
    }

    // Check if contact already exists
    const searchResponse = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: "email",
                  operator: "EQ",
                  value: email,
                },
              ],
            },
          ],
        }),
      }
    );

    const searchData = await searchResponse.json();
    const existingContact = searchData.results?.[0];

    const properties: Record<string, string> = {
      email,
      ...(firstName && { firstname: firstName }),
      ...(lastName && { lastname: lastName }),
      ...(nationality && { nationality__relocate2day_: nationality }),
      ...(income && { annual_income__relocate2day_: income }),
      ...(lifeStage && { life_stage__relocate2day_: lifeStage }),
      ...(industry && { industry: industry }),
      ...(topCountry && { top_country_match__relocate2day_: topCountry }),
      ...(source && { lead_source: source }),
      ...(marketingOptIn !== undefined && { marketing_opt_in__relocate2day_: marketingOptIn ? 'true' : 'false' }),
    };

    if (existingContact) {
      // Update existing contact
      await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${existingContact.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ properties }),
        }
      );
    } else {
      // Create new contact
      await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ properties }),
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("HubSpot contact error:", err);
    return NextResponse.json({ error: "Failed to sync contact" }, { status: 500 });
  }
}