import { adsterraSmartlink } from "@/lib/ads/adsterra";

export default function Smartlink() {
  const adsEnabled =
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

  if (!adsEnabled || !adsterraSmartlink) return null;

  return (
    <a
      href={adsterraSmartlink}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="text-xs transition-colors hover:text-primary"
      style={{ color: "rgba(230,247,246,0.3)" }}
    >
      Sponsored
    </a>
  );
}
