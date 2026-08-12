import type { Metadata } from "next";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import {
  Accessibility,
  Award,
  BadgeCheck,
  Building2,
  Camera,
  CalendarDays,
  CreditCard,
  FileText,
  Handshake,
  Laptop,
  Layers,
  MessageCircle,
  Printer,
  Rocket,
  ShieldCheck,
  Sprout,
  Target,
  Timer,
  UsersRound,
  Wallet,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre nós",
  description:
    "Conheça a Papel e Sonhos, uma empresa com mais de 12 anos de excelência em serviços gráficos e digitais. Desde 28 de setembro de 2012 transformando ideias em memórias.",
  openGraph: {
    title: "Sobre nós | Papel e Sonhos",
    description:
      "12+ anos de excelência em serviços gráficos e digitais. Desde 28 de setembro de 2012.",
  },
};

const VALUES = [
  {
    icon: Target,
    title: "Compromisso com a Qualidade",
    description:
      "Cada serviço entregue passa por rigorosos padrões de excelência",
  },
  {
    icon: Handshake,
    title: "Atendimento Humanizado",
    description:
      "Tratamos cada cliente com respeito, empatia e atenção personalizada",
  },
  {
    icon: Rocket,
    title: "Inovação Constante",
    description:
      "Buscamos sempre as melhores tecnologias e práticas do mercado",
  },
  {
    icon: ShieldCheck,
    title: "Transparência",
    description:
      "Mantemos comunicação clara e honesta em todas as nossas relações",
  },
  {
    icon: Sprout,
    title: "Responsabilidade Social",
    description:
      "Acreditamos no poder transformador da educação e da tecnologia",
  },
  {
    icon: Accessibility,
    title: "Acessibilidade",
    description:
      "Democratizamos o acesso a ferramentas profissionais de qualidade",
  },
];

const SERVICE_GROUPS = [
  {
    icon: Printer,
    title: "Impressão e Reprodução",
    items: [
      "Xerox e impressão digital de alta qualidade",
      "Impressão colorida e preto e branco",
      "Reprodução de documentos em diversos formatos",
      "Encadernação e acabamento profissional",
      "Impressão de materiais gráficos personalizados",
    ],
  },
  {
    icon: FileText,
    title: "Currículos e Documentos",
    items: [
      "Criação de currículos profissionais online",
      "Modelos modernos e otimizados para ATS",
      "Revisão e formatação de documentos",
      "Cartas de apresentação personalizadas",
      "Papelaria corporativa e personalizada",
    ],
  },
  {
    icon: Camera,
    title: "Serviços Fotográficos",
    items: [
      "Fotos 3x4 profissionais",
      "Tratamento e edição de imagens",
      "Fotos para documentos diversos",
      "Digitalização de fotografias antigas",
      "Restauração digital de fotos",
    ],
  },
  {
    icon: Layers,
    title: "Serviços Digitais",
    items: [
      "Digitalização de documentos",
      "Conversão de formatos (PDF, Word, Excel)",
      "Organização digital de arquivos",
      "Backup e armazenamento seguro",
      "Edição e formatação de textos",
    ],
  },
  {
    icon: CreditCard,
    title: "Serviços Financeiros",
    items: [
      "Emissão de boletos bancários",
      "Cópias autenticadas",
      "Impressão de comprovantes",
      "Organização de documentos fiscais",
      "Suporte para declarações",
    ],
  },
  {
    icon: Laptop,
    title: "Soluções Tecnológicas",
    items: [
      "Plataforma online de criação de currículos",
      "Ferramentas de análise ATS",
      "Otimização de documentos com IA",
      "Consultoria em tecnologia",
      "Suporte técnico especializado",
    ],
  },
];

const DIFFERENTIALS = [
  {
    icon: Award,
    title: "Experiência Comprovada",
    description:
      "Mais de 12 anos atendendo milhares de clientes com excelência e profissionalismo",
  },
  {
    icon: Rocket,
    title: "Inovação Tecnológica",
    description:
      "Sempre atualizados com as melhores ferramentas e tecnologias do mercado",
  },
  {
    icon: BadgeCheck,
    title: "Qualidade Garantida",
    description:
      "Padrões rigorosos de qualidade em todos os nossos serviços e entregas",
  },
  {
    icon: Handshake,
    title: "Atendimento Personalizado",
    description:
      "Cada cliente é único e recebe atenção dedicada e soluções sob medida",
  },
  {
    icon: Wallet,
    title: "Preços Justos",
    description: "Serviços de qualidade com preços acessíveis e transparentes",
  },
  {
    icon: Timer,
    title: "Agilidade na Entrega",
    description:
      "Processos otimizados para garantir rapidez sem comprometer a qualidade",
  },
];

const TIMELINE = [
  {
    year: "2012",
    title: "Fundação",
    text: "No dia 28 de setembro de 2012 nasce a Papel e Sonhos, com o objetivo de oferecer serviços gráficos e digitais de qualidade a preços justos.",
  },
  {
    year: "Primeiros anos",
    title: "Consolidando a confiança",
    text: "Foco em serviços tradicionais como impressão, cópias, digitalização de documentos e criação de currículos, conquistando a confiança da comunidade local.",
  },
  {
    year: "2024",
    title: "Plataforma online",
    text: "Lançamento da nossa plataforma online de criação de currículos, democratizando o acesso a ferramentas profissionais.",
  },
  {
    year: "Hoje",
    title: "Transformando realidades",
    text: "Mais de 50.000 pessoas já criaram currículos profissionais que abriram portas para novas oportunidades de trabalho.",
  },
];

export default function SobrePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a0a0e] via-[#2c1a1d] to-[#1a0a0e] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(209,30,90,0.15)_0%,transparent_60%),radial-gradient(ellipse_at_80%_20%,rgba(227,27,109,0.1)_0%,transparent_50%)]" />
        <div className="container relative z-10 pt-32 pb-16 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-bold uppercase tracking-wider mb-5 backdrop-blur-sm">
            Papelaria Criativa e Informática
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Sobre a{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-primary to-pink-300">
              Papel e Sonhos
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-6">
            12+ anos de excelência em serviços gráficos e digitais
          </p>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-white/10 text-white/90 text-sm font-medium">
            <CalendarDays className="w-4 h-4 text-primary" />
            Desde 28 de setembro de 2012
          </span>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-14">
            {[
              { num: "12+", label: "Anos de experiência" },
              { num: "50.000+", label: "Currículos criados" },
              { num: "Milhares", label: "Clientes atendidos" },
              { num: "100%", label: "Feito com carinho" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-black text-white">
                  {stat.num}
                </p>
                <p className="text-sm text-white/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section id="historia" className="py-20">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
              Nossa história
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">Quem somos</h2>
          </div>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              A <strong className="text-foreground">Papel e Sonhos</strong> é
              uma empresa brasileira com mais de 12 anos de experiência
              dedicada a oferecer soluções práticas, acessíveis e de qualidade
              para pessoas e empresas. Desde nossa fundação em{" "}
              <strong className="text-foreground">
                28 de setembro de 2012
              </strong>
              , construímos uma trajetória sólida baseada em confiança,
              inovação e compromisso com nossos clientes.
            </p>
            <p>
              Nossa missão sempre foi clara:{" "}
              <strong className="text-foreground">
                simplificar a vida das pessoas através da tecnologia e serviços
                profissionais
              </strong>
              . Acreditamos que todos merecem acesso a ferramentas de qualidade
              que possam impulsionar suas carreiras e negócios,
              independentemente de sua situação financeira.
            </p>
            <p>
              Ao longo desses anos, evoluímos constantemente, acompanhando as
              transformações do mercado e as necessidades de nossos clientes. O
              que começou como um pequeno negócio local se transformou em uma
              plataforma digital que atende milhares de usuários em todo o
              Brasil.
            </p>
            <p>
              Hoje, somos reconhecidos pela{" "}
              <strong className="text-foreground">
                qualidade de nossos serviços, atendimento humanizado e
                compromisso com a excelência
              </strong>
              . Cada projeto que desenvolvemos carrega nossa essência: fazer a
              diferença na vida das pessoas de forma prática e eficiente.
            </p>
          </div>
        </div>
      </section>

      {/* TRAJETÓRIA */}
      <section id="trajetoria" className="py-20 bg-muted/40">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
              Linha do tempo
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Nossa trajetória
            </h2>
          </div>

          <div className="relative pl-8 md:pl-0">
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            <div className="space-y-10">
              {TIMELINE.map((step, idx) => (
                <div
                  key={step.year}
                  className={`relative md:flex md:items-start md:gap-10 ${
                    idx % 2 === 0 ? "" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-3 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary ring-4 ring-background top-1" />
                  <div className="md:w-1/2 md:mx-auto md:px-0">
                    <div className="ml-8 md:ml-0 rounded-3xl border border-border bg-card p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
                        {step.year}
                      </span>
                      <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISSÃO, VISÃO E VALORES */}
      <section id="missao-visao-valores" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
              Nossos princípios
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Missão, visão e valores
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-12">
            <div className="p-8 rounded-3xl border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-xl mb-3">Nossa Missão</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Oferecer soluções tecnológicas e serviços profissionais de alta
                qualidade, acessíveis e humanizados, que empoderem pessoas e
                empresas a alcançarem seus objetivos e transformarem suas
                realidades.
              </p>
            </div>
            <div className="p-8 rounded-3xl border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-xl mb-3">Nossa Visão</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ser referência nacional em soluções digitais para
                desenvolvimento profissional, reconhecida pela inovação,
                qualidade e impacto social positivo na vida de milhões de
                brasileiros.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="p-7 rounded-3xl border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/15 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-20 bg-muted/40">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
              O que fazemos
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Nossos serviços
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ao longo de mais de uma década, desenvolvemos uma gama completa
              de serviços que atendem desde necessidades básicas do dia a dia
              até demandas corporativas complexas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICE_GROUPS.map((group) => (
              <div
                key={group.title}
                className="p-7 rounded-3xl border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <group.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3">{group.title}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section id="diferenciais" className="py-20 bg-gradient-to-br from-dark-900 via-dark-100 to-dark-900 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-bold uppercase tracking-wider mb-4">
              Diferenciais
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Por que nos escolher?
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Em um mercado competitivo, nos destacamos por uma combinação
              única de experiência, tecnologia e atendimento humanizado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DIFFERENTIALS.map((diff) => (
              <div
                key={diff.title}
                className="p-7 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <diff.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{diff.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {diff.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPE E FOTOS */}
      <section id="equipe" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
              Em breve
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Nossa equipe
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Espaço reservado para apresentar as pessoas que fazem a Papel e
              Sonhos acontecer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="text-center p-7 rounded-3xl border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <UsersRound className="w-9 h-9 text-muted-foreground/40" />
                </div>
                <p className="font-bold text-sm">[Nome do colaborador]</p>
                <p className="text-xs text-muted-foreground mt-1">
                  [Função na empresa]
                </p>
                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground">
                  Foto em breve
                </span>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black mb-2">Nosso espaço</h3>
              <p className="text-muted-foreground">
                Fotos da nossa loja e estrutura em breve.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-border flex flex-col items-center justify-center gap-2 text-muted-foreground"
                >
                  <Camera className="w-8 h-8" />
                  <span className="text-xs font-medium bg-white/70 dark:bg-dark-900/70 px-3 py-1 rounded-full">
                    Foto em breve
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-dark-900 via-dark-100 to-dark-900 px-6 py-14 md:p-20 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(209,30,90,0.15),transparent_60%),radial-gradient(ellipse_at_80%_50%,rgba(227,27,109,0.1),transparent_50%)]" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                Vamos fazer acontecer?
              </h2>
              <p className="text-white/60 text-lg mb-8">
                Conheça mais sobre nossos serviços ou solicite seu orçamento.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all"
                >
                  Entrar em contato
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 hover:-translate-y-0.5 transition-all shadow-lg shadow-green-500/30"
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar pelo WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
