"use client";

import { useEffect } from "react";
import { adsterraUnits, adsterraNative, buildAdIframeSrcDoc } from "@/lib/ads/adsterra";

type AdUnitProps = {
  type: "mediumRect" | "leaderboard" | "mobileBanner" | "nativeBanner";
  className?: string;
};

export default function AdUnit({ type, className }: AdUnitProps) {
  const adsEnabled =
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

  useEffect(() => {
    if (!adsEnabled || type !== "nativeBanner" || !adsterraNative.containerId) return;

    const container = document.getElementById(adsterraNative.containerId);
    if (!container || container.childElementCount > 0) return; // already loaded

    const script = document.createElement("script");
    script.src = adsterraNative.scriptSrc;
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [adsEnabled, type]);

  if (!adsEnabled) return null;

  if (type === "nativeBanner") {
    if (!adsterraNative.key) return null;
    return <div id={adsterraNative.containerId} className={className} />;
  }

  const unit = adsterraUnits[type];
  if (!unit?.key) return null;

  return (
    <div className={className}>
      <iframe
        srcDoc={buildAdIframeSrcDoc(unit)}
        style={{ border: "none", overflow: "hidden", display: "block" }}
        width={unit.width}
        height={unit.height}
        scrolling="no"
        loading="lazy"
      />
    </div>
  );
}