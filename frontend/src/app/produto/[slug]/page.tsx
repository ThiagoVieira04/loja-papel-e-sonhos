import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
  MessageCircle,
  Palette,
} from "lucide-react";
import {
  CATALOG_CATEGORIES,
  CATALOG_ITEMS,
  PERSONALIZATION_OPTIONS,
  getCatalogItemBySlug,
} from "@/constants/catalog";
import { getCatalogIcon, getCategoryStyle } from "@/lib/catalog-ui";
import { ItemGallery } from "@/components/catalog/item-gallery";
import { QuoteForm } from "@/components/catalog/quote-form";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CATALOG_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCatalogItemBySlug(slug);
  if (!item) return {};

  return {
    title: item.name,
    description: item.summary,
    openGraph: {
      title: `${item.name} | Papel e Sonhos`,
      description: item.summary,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getCatalogItemBySlug(slug);
  if (!item) notFound();

  const category = CATALOG_CATEGORIES.find((c) => c.slug === item.category);
  const style = getCategoryStyle(item.category);
  const Icon = getCatalogIcon(item.icon);
  const personalization = PERSONALIZATION_OPTIONS[item.category];
  const related = CATALOG_ITEMS.filter(
    (i) => i.category === item.category && i.slug !== item.slug
  ).slice(0, 4);

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap" aria-label="Trilha de navegação">
          <Link href="/" className="hover:text-primary transition-colors">
            Início
          </Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-primary transition-colors">
            Catálogo
          </Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-primary transition-colors">
            {category?.name}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{item.name}</span>
        </nav>

        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao catálogo
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <ItemGallery item={item} />
          </div>

          <div>
            <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold ${style.badge} mb-4`}>
              {category?.name}
            </span>
            <h1 className="text-3xl md:text-4xl font-black mb-4">{item.name}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {item.description}
            </p>

            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                    <Info className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-bold text-lg">Informações</h2>
                </div>
                <ul className="space-y-2.5">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {personalization && (
                <div className="rounded-3xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                      <Palette className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <h2 className="font-bold text-lg">Personalização</h2>
                  </div>
                  <ul className="space-y-2.5">
                    {personalization.map((option) => (
                      <li key={option} className="flex items-start gap-2.5 text-sm">
                        <Palette className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-3xl border border-border bg-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="font-bold text-lg">Observações</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Produzido sob encomenda com todo carinho. Prazos, valores e
                  detalhes do projeto são combinados pelo WhatsApp após o envio
                  da sua solicitação.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 max-w-2xl">
          <QuoteForm item={item} />
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black">Você também pode gostar</h2>
              <Link
                href="/catalogo"
                className="hidden md:inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
              >
                Ver catálogo completo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((rel) => {
                const RelIcon = getCatalogIcon(rel.icon);
                const relStyle = getCategoryStyle(rel.category);
                return (
                  <div
                    key={rel.id}
                    className="group rounded-3xl border border-border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <Link href={`/produto/${rel.slug}`} className="block">
                      <div
                        className={`relative aspect-square bg-gradient-to-br ${relStyle.gradient} bg-opacity-20 flex items-center justify-center`}
                      >
                        <RelIcon className="w-12 h-12 text-white/90 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-1">
                          {rel.name}
                        </h3>
                      </div>
                    </Link>
                    <div className="px-4 pb-4">
                      <a
                        href={`https://wa.me/5521987172463?text=${encodeURIComponent(
                          `Olá! Vi o produto ${rel.name} no site da Papel e Sonhos e gostaria de solicitar um orçamento.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 text-xs font-bold hover:underline"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Solicitar orçamento
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
