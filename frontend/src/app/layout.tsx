import type { Metadata, Viewport } from "next";
import { Outfit, Quicksand } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { GoogleProvider } from "@/components/layout/google-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { APP } from "@/constants/app";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/constants/seo";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Papelaria Criativa e Informática em Piabetá, Magé - RJ`,
    template: "%s | Papel e Sonhos",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "papel e sonhos",
    "papelaria criativa",
    "papelaria personalizada",
    "personalizados",
    "impressão",
    "gráfica",
    "serviços de informática",
    "Piabetá",
    "Magé",
    "RJ",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} | Papelaria Criativa e Informática em Piabetá, Magé - RJ`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/logo.png", width: 512, height: 512, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Papelaria Criativa e Informática`,
    description: SITE_DESCRIPTION,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#d11e5a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Papel e Sonhos" />
      </head>
      <body
        className={`${outfit.variable} ${quicksand.variable} font-sans`}
      >
        <GoogleProvider>
          <Providers>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <WhatsAppFloat />
            <CartDrawer />
          </Providers>
        </GoogleProvider>
      </body>
    </html>
  );
}
