import type { Metadata } from "next";
import { CATEGORY_NAME_BY_SLUG, SITE_URL } from "@/constants/seo";

interface LayoutProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const name = CATEGORY_NAME_BY_SLUG[slug] ?? "Categoria";

  return {
    title: `${name} em Piabetá, Magé - RJ`,
    description: `Conheça os serviços de ${name} da Papel e Sonhos em Piabetá, Magé - RJ. Atendimento e orçamento personalizado pelo WhatsApp.`,
    alternates: { canonical: `/categorias/${slug}` },
    openGraph: {
      title: `${name} | Papel e Sonhos`,
      description: `Serviços de ${name} com qualidade na região de Magé - RJ.`,
      url: `${SITE_URL}/categorias/${slug}`,
      type: "website",
    },
  };
}

export default function CategoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}