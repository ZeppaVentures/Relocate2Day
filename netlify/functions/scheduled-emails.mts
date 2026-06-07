import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SITE = process.env.NEXT_PUBLIC_SITE_URL!;

async function sendEmail(type: string, email: string, firstName: string) {
  await fetch(`${SITE}/api/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, email, firstName }),
  });
}

export default async function handler() {
  const now = new Date();

  // WINBACK — cancelled users whose subscription_end_date was 3 days ago
  const winbackDate = new Date(now);
  winbackDate.setDate(winbackDate.getDate() - 3);
  const winbackDay = winbackDate.toISOString().split("T")[0];

  const { data: winbackUsers } = await supabase
    .from("profiles")
    .select("email, full_name")
    .eq("subscription_status", "free")
    .gte("subscription_end_date", `${winbackDay}T00:00:00`)
    .lte("subscription_end_date", `${winbackDay}T23:59:59`);

  for (const user of winbackUsers ?? []) {
    console.log("Sending winback to:", user.email);
    await sendEmail("winback", user.email, user.full_name?.split(" ")[0] || "there");
  }

  // REVIEW REQUEST — active users who signed up 14 days ago
  const reviewDate = new Date(now);
  reviewDate.setDate(reviewDate.getDate() - 14);
  const reviewDay = reviewDate.toISOString().split("T")[0];

  const { data: reviewUsers } = await supabase
    .from("profiles")
    .select("email, full_name")
    .eq("subscription_status", "active")
    .gte("created_at", `${reviewDay}T00:00:00`)
    .lte("created_at", `${reviewDay}T23:59:59`);

  for (const user of reviewUsers ?? []) {
    console.log("Sending review_request to:", user.email);
    await sendEmail("review_request", user.email, user.full_name?.split(" ")[0] || "there");
  }
}

export const config = {
  schedule: "0 9 * * *", // runs every day at 9am UTC
};
