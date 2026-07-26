export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: 29 May 2026 &nbsp;·&nbsp; Effective date: 1 June 2025</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">

          {/* Intro */}
          <section>
            <p>
              This Privacy Policy explains how <strong>Rachel Buttigieg</strong> trading as{" "}
              <strong>Relocate2Day</strong> ("<strong>we</strong>", "<strong>us</strong>", or "
              <strong>our</strong>") collects, uses, stores, and protects your personal data when
              you visit <strong>relocate2day.com</strong> (the "Website") or use our services.
            </p>
            <p className="mt-4">
              We are committed to protecting your privacy in accordance with the{" "}
              <strong>General Data Protection Regulation (GDPR)</strong> and applicable data
              protection laws.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 1. Data Controller */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Data Controller</h2>
            <p>The data controller responsible for your personal data is:</p>
            <div className="mt-4 bg-gray-50 rounded-xl p-5 text-sm space-y-1">
              <p><strong>Name:</strong> Rachel Buttigieg</p>
              <p><strong>Trading as:</strong> Relocate2Day</p>
              <p><strong>Website:</strong> https://relocate2day.com</p>
              <p>
                <strong>Contact:</strong>{" "}
                <a href="mailto:privacy@relocate2day.com" className="text-blue-600 hover:underline">
                  privacy@relocate2day.com
                </a>
              </p>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* 2. What data we collect */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. What Personal Data We Collect</h2>
            <p>We collect the following categories of personal data:</p>

            <h3 className="text-base font-semibold text-gray-800 mt-5 mb-2">a) Account & Identity Data</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Full name and email address (on registration)</li>
              <li>Password (stored securely, hashed by Supabase)</li>
              <li>Google OAuth profile data if you sign in with Google</li>
            </ul>

            <h3 className="text-base font-semibold text-gray-800 mt-5 mb-2">b) Usage & Quiz Data</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Responses to our country quiz and city quiz</li>
              <li>Relocation checklist items you create or save</li>
              <li>Pages visited and features used</li>
            </ul>

            <h3 className="text-base font-semibold text-gray-800 mt-5 mb-2">c) Payment Data</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Subscription plan and billing status</li>
              <li>
                Payment card details are processed directly by{" "}
                <strong>Stripe</strong> and never stored on our servers
              </li>
            </ul>

            <h3 className="text-base font-semibold text-gray-800 mt-5 mb-2">d) Communications Data</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Emails you send to us</li>
              <li>Marketing email preferences</li>
            </ul>

            <h3 className="text-base font-semibold text-gray-800 mt-5 mb-2">e) Technical Data</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>IP address, browser type and version</li>
              <li>Device type and operating system</li>
              <li>Cookies and similar tracking technologies (see Section 8)</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          {/* 3. How we use your data */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Personal Data</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 font-semibold text-gray-800 border border-gray-100">Purpose</th>
                    <th className="text-left p-3 font-semibold text-gray-800 border border-gray-100">Legal Basis</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Create and manage your account", "Contract performance"],
                    ["Provide personalised quiz results and city guides", "Contract performance"],
                    ["Process payments and manage subscriptions via Stripe", "Contract performance"],
                    ["Save and retrieve your relocation checklist", "Contract performance"],
                    ["Send transactional emails (welcome, receipts, password reset)", "Contract performance"],
                    ["Send marketing emails (if you have opted in)", "Consent"],
                    ["Improve and analyse how the Website is used", "Legitimate interests"],
                    ["Comply with legal obligations", "Legal obligation"],
                    ["Detect and prevent fraud or abuse", "Legitimate interests"],
                  ].map(([purpose, basis], i) => (
                    <tr key={i} className="border border-gray-100">
                      <td className="p-3 text-gray-700">{purpose}</td>
                      <td className="p-3 text-gray-500">{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* 4. Third parties */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Third-Party Services & Data Sharing</h2>
            <p>
              We share your data only with trusted third-party providers necessary to deliver our
              services. We do not sell your personal data.
            </p>
            <div className="mt-4 space-y-3">
              {[
                {
                  name: "Supabase",
                  role: "Database & authentication",
                  location: "EU (AWS)",
                  link: "https://supabase.com/privacy",
                },
                {
                  name: "Stripe",
                  role: "Payment processing",
                  location: "USA (SCCs)",
                  link: "https://stripe.com/privacy",
                },
                {
                  name: "Anthropic (Claude AI)",
                  role: "AI-powered quiz results",
                  location: "USA (SCCs)",
                  link: "https://www.anthropic.com/privacy",
                },
                {
                  name: "HubSpot",
                  role: "CRM & marketing emails",
                  location: "USA (SCCs)",
                  link: "https://legal.hubspot.com/privacy-policy",
                },
                {
                  name: "Netlify",
                  role: "Website hosting",
                  location: "USA (SCCs)",
                  link: "https://www.netlify.com/privacy/",
                },
              ].map((p) => (
                <div key={p.name} className="flex items-start gap-4 bg-gray-50 rounded-lg p-4 text-sm">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{p.name}</p>
                    <p className="text-gray-500">{p.role} · {p.location}</p>
                  </div>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline whitespace-nowrap"
                  >
                    Privacy policy ↗
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Where data is transferred outside the EEA (e.g. to the USA), we rely on Standard
              Contractual Clauses (SCCs) or equivalent safeguards approved by the European
              Commission.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 5. Data retention */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. How Long We Keep Your Data</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li><strong>Account data:</strong> Retained for as long as your account is active, plus 30 days after deletion request.</li>
              <li><strong>Payment records:</strong> Retained for 7 years to comply with financial regulations.</li>
              <li><strong>Quiz and checklist data:</strong> Retained for the duration of your account.</li>
              <li><strong>Marketing preferences:</strong> Retained until you withdraw consent or delete your account.</li>
              <li><strong>Technical/log data:</strong> Retained for up to 12 months.</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          {/* 6. Your rights */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights Under GDPR</h2>
            <p>You have the following rights regarding your personal data:</p>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                ["Right of access", "Request a copy of the personal data we hold about you."],
                ["Right to rectification", "Ask us to correct inaccurate or incomplete data."],
               ["Right to erasure", "Request deletion of your personal data (&quot;right to be forgotten&quot;)."],
                ["Right to restriction", "Ask us to limit how we process your data in certain circumstances."],
                ["Right to data portability", "Receive your data in a structured, machine-readable format."],
                ["Right to object", "Object to processing based on legitimate interests or for direct marketing."],
                ["Right to withdraw consent", "Where processing is based on consent, withdraw it at any time."],
              ].map(([right, desc]) => (
                <li key={right} className="flex gap-3">
                  <span className="text-blue-500 mt-0.5">→</span>
                  <span><strong>{right}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              To exercise any of these rights, email us at{" "}
              <a href="mailto:privacy@relocate2day.com" className="text-blue-600 hover:underline">
                privacy@relocate2day.com
              </a>{" "}
              or use the data deletion option in your Account page. We will respond within 30 days.
            </p>
            <p className="mt-3 text-sm text-gray-500">
              You also have the right to lodge a complaint with your local data protection authority.
              In Malta this is the{" "}
              <a
                href="https://idpc.org.mt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Information and Data Protection Commissioner (IDPC)
              </a>
              .
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 7. Marketing */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Marketing Communications</h2>
            <p className="text-sm">
              We will only send you marketing emails if you have given explicit consent at signup or
              subsequently opted in. You can withdraw consent at any time by:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1 text-sm">
              <li>Clicking the unsubscribe link in any marketing email</li>
              <li>Updating your preferences in your Account page</li>
              <li>
                Emailing{" "}
                <a href="mailto:privacy@relocate2day.com" className="text-blue-600 hover:underline">
                  privacy@relocate2day.com
                </a>
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-500">
              Withdrawing consent does not affect the lawfulness of processing carried out before withdrawal.
              Transactional emails (receipts, password resets, account notices) are not marketing and
              will continue regardless of marketing preferences.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 8. Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Cookies</h2>
            <p className="text-sm">
              We use cookies and similar technologies to operate the Website. These include:
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {[
                ["Essential cookies", "Required for authentication, sessions, and core functionality. Cannot be disabled."],
                ["Analytics cookies", "Help us understand how visitors use the site. Only set with your consent."],
                ["Preference cookies", "Remember your settings and preferences."],
              ].map(([type, desc]) => (
                <li key={type} className="flex gap-3">
                  <span className="text-blue-500 mt-0.5">→</span>
                  <span><strong>{type}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-gray-500">
              You can manage cookie preferences via the cookie banner shown on your first visit, or
              through your browser settings.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 9. Security */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Security</h2>
            <p className="text-sm">
              We take appropriate technical and organisational measures to protect your data,
              including encrypted data transmission (HTTPS), hashed password storage, and
              role-based access controls. However, no system is completely secure. If you believe
              your account has been compromised, contact us immediately at{" "}
              <a href="mailto:privacy@relocate2day.com" className="text-blue-600 hover:underline">
                privacy@relocate2day.com
              </a>
              .
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 10. Changes */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Changes to This Policy</h2>
            <p className="text-sm">
              We may update this Privacy Policy from time to time. When we do, we will update the
              "Last updated" date at the top of this page and, where changes are significant, notify
              you by email or via a notice on the Website.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact Us</h2>
            <p className="text-sm">
              For any questions, requests, or concerns about this Privacy Policy or how we handle
              your data, please contact:
            </p>
            <div className="mt-4 bg-blue-50 rounded-xl p-5 text-sm space-y-1">
              <p><strong>Rachel Buttigieg</strong> trading as Relocate2Day</p>
              <p>
                Email:{" "}
                <a href="mailto:privacy@relocate2day.com" className="text-blue-600 hover:underline">
                  privacy@relocate2day.com
                </a>
              </p>
              <p>Website: https://relocate2day.com</p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
