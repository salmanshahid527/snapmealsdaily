import Link from "next/link";

export const revalidate = 43200;

export const metadata = {
  title: "About Us",
  description:
    "SnapMealsDaily publishes recipe ideas and meal roundups for home cooks. Learn who we write for, how we edit, and the standards we hold ourselves to.",
};

const sectionHeading = "text-2xl font-bold text-neutral-900 dark:text-white mb-4";
const bodyText = "text-neutral-600 dark:text-neutral-400 leading-relaxed";

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
              <h2 className={sectionHeading}>Our Mission</h2>
              <p className={bodyText}>
                At SnapMealsDaily, we believe that cooking should be fun, accessible, and
                inspiring. Our mission is to give home cooks clear, practical recipe ideas they can
                follow in their own kitchens, whatever their level of experience.
              </p>
            </section>

            <section>
              <h2 className={sectionHeading}>What We Publish</h2>
              <p className={`${bodyText} mb-4`}>
                SnapMealsDaily is a food site built around recipe ideas and roundups. You will find
                meal ideas for everyday cooking, healthy eating inspiration, snacks, drinks, and
                other collections to help you decide what to make next.
              </p>
              <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Step-by-step cooking guides written for home cooks</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Ingredient lists with substitutions and tips where they are useful</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Roundups that collect meal, snack, and drink ideas in one place</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className={sectionHeading}>Who Writes and Edits the Site</h2>
              <p className={bodyText}>
                SnapMealsDaily is an editorial site run by a small team. We do not present our posts as the work of credentialed
                chefs or medical professionals. We are a team of people who care about practical,
                approachable cooking.
              </p>
            </section>

            <section>
              <h2 className={sectionHeading}>Editorial Standards</h2>
              <p className={`${bodyText} mb-4`}>
                Readers should be able to trust what they read here. We commit to the following:
              </p>
              <ul className="space-y-3 text-neutral-600 dark:text-neutral-400">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>We do not publish fake reviews or invented testimonials.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>
                    We do not run paid placements disguised as editorial content. If a post
                    includes sponsored material or affiliate links, we say so clearly.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>We avoid nutrition and health promises; anything we say on those topics is general information.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>
                    We are honest about advertising. The site may display ads, which are described
                    in our <Link href="/privacy" className="text-primary hover:underline">privacy policy</Link>.
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className={sectionHeading}>Allergies, Diets, and Health Information</h2>
              <p className={bodyText}>
                Please check every recipe and ingredient list against your own dietary needs and
                allergies before cooking. Any nutrition or health topics on this site are general
                information only and are not medical advice. If you have a medical condition or
                specific dietary requirements, speak with a doctor or registered dietitian.
              </p>
            </section>

            <section>
              <h2 className={sectionHeading}>Corrections and Contact</h2>
              <p className={bodyText}>
                If you spot a mistake, an unclear step, or something that needs updating, we want
                to hear about it. Corrections are welcome, and you can reach us through our{" "}
                <Link href="/contact" className="text-primary hover:underline">contact page</Link>.
              </p>
            </section>

            <section>
              <h2 className={sectionHeading}>Stay in Touch</h2>
              <p className={bodyText}>
                You can sign up for our newsletter using the form in the site footer to get new
                recipe ideas by email. You can unsubscribe at any time.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
