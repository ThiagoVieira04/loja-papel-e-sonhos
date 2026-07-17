"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Product, Category } from "@/types";
import { Sparkles, ChevronRight, ShoppingBag, ArrowRight, Clock } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    api.get("/products/featured?limit=8").then(setFeaturedProducts).catch(() => {});
    api.get("/categories").then(setCategories).catch(() => {});
  }, []);

  const productCategories = categories.filter((c) => c.type === "product");
  const serviceCategories = categories.filter((c) => c.type === "service");

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#1a0a0e] via-[#2c1a1d] to-[#1a0a0e]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(209,30,90,0.15)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(227,27,109,0.1)_0%,transparent_50%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-white/10 text-white/90 text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              Há mais de 5 anos transformando ideias
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Transformamos{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-primary to-pink-300">
                ideias
              </span>
              <br />
              em memórias que{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-primary to-pink-400">
                encantam
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-xl mb-8 leading-relaxed">
              Qualidade, criatividade e carinho em cada detalhe. Da papelaria
              personalizada à solução digital, estamos aqui para realizar seus
              projetos.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/produtos"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
              >
                Ver Produtos
                <i className="fas fa-arrow-right w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/servicos"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all"
              >
                Nossos Serviços
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {[
                { num: "500+", label: "Clientes Atendidos" },
                { num: "5+", label: "Anos de Experiência" },
                { num: "1200+", label: "Serviços Realizados" },
                { num: "24h", label: "Prazo de Atendimento" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-black text-white">
                    {stat.num}
                  </p>
                  <p className="text-sm text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
              Categorias
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              De papelaria criativa a serviços de informática, temos soluções
              completas para você.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(0, 12).map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/categorias/${cat.slug}`}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-card to-muted/50 border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className={`fas ${cat.icon || "fa-tag"} text-primary`} />
                </div>
                <h3 className="font-bold text-sm group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {cat._count?.products || cat._count?.services || 0} itens
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
                  Destaques
                </span>
                <h2 className="text-3xl md:text-4xl font-black">
                  Produtos em Destaque
                </h2>
              </div>
              <Link
                href="/produtos"
                className="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                Ver Todos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/produtos/${product.slug}`}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <ShoppingBag className="w-12 h-12" />
                      </div>
                    )}
                    {product.isNew && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-secondary text-white text-xs font-bold rounded-full">
                        NOVO
                      </span>
                    )}
                    {product.promotionalPrice && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                        {Math.round(
                          (1 - Number(product.promotionalPrice) / Number(product.price)) * 100
                        )}
                        % OFF
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {product.category?.name}
                    </p>
                    <h3 className="font-bold text-sm group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      {product.promotionalPrice ? (
                        <>
                          <span className="text-lg font-black text-primary">
                            {formatPrice(Number(product.promotionalPrice))}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(Number(product.price))}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-black">
                          {formatPrice(Number(product.price))}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem({
                          id: product.id,
                          type: "product",
                          name: product.name,
                          price: Number(product.promotionalPrice || product.price),
                          quantity: 1,
                          image: product.images?.[0]?.url,
                          productId: product.id,
                        });
                      }}
                      className="mt-3 w-full py-2.5 bg-primary/10 text-primary text-sm font-bold rounded-xl hover:bg-primary hover:text-white transition-colors"
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Link
                href="/produtos"
                className="inline-flex items-center gap-2 text-primary font-medium"
              >
                Ver Todos <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Serviços */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
              Serviços
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Soluções completas para você
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              De documentos a serviços governamentais, resolvemos tudo para você.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "fa-wand-magic-sparkles", label: "Papelaria Personalizada", color: "from-red-500 to-pink-500" },
              { icon: "fa-print", label: "Impressão e Xerox", color: "from-green-500 to-emerald-500" },
              { icon: "fa-book-open", label: "Encadernação", color: "from-blue-500 to-cyan-500" },
              { icon: "fa-gift", label: "Lembrancinhas", color: "from-purple-500 to-pink-500" },
              { icon: "fa-cake-candles", label: "Topos de Bolo", color: "from-pink-500 to-rose-500" },
              { icon: "fa-calculator", label: "Imposto de Renda", color: "from-amber-500 to-orange-500" },
              { icon: "fa-user-clock", label: "Aposentadoria", color: "from-indigo-500 to-blue-500" },
              { icon: "fa-laptop-medical", label: "Formatação e Consertos", color: "from-slate-500 to-gray-500" },
            ].map((service, idx) => (
              <Link
                key={idx}
                href={`/servicos?categoria=${service.label.toLowerCase().replace(/ /g, "-")}`}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <i className={`fas ${service.icon} text-white`} />
                </div>
                <h3 className="font-bold text-sm">{service.label}</h3>
              </Link>
            ))}
          </div>

          {serviceCategories.length > 0 && (
            <div className="text-center mt-8">
              <Link
                href="/servicos"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors"
              >
                Ver Todos os Serviços <i className="fas fa-arrow-right w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 bg-gradient-to-br from-dark-900 via-dark-100 to-dark-900 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-bold uppercase tracking-wider mb-4">
              Por que nos escolher
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Nossos Diferenciais
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Motivos pelos quais nossos clientes confiam no nosso trabalho.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "fa-gem",
                title: "Qualidade Premium",
                desc: "Materiais selecionados e acabamento impecável em cada projeto.",
              },
              {
                icon: "fa-clock",
                title: "Rapidez na Entrega",
                desc: "Serviços expressos para quem precisa com urgência.",
              },
              {
                icon: "fa-heart",
                title: "Atendimento Humanizado",
                desc: "Você é tratado pelo nome, com respeito e atenção personalizada.",
              },
              {
                icon: "fa-shield-halved",
                title: "Satisfação Garantida",
                desc: "Se não gostar, ajustamos até ficar perfeito. Sem custo extra.",
              },
              {
                icon: "fa-star",
                title: "Preço Justo",
                desc: "Orçamento transparente, sem surpresas. Qualidade que cabe no bolso.",
              },
              {
                icon: "fa-truck",
                title: "Entrega Rápida",
                desc: "Entregamos na região com agilidade e segurança.",
              },
            ].map((diff, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <i className={`fas ${diff.icon} w-6 h-6 text-white`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{diff.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{diff.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
              Depoimentos
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              O que nossos clientes dizem
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A satisfação de quem já confiou no nosso trabalho.
            </p>
          </div>

          <div className="mx-auto" style={{ maxWidth: 345 }}>
            <div className="p-3 md:p-4 rounded-2xl bg-card border border-border">
              <h3 className="font-bold text-center mb-3 text-sm">Depoimento em Vídeo</h3>
              <video
                src="/video-paulo.mp4"
                controls
                className="w-full rounded-xl"
                preload="metadata"
              >
                Seu navegador não suporta vídeo.
              </video>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Paulo - Cliente Papel e Sonhos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dark-900 via-dark-100 to-dark-900 p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(209,30,90,0.15),transparent_60%),radial-gradient(ellipse_at_80%_50%,rgba(227,27,109,0.1),transparent_50%)]" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-bold uppercase tracking-wider mb-4">
                Entre em Contato
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                Vamos transformar sua ideia em realidade?
              </h2>
              <p className="text-white/60 text-lg mb-8">
                Estamos prontos para atender você. Escolha o canal preferido e
                fale agora mesmo conosco.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/5521987172463"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 hover:-translate-y-0.5 transition-all shadow-lg shadow-green-500/30"
                >
                  <i className="fab fa-whatsapp" /> (21) 98717-2463
                </a>
                <a
                  href="https://instagram.com/papel_e_sonhos0504"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all"
                >
                  <i className="fab fa-instagram" /> @papel_e_sonhos0504
                </a>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-white/50 text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Seg a Sex: 8h às 18h | Sáb: 8h às 12h
                </span>
                <span className="flex items-center gap-2">
                  <i className="fas fa-map-marker-alt text-primary" />
                  Rio de Janeiro - RJ
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


