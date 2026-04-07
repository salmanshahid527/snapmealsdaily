"use client";

import Link from "next/link";
import { SOCIAL, SITE_NAME } from "@/lib/constants";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--background-alt)",
      }}
    >
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: "var(--primary)" }}
              >
                S
              </div>
              <h3 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
                {SITE_NAME}
              </h3>
            </div>
            <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
              Delicious recipes, food inspiration, and Pinterest-friendly photos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: "var(--foreground)" }}>
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="transition-colors"
                  style={{ color: "var(--foreground-muted)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--foreground-muted)";
                  }}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors"
                  style={{ color: "var(--foreground-muted)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--foreground-muted)";
                  }}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors"
                  style={{ color: "var(--foreground-muted)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--foreground-muted)";
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4" style={{ color: "var(--foreground)" }}>
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a
                href={SOCIAL.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--foreground-muted)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--foreground-muted)";
                }}
              >
                Pinterest
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--foreground-muted)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--foreground-muted)";
                }}
              >
                Instagram
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "var(--foreground-muted)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--foreground-muted)";
                }}
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div
          className="border-t mt-8 pt-8 text-center text-sm"
          style={{
            borderColor: "var(--border)",
            color: "var(--foreground-muted)",
          }}
        >
          <p>&copy; 2024 {SITE_NAME}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
