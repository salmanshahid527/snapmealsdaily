export const revalidate = 43200;

export const metadata = {
  title: "Contact Us | SnapMealsDaily",
  description: "Get in touch with SnapMealsDaily. We'd love to hear from you!",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Have a question, recipe suggestion, or partnership inquiry? We'd love to hear from you!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-accent-foreground text-primary-foreground font-medium py-2 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Follow Us
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  Connect with us on social media for daily food inspiration:
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-primary hover:underline font-medium"
                  >
                    Pinterest
                  </a>
                  <a
                    href="#"
                    className="text-primary hover:underline font-medium"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="text-primary hover:underline font-medium"
                  >
                    Facebook
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Email
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  <a href="mailto:hello@snapmealsdaily.com" className="text-primary hover:underline">
                    hello@snapmealsdaily.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Business Inquiries
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  For sponsorships, partnerships, or collaborations, please email:
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                  <a href="mailto:partnerships@snapmealsdaily.com" className="text-primary hover:underline">
                    partnerships@snapmealsdaily.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
