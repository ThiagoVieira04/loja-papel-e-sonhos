import type { Metadata } from "next";
import { APP } from "@/constants/app";
import { SITE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Contato e Localização",
  description: `Fale com a Papel e Sonhos pelo WhatsApp, Instagram ou visite nossa loja em Piabetá, Magé - RJ (${APP.address}). Avalie nossa loja no Google e ajude a divulgar nosso trabalho.`,
  alternates: { canonical: "/contato" },
  openGraph: {
    title: "Contato e Localização",
    description: `Endereço, WhatsApp, Instagram e mapa da loja em Piabetá, Magé - RJ.`,
    url: `${SITE_URL}/contato`,
    type: "website",
  },
};

export default function ContatoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}