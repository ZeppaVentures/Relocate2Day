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

  await supabase
    .from("profiles")
    .update({
      stripe_customer_id: session.customer as string,
      subscription_status: "active",
      subscription_plan: subscription.items.data[0].price.recurring?.interval === "year" ? "annual" : "monthly",
      subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
    })
    .eq("id", session.metadata?.userId);

  break;
}
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      await supabase
        .from("profiles")
        .update({
          subscription_status: subscription.status,
          subscription_plan: subscription.items.data[0].price.recurring?.interval === "year" ? "annual" : "monthly",
          subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
        })
        .eq("stripe_customer_id", customerId);

      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      await supabase
        .from("profiles")
        .update({
          subscription_status: "free",
          subscription_plan: "free",
          subscription_end_date: null,
        })
        .eq("stripe_customer_id", customerId);

      break;
    }
  }

  return NextResponse.json({ received: true });
}