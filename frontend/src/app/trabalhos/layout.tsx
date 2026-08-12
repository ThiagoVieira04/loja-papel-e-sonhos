import type { Metadata } from "next";
import { SITE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Nossos Trabalhos",
  description:
    "Confira os trabalhos e projetos realizados pela Papel e Sonhos: personalizados, impressões e muito mais em Piabetá, Magé - RJ.",
  alternates: { canonical: "/trabalhos" },
  openGraph: {
    title: "Nossos Trabalhos",
    description:
      "Projetos de papelaria criativa e personalizados da Papel e Sonhos.",
    url: `${SITE_URL}/trabalhos`,
    type: "website",
  },
};

export default function TrabalhosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}