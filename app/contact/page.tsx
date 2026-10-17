import Link from "next/link";

export const revalidate = 43200;

export const metadata = {
  title: "Contact Us",
  description:
    "How to reach SnapMealsDaily by email: questions and recipe corrections, partnership inquiries, and privacy requests.",
};

const sectionHeading = "text-lg font-semibold text-neutral-900 dark:text-white mb-2";
const bodyText = "text-neutral-600 dark:text-neutral-400 leading-relaxed";

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
              SnapMealsDaily is a food site that publishes recipe ideas and meal roundups for home
              cooks. The best way to reach us is by email, and the right address depends on what
              you want to tell us.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className={sectionHeading}>Questions, corrections, and feedback</h2>
              <p className={bodyText}>
                If you have a question about a recipe, spotted a mistake or an unclear step, or
                want to share a suggestion, write to{" "}
                <a href="mailto:hello@snapmealsdaily.com" className="text-primary hover:underline">
                  hello@snapmealsdaily.com
                </a>
                . It helps to include the title or link of the post you are writing about, so we
                can find it quickly.
              </p>
            </div>

            <div>
              <h2 className={sectionHeading}>Sponsorships and partnerships</h2>
              <p className={bodyText}>
                For sponsorships, collaborations, or other business inquiries, email{" "}
                <a
                  href="mailto:partnerships@snapmealsdaily.com"
                  className="text-primary hover:underline"
                >
                  partnerships@snapmealsdaily.com
                </a>
                . Please tell us briefly who you are and what you have in mind. As described on
                our <Link href="/about" className="text-primary hover:underline">about page</Link>,
                we do not run paid placements disguised as editorial content.
              </p>
            </div>

            <div>
              <h2 className={sectionHeading}>Privacy and data requests</h2>
              <p className={bodyText}>
                To ask about your data or request its deletion, see our{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  privacy policy
                </Link>{" "}
                and write to{" "}
                <a href="mailto:privacy@snapmealsdaily.com" className="text-primary hover:underline">
                  privacy@snapmealsdaily.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className={sectionHeading}>Before you write</h2>
              <p className={bodyText}>
                Our posts are general recipe ideas, not medical or nutrition advice, so we cannot
                give personal dietary guidance. Please read the{" "}
                <Link href="/disclaimer" className="text-primary hover:underline">
                  disclaimer
                </Link>{" "}
                for details, and check ingredients against your own allergies and dietary needs.
              </p>
            </div>

            {/* TODO(owner): add real Pinterest, Instagram and Facebook profile URLs here once confirmed. The previous placeholder links (href="#") were removed because they led nowhere. */}
          </div>
        </div>
      </div>
    </main>
  );
}
