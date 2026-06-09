import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter-fallback",
});

export const metadata: Metadata = {
  title: "TravelWithUs - туры в Китай",
  description:
    "Авторские маршруты по Китаю: Шанхай, горы Аватара, Великая стена и многое другое.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

function AdobeFontsLink({ kitId }: { kitId: string }) {
  return <link rel="stylesheet" href={`https://use.typekit.net/${kitId}.css`} />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adobeKitId = process.env.NEXT_PUBLIC_ADOBE_FONTS_KIT_ID?.trim();
  const useAdobe = Boolean(adobeKitId);

  if (!useAdobe && process.env.NODE_ENV === "development") {
    console.warn(
      "[TravelWithUs] Для шрифта как в Figma: задайте NEXT_PUBLIC_ADOBE_FONTS_KIT_ID (Adobe Fonts) или положите лицензионные ProximaNova-{Regular,Bold}.woff2 в public/fonts/ (см. public/fonts/README.md)."
    );
  }

  const htmlClass = `${inter.variable}${useAdobe ? "" : ` ${inter.className}`}`;
  const bodyClass = useAdobe
    ? "font-proxima-adobe antialiased"
    : "font-proxima-local antialiased font-sans";

  return (
    <html lang="ru" className={htmlClass}>
      <head>{useAdobe && adobeKitId ? <AdobeFontsLink kitId={adobeKitId} /> : null}</head>
      <body className={bodyClass}>{children}</body>
    </html>
  );
}
