import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Disclaimer — ${SITE_NAME}`,
  description: "Legal disclaimer for SnapMealsDaily",
  alternates: {
    canonical: `${SITE_URL}/disclaimer`,
  },
};

export default function DisclaimerPage() {
  return (
    <div style={{ backgroundColor: "var(--background)" }}>
      <Container className="py-12 md:py-20">
        <article className="prose max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-8"  style={{ color: "var(--foreground)" }}>Disclaimer</h1>

          <section>
            <h2  className="text-2xl font-bold text-neutral-900 dark:text-white mb-4" style={{ color: "var(--foreground)" }}>General Information</h2>
            <p  style={{ color: "var(--foreground-muted)" }}>
              The information provided on {SITE_NAME} is for educational and entertainment purposes only.
              We do not provide professional advice, and all recipes should be followed at your own risk.
            </p>
          </section>

          <section>
            <h2  className="text-2xl font-bold text-neutral-900 dark:text-white mb-4" style={{ color: "var(--foreground)" }}>Limitations of Liability</h2>
            <p style={{ color: "var(--foreground-muted)" }}>
              {SITE_NAME} will not be liable for any damages or losses resulting from the use of this website
              or the recipes and content provided. This includes, but is not limited to, direct, indirect,
              incidental, compensatory, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4" style={{ color: "var(--foreground)" }}>Recipe Modifications</h2>
            <p style={{ color: "var(--foreground-muted)" }}>
              All recipes are provided as-is. We recommend following the instructions carefully and adjusting
              recipes according to your dietary needs and preferences. If you have allergies or dietary
              restrictions, please verify all ingredients before use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4" style={{ color: "var(--foreground)" }}>Third-Party Content</h2>
            <p style={{ color: "var(--foreground-muted)" }}>
              {SITE_NAME} contains links to third-party websites. We are not responsible for the content,
              accuracy, or practices of these external sites. Please review their terms and policies before use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4" style={{ color: "var(--foreground)" }}>Images and Content</h2>
            <p style={{ color: "var(--foreground-muted)" }}>
              All recipe images and content on {SITE_NAME} are provided for illustrative purposes. Actual
              results may vary depending on ingredients, techniques, and cooking equipment used.
            </p>
          </section>

          <section>
            <h2  className="text-2xl font-bold text-neutral-900 dark:text-white mb-4" style={{ color: "var(--foreground)" }}>Health and Safety</h2>
            <p style={{ color: "var(--foreground-muted)" }}>
              {SITE_NAME} is not a substitute for professional medical or nutritional advice. If you have
              specific health concerns or allergies, consult with a healthcare professional before using
              any of our recipes.
            </p>
          </section>

          <section>
            <h2 style={{ color: "var(--foreground)" }}>Changes to This Disclaimer</h2>
            <p style={{ color: "var(--foreground-muted)" }}>
              We reserve the right to update this disclaimer at any time. Your continued use of {SITE_NAME}
              following any changes constitutes your acceptance of the updated disclaimer.
            </p>
          </section>

          <p style={{ color: "var(--foreground-muted)", marginTop: "2rem" }}>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </article>
      </Container>
    </div>
  );
}
