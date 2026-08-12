import type { Metadata } from "next";
import { SITE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Produtos personalizados e papelaria criativa da Papel e Sonhos: agendas, camisas, canecas, topos de bolo, adesivos e muito mais em Piabetá, Magé - RJ.",
  alternates: { canonical: "/produtos" },
  openGraph: {
    title: "Produtos Personalizados",
    description:
      "Papelaria personalizada e produtos sob medida em Piabetá, Magé - RJ.",
    url: `${SITE_URL}/produtos`,
    type: "website",
  },
};

export default function ProdutosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}