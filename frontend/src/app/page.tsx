import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Book,
  Cake,
  Camera,
  Coffee,
  Gem,
  Gift,
  Globe,
  Heart,
  Laptop,
  MessageCircle,
  Printer,
  Scissors,
  Shirt,
  Sparkles,
  Star,
  Sticker,
  Users,
} from "lucide-react";
import {
  WORK_GRADIENTS,
  WORK_ITEMS,
} from "@/constants/works";
import { QuoteButtons } from "@/components/whatsapp/quote-buttons";
import { WHATSAPP_URL, WHATSAPP_TELEPHONE } from "@/lib/whatsapp";
import { APP } from "@/constants/app";

export const metadata: Metadata = {
  title: "Papel e Sonhos | Papelaria Criativa e Informática",
  description:
    "Transformamos ideias em memórias que encantam! Produtos personalizados, papelaria criativa e serviços de informática para deixar cada momento ainda mais especial.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Papel e Sonhos",
    title: "Papel e Sonhos | Papelaria Criativa e Informática",
    description:
      "Transformamos ideias em memórias que encantam! Produtos personalizados, papelaria criativa e serviços de informática.",
  },
};

const CATEGORY_CARDS = [
  {
    icon: Scissors,
    title: "Papelaria e Personalizados",
    description:
      "Convites, topo de bolo, kits de festa e lembrancinhas para celebrar cada momento.",
    href: "/categorias/papelaria-personalizada",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Printer,
    title: "Impressão e Gráfica",
    description:
      "Impressões, xerox, encadernação e materiais gráficos com acabamento de qualidade.",
    href: "/categorias/impressao",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Laptop,
    title: "Informática",
    description:
      "Formatação, consertos, recuperação de contas e suporte técnico para o dia a dia.",
    href: "/categorias/informatica",
    gradient: "from-indigo-500 to-violet-500",
  },
  {
    icon: Globe,
    title: "Serviços Digitais",
    description:
      "Documentos, aposentadoria, MEI e soluções digitais resolvidas sem complicação.",
    href: "/servicos",
    gradient: "from-amber-500 to-orange-500",
  },
];

const FEATURED_ITEMS = [
  {
    icon: Cake,
    title: "Topos de bolo",
    href: "/categorias/topos-de-bolo",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    icon: Coffee,
    title: "Canecas personalizadas",
    href: "/categorias/canecas",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    icon: Shirt,
    title: "Camisas personalizadas",
    href: "/categorias/camisas",
    gradient: "from-sky-400 to-blue-500",
  },
  {
    icon: Book,
    title: "Agendas",
    href: "/categorias/agendas",
    gradient: "from-violet-400 to-purple-500",
  },
  {
    icon: Gift,
    title: "Lembrancinhas",
    href: "/categorias/lembrancinhas",
    gradient: "from-fuchsia-400 to-pink-500",
  },
  {
    icon: Sticker,
    title: "Adesivos",
    href: "/categorias/adesivos",
    gradient: "from-emerald-400 to-teal-500",
  },
];

const TRUST_ITEMS = [
  {
    icon: Users,
    title: "Atendimento personalizado",
    description:
      "Cada pedido é tratado com atenção única, do primeiro contato à entrega.",
  },
  {
    icon: Heart,
    title: "Produtos feitos com carinho",
    description:
      "Muita dedicação e capricho em cada peça para tornar seu momento especial.",
  },
  {
    icon: Gem,
    title: "Qualidade em cada detalhe",
    description:
      "Materiais selecionados e acabamento impecável em todos os projetos.",
  },
  {
    icon: MessageCircle,
    title: "Praticidade pelo WhatsApp",
    description:
      "Orçamento rápido e atendimento direto pelo seu celular, sem burocracia.",
  },
];

export default function HomePage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "Papel e Sonhos",
            description:
              "Papelaria criativa e informática. Produtos personalizados, impressão e serviços digitais.",
            telephone: WHATSAPP_TELEPHONE,
            priceRange: "Sob consulta",
            areaServed: "Magé, RJ",
            address: APP.address,
          }),
        }}
      />

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#1a0a0e] via-[#2c1a1d] to-[#1a0a0e]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(209,30,90,0.15)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(227,27,109,0.1)_0%,transparent_50%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container relative z-10 pt-28 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-xl">
              <div className="animate-fade-up flex items-center gap-2 text-white/90 mb-6">
                <span className="text-2xl font-black tracking-tight">Papel &amp; Sonhos</span>
                <span className="hidden sm:inline-block h-6 w-px bg-white/20" />
                <span className="hidden sm:inline-block text-sm font-medium text-white/60">
                  Papelaria Criativa e Informática
                </span>
              </div>

              <h1
                className="animate-fade-up text-4xl md:text-5xl xl:text-6xl font-black text-white leading-tight mb-6"
                style={{ animationDelay: "100ms" }}
              >
                Transformamos{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-primary to-pink-300">
                  ideias
                </span>{" "}
                em memórias que{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-primary to-pink-400">
                  encantam
                </span>
                !
              </h1>

              <p
                className="animate-fade-up text-lg md:text-xl text-white/60 mb-8 leading-relaxed"
                style={{ animationDelay: "200ms" }}
              >
                Produtos personalizados, papelaria criativa e serviços de
                informática para deixar cada momento ainda mais especial.
              </p>

              <div
                className="animate-fade-up flex flex-wrap gap-4"
                style={{ animationDelay: "300ms" }}
              >
                <Link
                  href="/catalogo"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
                >
                  Ver catálogo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full shadow-lg shadow-green-500/30 hover:bg-green-600 hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar pelo WhatsApp
                </a>
              </div>

              <div
                className="animate-fade-up grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14"
                style={{ animationDelay: "400ms" }}
              >
                {[
                  { icon: Star, label: "Produtos personalizados" },
                  { icon: Sparkles, label: "Papelaria criativa" },
                  { icon: Printer, label: "Impressão e gráfica" },
                  { icon: Laptop, label: "Informática" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-2">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="text-xs text-white/50">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Espaço para imagem/arte principal */}
            <div
              className="animate-fade-in relative hidden sm:block"
              style={{ animationDelay: "300ms" }}
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/30 via-secondary/20 to-transparent rotate-3 animate-float" />

                <div className="absolute inset-4 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center gap-4 text-center p-8 overflow-hidden">
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-primary/30 blur-2xl animate-pulse" />
                  <div className="absolute bottom-8 right-10 w-16 h-16 rounded-full bg-secondary/30 blur-2xl animate-pulse" style={{ animationDelay: "0.5s" }} />
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary/25 via-secondary/15 to-transparent ring-1 ring-white/25 shadow-[0_0_50px_rgba(209,30,90,0.35)] flex items-center justify-center animate-float">
                    <img
                      src="/logo.png"
                      alt="Papel e Sonhos"
                      className="w-24 h-24 object-contain drop-shadow-[0_0_18px_rgba(209,30,90,0.55)]"
                    />
                  </div>
                  <p className="relative text-white/80 font-bold text-lg drop-shadow-[0_0_12px_rgba(209,30,90,0.6)]">
                    Papel <span className="text-primary">&amp;</span> Sonhos
                  </p>
                  <p className="relative text-white/50 text-sm max-w-[220px]">
                    Papelaria Criativa e Informática
                  </p>
                </div>

                {[
                  { icon: Cake, label: "Topos de bolo", className: "top-2 -left-6", delay: "0s" },
                  { icon: Coffee, label: "Canecas", className: "top-16 -right-8", delay: "0.8s" },
                  { icon: Sticker, label: "Adesivos", className: "bottom-20 -left-8", delay: "1.6s" },
                  { icon: Gift, label: "Lembrancinhas", className: "bottom-2 -right-4", delay: "2.4s" },
                ].map((chip) => (
                  <div
                    key={chip.label}
                    className={`absolute ${chip.className} animate-float flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md`}
                    style={{ animationDelay: chip.delay }}
                  >
                    <chip.icon className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-white">{chip.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ PROCURA? */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
              Explore
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              O que você procura?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Escolha um dos nossos serviços e descubra tudo o que podemos criar
              para você.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CATEGORY_CARDS.map((card, idx) => (
              <div
                key={card.title}
                className="group flex flex-col p-7 rounded-3xl bg-card border border-border hover:border-primary/30 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} bg-opacity-20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <card.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                >
                  Ver opções <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIS PROCURADOS */}
      <section className="py-20 bg-muted/40">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
              Destaques
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">Mais procurados</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Os itens favoritos de quem já confiou no nosso trabalho.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {FEATURED_ITEMS.map((item, idx) => (
              <div
                key={item.title}
                className="group bg-card rounded-3xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <Link href={item.href} className="block">
                  <div
                    className={`relative aspect-[4/3] bg-gradient-to-br ${item.gradient} bg-opacity-20 flex items-center justify-center overflow-hidden`}
                  >
                    <item.icon className="w-16 h-16 text-white/90 group-hover:scale-110 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-primary text-xs font-bold shadow-sm">
                      {item.title}
                    </span>
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="font-bold text-sm md:text-base mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">Consulte o valor</p>
                  </div>
                </Link>
                <div className="px-4 pb-4 md:px-5 md:pb-5">
                  <QuoteButtons
                    produto={item.title}
                    categoria="Produtos personalizados"
                    variante="compacto"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIANÇA */}
      <section id="sobre" className="py-20 bg-gradient-to-br from-dark-900 via-dark-100 to-dark-900 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-bold uppercase tracking-wider mb-4">
              Por que escolher a Papel e Sonhos
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Cuidado em cada etapa
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Do primeiro orçamento à entrega, tudo feito para você confiar e
              recomendar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRUST_ITEMS.map((item, idx) => (
              <div
                key={item.title}
                className="p-7 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section id="trabalhos" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
              Portfólio
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">Nossos trabalhos</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Um gostinho do que já criamos com carinho. Em breve, as fotos de
              cada produção.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {WORK_ITEMS.slice(0, 4).map((item) => {
              const gradient = WORK_GRADIENTS[item.category];
              return (
                <Link
                  key={item.id}
                  href="/trabalhos"
                  className="group rounded-3xl border border-border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`relative aspect-square bg-gradient-to-br ${gradient} bg-opacity-20 flex items-center justify-center`}
                  >
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <div className="w-12 h-12 rounded-2xl bg-white/80 flex items-center justify-center">
                        <Camera className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-xs font-medium bg-white/70 px-3 py-1 rounded-full">
                        Foto em breve
                      </span>
                    </div>
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-primary text-xs font-bold shadow-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/trabalhos"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/25"
            >
              Ver todos os trabalhos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contato" className="py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-dark-900 via-dark-100 to-dark-900 px-6 py-14 md:p-20 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(209,30,90,0.15),transparent_60%),radial-gradient(ellipse_at_80%_50%,rgba(227,27,109,0.1),transparent_50%)]" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                Tem uma ideia? Vamos transformar em realidade!
              </h2>
              <p className="text-white/60 text-lg mb-8">
                Conte para nós o que você está imaginando e solicite seu
                orçamento.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 hover:-translate-y-0.5 transition-all shadow-lg shadow-green-500/30"
              >
                <MessageCircle className="w-5 h-5" />
                Falar pelo WhatsApp
              </a>
              <a
                href={APP.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 ring-1 ring-white/20 text-white font-bold rounded-full hover:bg-white/15 hover:-translate-y-0.5 transition-all"
              >
                <Star className="w-5 h-5 fill-current text-amber-400" />
                Avaliar no Google
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
