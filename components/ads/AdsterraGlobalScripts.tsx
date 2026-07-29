"use client";

import Script from "next/script";
import { adsterraGlobal } from "@/lib/ads/adsterra";

export default function AdsterraGlobalScripts() {
  const adsEnabled =
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

  if (!adsEnabled || !adsterraGlobal.socialBarSrc) return null;

  return <Script src={adsterraGlobal.socialBarSrc} strategy="afterInteractive" />;
} 