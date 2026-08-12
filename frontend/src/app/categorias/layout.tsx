import type { Metadata } from "next";
import { SITE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Categorias",
  description:
    "Explore as categorias de produtos personalizados e serviços da Papel e Sonhos: papelaria criativa, impressão, gráfica, informática e serviços digitais em Piabetá, Magé - RJ.",
  alternates: { canonical: "/categorias" },
  openGraph: {
    title: "Categorias de Produtos e Serviços",
    description:
      "Papelaria criativa, personalizados, impressão e informática em Piabetá, Magé - RJ.",
    url: `${SITE_URL}/categorias`,
    type: "website",
  },
};

export default function CategoriasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}