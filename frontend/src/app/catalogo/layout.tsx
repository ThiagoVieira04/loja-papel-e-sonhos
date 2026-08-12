import type { Metadata } from "next";
import { SITE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Catálogo de papelaria personalizada, impressão, gráfica e serviços de informática da Papel e Sonhos em Piabetá, Magé - RJ. Solicite seu orçamento pelo WhatsApp.",
  alternates: { canonical: "/catalogo" },
  openGraph: {
    title: "Catálogo de Produtos e Serviços",
    description:
      "Produtos personalizados, impressão e serviços de informática em Piabetá, Magé - RJ.",
    url: `${SITE_URL}/catalogo`,
    type: "website",
  },
};

export default function CatalogoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}