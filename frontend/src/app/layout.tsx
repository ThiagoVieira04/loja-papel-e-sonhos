import type { Metadata, Viewport } from "next";
import { Outfit, Quicksand } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/providers";
import { GoogleProvider } from "@/components/layout/google-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { CartDrawer } from "@/components/layout/cart-drawer";

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
  title: {
    default: "Papel e Sonhos | Papelaria Criativa & Informática",
    template: "%s | Papel e Sonhos",
  },
  description:
    "Transformamos ideias em memórias que encantam! Papelaria personalizada, serviços de informática, documentos governamentais e muito mais.",
  keywords: [
    "papelaria criativa",
    "informática",
    "personalizados",
    "documentos",
    "serviços governamentais",
    "aposentadoria",
    "MEI",
    "imposto de renda",
  ],
  authors: [{ name: "Papel e Sonhos" }],
  creator: "Papel e Sonhos",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Papel e Sonhos",
    title: "Papel e Sonhos | Papelaria Criativa & Informática",
    description:
      "Transformamos ideias em memórias que encantam! Qualidade, criatividade e amor em cada detalhe.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
    },
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
