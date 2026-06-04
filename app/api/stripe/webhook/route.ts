import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);


async function updateHubSpotContact(email: string, properties: Record<string, string>) {
  const apiKey = process.env.HUBSPOT_API_KEY;
  if (!apiKey || !email) return;
  try {
    const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }] }),
    });
    const searchData = await searchRes.json();
    const contactId = searchData?.results?.[0]?.id;
    if (contactId) {
      await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ properties }),
      });
    }
  } catch (err) {
    console.error('HubSpot update error:', err);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case "checkout.session.completed": {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      ) as any;

      const { error: supabaseError } = await supabase
        .from("profiles")
        .update({
          stripe_customer_id: session.customer as string,
          subscription_status: "active",
          subscription_plan: subscription.items.data[0].price.recurring?.interval === "year" ? "annual" : "monthly",
          subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
        })
        .eq("id", session.metadata?.userId);

      if (supabaseError) {
        console.error("Supabase update failed:", JSON.stringify(supabaseError));
      } else {
        console.log("Supabase update succeeded for userId:", session.metadata?.userId);
      }

      // Notify HubSpot — subscription started
      const customerEmail1 = session.customer_details?.email || session.customer_email;
      if (customerEmail1) {
        await updateHubSpotContact(customerEmail1, {
          subscription_status__relocate2day_: 'premium',
          subscription_start_date__relocate2day_: new Date().toISOString().split('T')[0],
        });
        // Send premium welcome email
        await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'welcome_premium', email: customerEmail1 }),
        });
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as any;
      const customerId = subscription.customer as string;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          subscription_status: subscription.status,
          subscription_plan: subscription.items.data[0].price.recurring?.interval === "year" ? "annual" : "monthly",
          subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
        })
        .eq("stripe_customer_id", customerId);

      if (updateError) {
        console.error("Supabase subscription.updated failed:", JSON.stringify(updateError));
      } else {
        console.log("Supabase subscription.updated succeeded for customerId:", customerId);
      }

      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as any;
      const customerId = subscription.customer as string;

      const { error: deleteError } = await supabase
        .from("profiles")
        .update({
          subscription_status: "free",
          subscription_plan: "free",
          subscription_end_date: null,
        })
        .eq("stripe_customer_id", customerId);

      if (deleteError) {
        console.error("Supabase subscription.deleted failed:", JSON.stringify(deleteError));
      } else {
        console.log("Supabase subscription.deleted succeeded for customerId:", customerId);
      }

      // Notify HubSpot — subscription cancelled
      const { data: cancelledProfile } = await supabase
        .from("profiles")
        .select("email")
        .eq("stripe_customer_id", customerId)
        .single();
      if (cancelledProfile?.email) {
        await updateHubSpotContact(cancelledProfile.email, {
          subscription_status__relocate2day_: 'cancelled',
          cancellation_date__relocate2day_: new Date().toISOString().split('T')[0],
        });
        // Send cancellation email
        await fetch(process.env.NEXT_PUBLIC_SITE_URL + '/api/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'cancellation', email: cancelledProfile.email }),
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}