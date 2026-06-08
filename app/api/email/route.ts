import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Rachel from Relocate2Day <rachel@relocate2day.com>";
const SITE = "https://relocate2day.com";

const logo = `<img src="${SITE}/logo_tight.png" alt="Relocate2Day" style="height:60px;width:auto;margin-bottom:24px;" />`;

const baseStyle = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 32px;
  color: #1a1a2e;
  line-height: 1.6;
`;

const btnStyle = `
  display: inline-block;
  background: linear-gradient(135deg, #7c3aed, #ec4899, #f97316);
  color: white !important;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  margin-top: 24px;
`;

const footerStyle = `
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
  font-size: 12px;
  color: #9ca3af;
`;

function buildEmail(body: string): string {
  return `<div style="${baseStyle}">${logo}${body}<div style="${footerStyle}">© ${new Date().getFullYear()} Relocate2Day · <a href="${SITE}/privacy" style="color:#9ca3af;">Privacy Policy</a> · <a href="${SITE}/terms" style="color:#9ca3af;">Terms</a><br/>You're receiving this because you signed up at relocate2day.com. <a href="${SITE}/account" style="color:#9ca3af;">Manage preferences</a></div></div>`;
}

const emails: Record<string, (name: string) => { subject: string; html: string }> = {

  welcome_free: (name) => ({
    subject: "Welcome to Relocate2Day 🌍",
    html: buildEmail(`
      <p>Hi ${name},</p>
      <p>Welcome! You've just taken the first step towards your new life in Europe.</p>
      <p>Here's what you can do right now for free:</p>
      <p>🌍 Take the <strong>country quiz</strong> to find your perfect destination<br/>
      🏙️ Discover the best city for your lifestyle<br/>
      ✅ Build your personalised relocation checklist</p>
      <p>I built Relocate2Day because moving to Europe shouldn't feel overwhelming. I'm here to help every step of the way.</p>
      <p>To new adventures,<br/><strong>Rachel</strong><br/>Founder, Relocate2Day</p>
      <a href="${SITE}/quiz" style="${btnStyle}">Start your country quiz →</a>
    `),
  }),

  followup_day2: (name) => ({
    subject: "Did you find your perfect country? 🗺️",
    html: buildEmail(`
      <p>Hi ${name},</p>
      <p>Have you taken the country quiz yet? It takes 2 minutes and gives you a personalised match based on your lifestyle, income, and priorities.</p>
      <p>Already done it? Try the <strong>city quiz</strong> next — it narrows down exactly which city suits you best.</p>
      <p>With a free account you get 1 city result. Premium unlocks your top 4 cities with full comparisons.</p>
      <p>Hasta pronto,<br/><strong>Rachel</strong><br/>Founder, Relocate2Day</p>
      <a href="${SITE}/quiz" style="${btnStyle}">Take the city quiz →</a>
    `),
  }),

  followup_day7: (name) => ({
    subject: "Unlock everything — your relocation toolkit awaits 💎",
    html: buildEmail(`
      <p>Hi ${name},</p>
      <p>You've been exploring Relocate2Day for a week — here's what you're missing on the free plan:</p>
      <p>✅ Top 4 city matches (vs 1 on free)<br/>
      ✅ Full city guides — neighbourhoods, cost of living, healthcare<br/>
      ✅ Tax calculator — compare your take-home pay across countries<br/>
      ✅ Personalised relocation checklist saved to your account</p>
      <p>Premium is €12/month or €99/year — and comes with a <strong>14-day free trial</strong>. No risk.</p>
      <p>Hasta pronto,<br/><strong>Rachel</strong><br/>Founder, Relocate2Day</p>
      <a href="${SITE}/auth/signup" style="${btnStyle}">Start free trial →</a>
    `),
  }),

  welcome_premium: (name) => ({
    subject: "Welcome to Relocate2Day Premium 🎉",
    html: buildEmail(`
      <p>Hi ${name},</p>
      <p>You're now a Premium member — here's everything unlocked for you:</p>
      <p>🏙️ <strong>City quiz</strong> — your top 4 city matches<br/>
      📖 <strong>Full city guides</strong> — neighbourhoods, healthcare, transport, expat life<br/>
      💰 <strong>Tax calculator</strong> — compare take-home pay across all 6 countries<br/>
      ✅ <strong>Relocation checklist</strong> — personalised and saved to your account</p>
      <p>Not sure where to start? I'd suggest building your checklist first — it gives you a clear roadmap for your move.</p>
      <p>To new adventures,<br/><strong>Rachel</strong><br/>Founder, Relocate2Day</p>
      <a href="${SITE}/checklist" style="${btnStyle}">Build my checklist →</a>
    `),
  }),

  premium_day3: (name) => ({
    subject: "Have you built your relocation checklist yet? ✅",
    html: buildEmail(`
      <p>Hi ${name},</p>
      <p>Your personalised relocation checklist is one of the most useful things on Relocate2Day — and it only takes 2 minutes to generate.</p>
      <p>It's tailored to your nationality, destination, and situation — covering everything from visa applications to finding a doctor, opening a bank account to registering with local authorities.</p>
      <p>Here whenever you need me,<br/><strong>Rachel</strong><br/>Founder, Relocate2Day</p>
      <a href="${SITE}/checklist" style="${btnStyle}">Create my checklist →</a>
    `),
  }),

  cancellation: (name) => ({
    subject: "Sorry to see you go 😢",
    html: buildEmail(`
      <p>Hi ${name},</p>
      <p>Your Premium subscription has been cancelled. You'll keep full access until the end of your current billing period.</p>
      <p>If there was something missing or something didn't work as expected, I'd genuinely love to hear from you — just reply to this email. Every piece of feedback helps me make Relocate2Day better.</p>
      <p>If you change your mind, you can resubscribe anytime — your checklist and quiz results will still be there waiting for you.</p>
      <p>Here whenever you need me,<br/><strong>Rachel</strong><br/>Founder, Relocate2Day</p>
      <a href="${SITE}/account" style="${btnStyle}">Resubscribe →</a>
    `),
  }),

  winback: (name) => ({
    subject: "Your Premium access expires soon ⏳",
    html: buildEmail(`
      <p>Hi ${name},</p>
      <p>Just a friendly reminder that your Relocate2Day Premium access expires soon.</p>
      <p>After that you'll lose access to:</p>
      <p>💰 The tax calculator<br/>
      📖 Full city guides<br/>
      ✅ Your saved relocation checklist</p>
      <p>Resubscribe now and pick up exactly where you left off — still just €12/month or €99/year.</p>
      <p>Hasta pronto,<br/><strong>Rachel</strong><br/>Founder, Relocate2Day</p>
      <a href="${SITE}/account" style="${btnStyle}">Resubscribe now →</a>
    `),
  }),

  review_request: (name) => ({
    subject: "How is your relocation planning going? ⭐",
    html: buildEmail(`
      <p>Hi ${name},</p>
      <p>It's been two weeks since you joined Relocate2Day — I'd love to know how your planning is going!</p>
      <p>If the platform has been helpful, it would mean the world if you left a quick review on Trustpilot. It takes 2 minutes and helps other people planning their move to Europe find us.</p>
      <p>And if something hasn't worked well, just reply to this email — I read every message personally.</p>
      <p>With gratitude,<br/><strong>Rachel</strong><br/>Founder, Relocate2Day</p>
      <a href="https://www.trustpilot.com/review/relocate2day.com" style="${btnStyle}">Leave a review →</a>
    `),
  }),
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Handle Supabase Database Webhook (new profile INSERT)
    if (body.type === "INSERT" && body.table === "profiles" && body.record) {
      const { email, full_name } = body.record;
      if (!email) return NextResponse.json({ error: "No email" }, { status: 400 });
      const firstName = full_name?.split(" ")[0] || "there";
      const { subject, html } = emails["welcome_free"](firstName);
      const { error: resendError } = await resend.emails.send({ from: FROM, to: email, subject, html });
      if (resendError) {
        console.error("Resend error (welcome_free):", resendError);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
      }
      return NextResponse.json({ success: true });
    }

    // Handle internal API calls (scheduled emails, Stripe webhook, etc.)
    const { type, email, firstName } = body;

    if (!type || !email) {
      return NextResponse.json({ error: "type and email required" }, { status: 400 });
    }

    const name = firstName || "there";
    const emailFn = emails[type];

    if (!emailFn) {
      return NextResponse.json({ error: `Unknown email type: ${type}` }, { status: 400 });
    }

    const { subject, html } = emailFn(name);

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: email,
      subject,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Email API error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}