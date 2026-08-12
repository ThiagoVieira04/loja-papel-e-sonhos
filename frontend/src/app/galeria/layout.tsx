import type { Metadata } from "next";
import { SITE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Galeria de fotos dos trabalhos e produções da Papel e Sonhos em Piabetá, Magé - RJ: personalizados, festas e muito mais.",
  alternates: { canonical: "/galeria" },
  openGraph: {
    title: "Galeria de Trabalhos",
    description:
      "Fotos dos projetos e personalizados da Papel e Sonhos.",
    url: `${SITE_URL}/galeria`,
    type: "website",
  },
};

export default function GaleriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}