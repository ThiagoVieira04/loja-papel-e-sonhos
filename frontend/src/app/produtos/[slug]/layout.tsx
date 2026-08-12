import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos Personalizados",
  description:
    "Produtos personalizados da Papel e Sonhos em Piabetá, Magé - RJ. Solicite seu orçamento pelo WhatsApp.",
  robots: { index: true, follow: true },
};

export default function ProdutoSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}