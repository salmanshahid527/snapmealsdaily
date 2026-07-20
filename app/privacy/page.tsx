export const revalidate = 43200;

export const metadata = {
  title: "Privacy Policy | SnapMealsDaily",
  description: "SnapMealsDaily privacy policy and data protection information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-8">
            Privacy Policy
          </h1>

          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Last updated: April 6, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Introduction
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              SnapMealsDaily ("we" or "us" or "our") operates the snapmealsdaily.com website (the "Service").
              This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Information Collection and Use
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
              Types of Data Collected:
            </h3>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Personal Data:</strong> Email address, when you subscribe to our newsletter</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Usage Data:</strong> Information about how you access and use the Service</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Cookies:</strong> We may use cookies to enhance your experience</span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Newsletter Subscriptions
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              When you subscribe to our newsletter, we collect your email address and any additional information you provide. 
              We use this information to send you recipe updates, cooking tips, and promotional content. 
              You can unsubscribe from our newsletter at any time by clicking the unsubscribe link in our emails.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Security of Data
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              The security of your data is important to us, but remember that no method of transmission over the Internet 
              or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, 
              we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@snapmealsdaily.com" className="text-primary hover:underline">
                privacy@snapmealsdaily.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
