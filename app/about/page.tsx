export const metadata = {
  title: "About Us | SnapMealsDaily",
  description: "Learn about SnapMealsDaily and our mission to inspire delicious, easy recipes.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              About SnapMealsDaily
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              We're passionate about making delicious, easy-to-make recipes accessible to everyone.
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                At SnapMealsDaily, we believe that cooking should be fun, accessible, and inspiring. 
                Our mission is to provide Pinterest-friendly recipes with clear, step-by-step guides 
                that anyone can follow, regardless of their cooking experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                What We Offer
              </h2>
              <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Delicious and tested recipes for every occasion</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Beautiful, Instagram-worthy food photography</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Detailed step-by-step cooking guides</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Ingredient substitutions and tips</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                Join Our Community
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Subscribe to our newsletter to get new recipes delivered to your inbox every week. 
                Follow us on social media for daily food inspiration and behind-the-scenes content.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
