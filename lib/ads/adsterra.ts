const HPF_BASE_URL = "https://www.highperformanceformat.com";

const NATIVE_BANNER_KEY = process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_BANNER_KEY || "";

export const adsterraGlobal = {
  socialBarSrc: process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_URL || "",
};

export const adsterraNative = {
  key: NATIVE_BANNER_KEY,
  scriptSrc: NATIVE_BANNER_KEY
    ? `https://pl30484193.effectivecpmnetwork.com/${NATIVE_BANNER_KEY}/invoke.js`
    : "",
  containerId: NATIVE_BANNER_KEY ? `container-${NATIVE_BANNER_KEY}` : "",
};

export const adsterraUnits = {
  mediumRect: {
    key: process.env.NEXT_PUBLIC_ADSTERRA_MEDIUM_RECT_KEY || "",
    width: 300,
    height: 250,
  },
  leaderboard: {
    key: process.env.NEXT_PUBLIC_ADSTERRA_LEADERBOARD_KEY || "",
    width: 728,
    height: 90,
  },
  mobileBanner: {
    key: process.env.NEXT_PUBLIC_ADSTERRA_MOBILE_BANNER_KEY || "",
    width: 320,
    height: 50,
  },
};

export const adsterraSmartlink = process.env.NEXT_PUBLIC_ADSTERRA_SMARTLINK_URL || "";

export function buildAdIframeSrcDoc(unit: { key: string; width: number; height: number }) {
  return `
    <html>
      <head>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            width: ${unit.width}px;
            height: ${unit.height}px;
          }
        </style>
      </head>
      <body>
        <script>
          atOptions = {
            'key': '${unit.key}',
            'format': 'iframe',
            'height': ${unit.height},
            'width': ${unit.width},
            'params': {}
          };
        </script>
        <script src="${HPF_BASE_URL}/${unit.key}/invoke.js"></script>
      </body>
    </html>
  `;
}
