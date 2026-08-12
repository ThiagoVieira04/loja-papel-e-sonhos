import type { Metadata } from "next";
import { SITE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Serviços de papelaria personalizada, impressão, documentos, serviços governamentais e informática da Papel e Sonhos em Piabetá, Magé - RJ.",
  alternates: { canonical: "/servicos" },
  openGraph: {
    title: "Nossos Serviços",
    description:
      "Papelaria criativa, documentos, governamentais e informática em Piabetá, Magé - RJ.",
    url: `${SITE_URL}/servicos`,
    type: "website",
  },
};

export default function ServicosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}