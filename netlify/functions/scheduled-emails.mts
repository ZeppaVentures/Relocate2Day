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

  // FOLLOWUP DAY 2 — free users who signed up 2 days ago
  const day2Date = new Date(now);
  day2Date.setDate(day2Date.getDate() - 2);
  const day2Day = day2Date.toISOString().split("T")[0];

  const { data: day2Users } = await supabase
    .from("profiles")
    .select("email, full_name")
    .eq("subscription_status", "free")
    .gte("created_at", `${day2Day}T00:00:00`)
    .lte("created_at", `${day2Day}T23:59:59`);

  for (const user of day2Users ?? []) {
    console.log("Sending followup_day2 to:", user.email);
    await sendEmail("followup_day2", user.email, user.full_name?.split(" ")[0] || "there");
  }

  // FOLLOWUP DAY 7 — free users who signed up 7 days ago
  const day7Date = new Date(now);
  day7Date.setDate(day7Date.getDate() - 7);
  const day7Day = day7Date.toISOString().split("T")[0];

  const { data: day7Users } = await supabase
    .from("profiles")
    .select("email, full_name")
    .eq("subscription_status", "free")
    .gte("created_at", `${day7Day}T00:00:00`)
    .lte("created_at", `${day7Day}T23:59:59`);

  for (const user of day7Users ?? []) {
    console.log("Sending followup_day7 to:", user.email);
    await sendEmail("followup_day7", user.email, user.full_name?.split(" ")[0] || "there");
  }

  // PREMIUM DAY 3 — premium users whose subscription started 3 days ago
  const premiumDay3Date = new Date(now);
  premiumDay3Date.setDate(premiumDay3Date.getDate() - 3);
  const premiumDay3Day = premiumDay3Date.toISOString().split("T")[0];

  const { data: premiumDay3Users } = await supabase
    .from("profiles")
    .select("email, full_name")
    .eq("subscription_status", "active")
    .gte("subscription_start_date", `${premiumDay3Day}T00:00:00`)
    .lte("subscription_start_date", `${premiumDay3Day}T23:59:59`);

  for (const user of premiumDay3Users ?? []) {
    console.log("Sending premium_day3 to:", user.email);
    await sendEmail("premium_day3", user.email, user.full_name?.split(" ")[0] || "there");
  }
}

export const config = {
  schedule: "0 9 * * *", // runs every day at 9am UTC
};