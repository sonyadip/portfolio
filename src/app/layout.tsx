import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SpeedInsights } from "@vercel/speed-insights/next";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const BASE_URL = "https://sonypratama.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Sony Pratama — Website Developer",
    template: "%s | Sony Pratama",
  },
  description:
    "Portfolio of Sony Pratama — Website Developer based in Bali, Indonesia. Specialising in WordPress, Shopify, and Modern Frontend Development. Nearly 4 years of experience turning Figma designs into responsive, functional websites.",
  keywords: [
    "Sony Pratama",
    "Website Developer",
    "Bali",
    "WordPress Developer",
    "Shopify Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "Portfolio",
    "Web Development Bali",
  ],
  authors: [{ name: "Sony Pratama", url: BASE_URL }],
  creator: "Sony Pratama",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Sony Pratama — Website Developer",
    title: "Sony Pratama — Website Developer",
    description:
      "Website Developer based in Bali, Indonesia. Specialising in WordPress, Shopify, and Modern Frontend. View my project portfolio.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sony Pratama — Website Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sony Pratama — Website Developer",
    description:
      "Website Developer based in Bali, Indonesia. Specialising in WordPress, Shopify, and Modern Frontend.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          href="/fonts/PPNeueCorpTight-Ultrabold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/PPNeueMontreal-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/MangoGrotesque-Black.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/MangoGrotesque-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                window.scrollTo(0, 0);
                if (window.location.hash) {
                  history.replaceState(null, '', window.location.pathname + window.location.search);
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#ebe8e3] text-[#0a0a0a]">
        <SmoothScroll>{children}</SmoothScroll>
        <SpeedInsights />
      </body>
    </html>
  );
}
