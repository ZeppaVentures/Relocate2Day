export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-500 text-sm">Last updated: 29 May 2026 &nbsp;·&nbsp; Effective date: 1 June 2025</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-10 text-gray-700 leading-relaxed">

          {/* Intro */}
          <section>
            <p>
              These Terms of Service ("Terms") govern your access to and use of{" "}
              <strong>relocate2day.com</strong> (the "Website") and all related services
              (collectively, the "Services") provided by <strong>Rachel Buttigieg</strong> trading
              as <strong>Relocate2Day</strong> ("we", "us", or "our").
            </p>
            <p className="mt-4">
              By accessing or using the Website, you agree to be bound by these Terms. If you do
              not agree, please do not use the Website.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 1. Services */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. About Our Services</h2>
            <p className="text-sm">
              Relocate2Day is an online platform providing information, tools, and guidance to help
              individuals relocate to European countries. Our Services include:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1 text-sm">
              <li>Country and city guides</li>
              <li>Personalised quiz tools (country quiz, city quiz)</li>
              <li>Relocation checklists</li>
              <li>Tax calculators</li>
              <li>Premium subscription features</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">
              All content is provided for <strong>informational purposes only</strong>. Nothing on
              this Website constitutes legal, tax, financial, or professional advice. Always consult
              a qualified professional before making relocation decisions.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 2. Eligibility */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Eligibility</h2>
            <p className="text-sm">
              You must be at least 18 years old to use our Services. By using the Website, you
              confirm that you are 18 or over and have the legal capacity to enter into these Terms.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 3. Accounts */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Accounts & Registration</h2>
            <p className="text-sm">
              Some features require you to create an account. You agree to:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1 text-sm">
              <li>Provide accurate and complete registration information</li>
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of any unauthorised use of your account</li>
              <li>Take responsibility for all activity that occurs under your account</li>
            </ul>
            <p className="mt-3 text-sm text-gray-500">
              We reserve the right to suspend or terminate accounts that violate these Terms or that
              we believe may cause harm to other users or the platform.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 4. Subscriptions & Payments */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Subscriptions & Payments</h2>

            <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">Free trial</h3>
            <p className="text-sm">
              We offer a 14-day free trial for new subscribers. No charge is made until the trial
              period ends. You may cancel at any time during the trial without charge.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">Subscription plans</h3>
            <p className="text-sm">
              Premium access is available on a monthly (€12/month) or annual (€99/year) basis.
              Subscriptions renew automatically unless cancelled before the renewal date.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">Payments</h3>
            <p className="text-sm">
              Payments are processed securely by <strong>Stripe</strong>. We do not store your
              payment card details. By subscribing, you authorise us to charge your chosen payment
              method on a recurring basis.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">Cancellation & refunds</h3>
            <p className="text-sm">
              You may cancel your subscription at any time via the Customer Portal in your Account
              page. Cancellation takes effect at the end of the current billing period. We do not
              offer refunds for partial periods, except where required by applicable law.
            </p>

            <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">Price changes</h3>
            <p className="text-sm">
              We reserve the right to change subscription prices. We will give you at least 30
              days' notice of any price change. Continued use after the notice period constitutes
              acceptance of the new price.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 5. Acceptable Use */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Acceptable Use</h2>
            <p className="text-sm">You agree not to:</p>
            <ul className="list-disc pl-5 mt-3 space-y-1 text-sm">
              <li>Use the Website for any unlawful purpose</li>
              <li>Attempt to gain unauthorised access to any part of the Website or its systems</li>
              <li>Scrape, copy, or redistribute our content without permission</li>
              <li>Use the Website to transmit spam, malware, or harmful content</li>
              <li>Impersonate another person or misrepresent your identity</li>
              <li>Share your account credentials with third parties</li>
              <li>Use automated tools to access or interact with the Website without our consent</li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          {/* 6. Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Intellectual Property</h2>
            <p className="text-sm">
              All content on the Website — including text, guides, quiz tools, calculators,
              graphics, and code — is owned by or licensed to Relocate2Day and is protected by
              copyright and other intellectual property laws.
            </p>
            <p className="mt-3 text-sm">
              You may use the content for your personal, non-commercial relocation planning. You
              may not reproduce, distribute, or create derivative works from our content without
              our express written permission.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 7. Disclaimer */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Disclaimer of Warranties</h2>
            <p className="text-sm">
              The Website and its content are provided <strong>"as is"</strong> and{" "}
              <strong>"as available"</strong> without warranties of any kind, either express or
              implied. We do not warrant that:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1 text-sm">
              <li>The Website will be uninterrupted, error-free, or secure</li>
              <li>The information provided is complete, accurate, or up to date</li>
              <li>The results of using our tools (quiz, tax calculator, checklist) will be suitable for your specific circumstances</li>
            </ul>
            <p className="mt-3 text-sm text-gray-500">
              Tax information is indicative only. Tax laws change frequently. Always verify with a
              qualified tax adviser in your target country.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 8. Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Limitation of Liability</h2>
            <p className="text-sm">
              To the fullest extent permitted by law, Relocate2Day shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from your
              use of or inability to use the Website or Services, including but not limited to loss
              of data, income, or profits.
            </p>
            <p className="mt-3 text-sm">
              Our total liability to you for any claim arising out of or relating to these Terms or
              the Services shall not exceed the amount you paid us in the 12 months preceding the
              claim, or €100, whichever is greater.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 9. Third-party links */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Third-Party Links & Services</h2>
            <p className="text-sm">
              The Website may contain links to third-party websites and services (e.g. government
              portals, embassy websites, official offices). These are provided for convenience only.
              We have no control over third-party content and are not responsible for their
              accuracy, availability, or privacy practices.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 10. Termination */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Termination</h2>
            <p className="text-sm">
              We may suspend or terminate your access to the Services at any time, with or without
              notice, if you breach these Terms or if we reasonably believe your use poses a risk to
              us or other users. You may also delete your account at any time via your Account page.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 11. Governing law */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Governing Law</h2>
            <p className="text-sm">
              These Terms are governed by and construed in accordance with the laws of{" "}
              <strong>Malta</strong>. Any disputes arising from these Terms or your use of the
              Website shall be subject to the exclusive jurisdiction of the Maltese courts, without
              prejudice to your rights as a consumer under the laws of your country of residence.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 12. Changes */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Changes to These Terms</h2>
            <p className="text-sm">
              We may update these Terms from time to time. We will notify you of significant changes
              by email or via a notice on the Website at least 14 days before they take effect.
              Continued use of the Website after changes take effect constitutes your acceptance of
              the updated Terms.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* 13. Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Contact Us</h2>
            <p className="text-sm">
              If you have any questions about these Terms, please contact:
            </p>
            <div className="mt-4 bg-blue-50 rounded-xl p-5 text-sm space-y-1">
              <p><strong>Rachel Buttigieg</strong> trading as Relocate2Day</p>
              <p>
                Email:{" "}
                <a href="mailto:legal@relocate2day.com" className="text-blue-600 hover:underline">
                  legal@relocate2day.com
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
