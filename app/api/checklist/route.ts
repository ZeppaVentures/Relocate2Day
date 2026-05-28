import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, city, country, nationality, nationalityType, employmentType, familySituation } = body;

    const prompt = `You are a European relocation expert. Create a concise personalised relocation checklist for a ${nationality} (${nationalityType}) moving to ${city}, ${country}. Employment: ${employmentType}. Family: ${familySituation}.

Tailor visa/residency steps based on nationality type (EU=free movement, UK=post-Brexit rules, non-EU=full visa required).

Use native language terms e.g. NIE, Empadronamiento, NIF, Codice Fiscale, EGN etc.

Respond ONLY with JSON, no markdown:
{
  "title": "Your ${country} Relocation Checklist",
  "sections": [
    {
      "title": "3-6 Months Before Moving",
      "emoji": "📋",
      "items": [{"id": "1", "task": "Task", "details": "Details", "documents": ["Doc 1"], "category": "visa"}]
    },
    {"title": "1-3 Months Before Moving", "emoji": "🏠", "items": []},
    {"title": "First 2 Weeks After Arrival", "emoji": "✈️", "items": []},
    {"title": "First Month", "emoji": "📅", "items": []},
    {"title": "Ongoing", "emoji": "🔄", "items": []}
  ]
}

Include 3-4 items per section. Be concise and specific to ${city}, ${country}.`;

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(data));

    const text = data.content
      .map((item: { type: string; text?: string }) => item.text || "")
      .join("");
    const clean = text.replace(/```json|```/g, "").trim();
    const checklist = JSON.parse(clean);

    // Add completed field to each item
    checklist.sections = checklist.sections.map((section: { title: string; emoji: string; items: { id: string; task: string; details: string; documents: string[]; category: string }[] }) => ({
      ...section,
      items: section.items.map((item: { id: string; task: string; details: string; documents: string[]; category: string }) => ({
        ...item,
        completed: false,
      })),
    }));

    // Save to Supabase
    const { data: saved, error } = await supabaseAdmin
      .from("checklists")
      .insert({
        user_id: userId,
        title: checklist.title,
        city,
        country,
        nationality,
        nationality_type: nationalityType,
        employment_type: employmentType,
        family_situation: familySituation,
        items: checklist.sections,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ id: saved.id, checklist });
  } catch (err) {
    console.error("Checklist API error:", err);
    return NextResponse.json({ error: "Failed to generate checklist", detail: String(err) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

    const { data, error } = await supabaseAdmin
      .from("checklists")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ checklists: data });
  } catch (err) {
    console.error("Checklist GET error:", err);
    return NextResponse.json({ error: "Failed to fetch checklists" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { checklistId, items } = body;

    const { error } = await supabaseAdmin
      .from("checklists")
      .update({ items, updated_at: new Date().toISOString() })
      .eq("id", checklistId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Checklist PATCH error:", err);
    return NextResponse.json({ error: "Failed to update checklist" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const checklistId = searchParams.get("id");

    if (!checklistId) return NextResponse.json({ error: "id required" }, { status: 400 });

    const { error } = await supabaseAdmin
      .from("checklists")
      .delete()
      .eq("id", checklistId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Checklist DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete checklist" }, { status: 500 });
  }
}