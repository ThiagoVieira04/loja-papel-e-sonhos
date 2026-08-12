import type { Metadata } from "next";
import { FAQ_ITEMS } from "@/constants/faq";
import { SITE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Perguntas Frequentes (FAQ)",
  description:
    "Tire suas dúvidas sobre prazos, entregas, formas de pagamento, personalização e serviços de informática da Papel e Sonhos em Piabetá, Magé - RJ.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Perguntas Frequentes",
    description:
      "Respostas rápidas sobre papelaria personalizada, impressão, informática e pagamentos.",
    url: `${SITE_URL}/faq`,
    type: "website",
  },
};

const faqJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}