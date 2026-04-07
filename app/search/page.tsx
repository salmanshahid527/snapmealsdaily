import type { Metadata } from "next";
import { SearchView } from "@/components/blog/SearchView";
import { Container } from "@/components/layout/Container";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Search Recipes — SnapMealsDaily",
  description: "Search for your favorite recipes on SnapMealsDaily",
  alternates: { canonical: `${SITE_URL}/search` },
};

export default function SearchPage() {
  return (
    <div className="section-gap">
      <Container>
        <SearchView />
      </Container>
    </div>
  );
}
