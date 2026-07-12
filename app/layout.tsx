import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/providers";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.yakafinity.com";

export const metadata: Metadata = {
  title: "TharinduJB — AI & Software Developer",
  description:
    "Portfolio of TharinduJB, a Computer Science with AI undergraduate building machine learning and full-stack products.",
  keywords: [
    "TharinduJB",
    "Tharindu J Bandara",
    "AI developer",
    "software developer",
    "machine learning",
    "Sri Lanka",
  ],
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "TharinduJB — AI & Software Developer",
    description: "Intelligent systems, thoughtfully built.",
    images: ["/opengraph-image"],
    type: "website",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#090b10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
