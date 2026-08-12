export interface CatalogCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  icon: string;
}

export interface CatalogItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  icon: string;
  summary: string;
  description: string;
  highlights: string[];
}

export const CATALOG_CATEGORIES: CatalogCategory[] = [
  {
    id: "cat-papelaria",
    slug: "papelaria-e-personalizados",
    name: "Papelaria e Personalizados",
    tagline: "Papelaria criativa e itens personalizados para cada ocasião.",
    icon: "scissors",
  },
  {
    id: "cat-impressao",
    slug: "impressao-e-grafica",
    name: "Impressão e Gráfica",
    tagline: "Impressão, xerox e acabamentos gráficos com qualidade.",
    icon: "printer",
  },
  {
    id: "cat-informatica",
    slug: "informatica",
    name: "Informática",
    tagline: "Serviços e soluções de informática para o seu dia a dia.",
    icon: "laptop",
  },
  {
    id: "cat-digitais",
    slug: "servicos-digitais",
    name: "Serviços Digitais",
    tagline: "Documentos e serviços digitais resolvidos sem burocracia.",
    icon: "globe",
  },
];

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "item-agendas",
    slug: "agendas",
    name: "Agendas",
    category: "papelaria-e-personalizados",
    icon: "book",
    summary: "Agendas personalizadas para organizar o seu dia com estilo.",
    description:
      "Agendas sob medida com capa, fotos e temas personalizados, perfeitas para uso pessoal, escolar ou corporativo.",
    highlights: [
      "Personalização de capa e miolo",
      "Tamanhos e formatos variados",
      "Ideal para presentear",
    ],
  },
  {
    id: "item-cadernetas",
    slug: "cadernetas",
    name: "Cadernetas",
    category: "papelaria-e-personalizados",
    icon: "notebook",
    summary: "Cadernetas personalizadas para anotações e presente.",
    description:
      "Cadernetas com capa dura ou brochura, personalizadas com nome, fotos ou tema preferido.",
    highlights: [
      "Capas personalizadas",
      "Opções de pauta ou sem pauta",
      "Perfeitas para lembranças",
    ],
  },
  {
    id: "item-topos-de-bolo",
    slug: "topos-de-bolo",
    name: "Topos de bolo",
    category: "papelaria-e-personalizados",
    icon: "cake",
    summary: "Topos de bolo personalizados para aniversários e festas.",
    description:
      "Topos de bolo decorativos com o tema da sua festa, prontos para deixar a mesa ainda mais especial.",
    highlights: [
      "Temas infantis, casamento e datas especiais",
      "Materiais de acabamento fino",
      "Personalização total",
    ],
  },
  {
    id: "item-lembrancinhas",
    slug: "lembrancinhas",
    name: "Lembrancinhas",
    category: "papelaria-e-personalizados",
    icon: "gift",
    summary: "Lembrancinhas personalizadas para eternizar momentos.",
    description:
      "Lembrancinhas criativas e personalizadas para distribuir em festas, eventos e celebrações.",
    highlights: [
      "Personalização com nome e data",
      "Sacos, caixas e mimos variados",
      "Fechamentos por tema",
    ],
  },
  {
    id: "item-camisas",
    slug: "camisas-personalizadas",
    name: "Camisas personalizadas",
    category: "papelaria-e-personalizados",
    icon: "shirt",
    summary: "Camisas com estampas e frases personalizadas.",
    description:
      "Camisas personalizadas para eventos, famílias, times e empresas com a sua arte ou frase.",
    highlights: [
      "Estampa ou bordado personalizado",
      "Vários tamanhos e cores",
      "Produção por encomenda",
    ],
  },
  {
    id: "item-canecas",
    slug: "canecas-personalizadas",
    name: "Canecas personalizadas",
    category: "papelaria-e-personalizados",
    icon: "coffee",
    summary: "Canecas com foto, nome ou mensagem personalizada.",
    description:
      "Canecas térmicas ou de porcelana personalizadas com fotos, nomes ou frases especiais.",
    highlights: [
      "Impressão de alta durabilidade",
      "Modelos de caneca variados",
      "Ótima opção de presente",
    ],
  },
  {
    id: "item-azulejos",
    slug: "azulejos-personalizados",
    name: "Azulejos personalizados",
    category: "papelaria-e-personalizados",
    icon: "layout-grid",
    summary: "Azulejos personalizados com foto, frase ou logo.",
    description:
      "Azulejos decorativos personalizados com a foto ou mensagem que você escolher, para presentear ou decorar.",
    highlights: [
      "Foto, frase ou logo em alta definição",
      "Acabamento resistente",
      "Presente criativo e durável",
    ],
  },
  {
    id: "item-bolsinhas",
    slug: "bolsinhas",
    name: "Bolsinhas",
    category: "papelaria-e-personalizados",
    icon: "shopping-bag",
    summary: "Bolsinhas personalizadas para eventos e presentes.",
    description:
      "Bolsinhas personalizadas com tema, nome ou identidade visual para eventos e lembranças.",
    highlights: [
      "Cores e temas personalizados",
      "Usadas como lembrancinha",
      "Produção sob encomenda",
    ],
  },
  {
    id: "item-necessaires",
    slug: "necessaires",
    name: "Necessaires",
    category: "papelaria-e-personalizados",
    icon: "briefcase",
    summary: "Necessaires personalizadas com a sua arte.",
    description:
      "Necessaires personalizadas com estampas, fotos ou logotipos, ideais para uso pessoal ou corporativo.",
    highlights: [
      "Personalização com logo ou estampa",
      "Tamanhos e modelos variados",
      "Ótimo brinde corporativo",
    ],
  },
  {
    id: "item-adesivos",
    slug: "adesivos",
    name: "Adesivos",
    category: "papelaria-e-personalizados",
    icon: "sticker",
    summary: "Adesivos recortados ou avulsos em várias cores e formatos.",
    description:
      "Adesivos personalizados em vinil, recortados no formato da sua arte, para embalagens, produtos ou decoração.",
    highlights: [
      "Recorte sob medida",
      "Impressão de alta qualidade",
      "Vários tamanhos e acabamentos",
    ],
  },
  {
    id: "item-banners",
    slug: "banners",
    name: "Banners",
    category: "papelaria-e-personalizados",
    icon: "flag",
    summary: "Banners personalizados para eventos e divulgação.",
    description:
      "Banners em lona ou material próprio para eventos, fachadas e divulgação, impressos na sua arte.",
    highlights: [
      "Vários tamanhos",
      "Impressão nítida e durável",
      "Lona ou vinil",
    ],
  },
  {
    id: "item-papelaria-personalizada",
    slug: "papelaria-personalizada",
    name: "Papelaria personalizada",
    category: "papelaria-e-personalizados",
    icon: "pen-tool",
    summary: "Convites, kits de festa e papelaria completa sob medida.",
    description:
      "Papelaria personalizada completa: convites, tags, rótulos, kits de festa e papelaria corporativa com a sua identidade.",
    highlights: [
      "Convites e kits de festa",
      "Papelaria corporativa",
      "Design exclusivo",
    ],
  },
  {
    id: "item-xerox",
    slug: "xerox",
    name: "Xerox",
    category: "impressao-e-grafica",
    icon: "copy",
    summary: "Cópias coloridas e preto e branco com qualidade.",
    description:
      "Cópias rápidas em preto e branco ou coloridas, com qualidade de impressão para documentos e materiais.",
    highlights: [
      "Cópias P&B e coloridas",
      "Documentos em geral",
      "Atendimento rápido",
    ],
  },
  {
    id: "item-impressao",
    slug: "impressao",
    name: "Impressão",
    category: "impressao-e-grafica",
    icon: "printer",
    summary: "Impressões de documentos, trabalhos e materiais.",
    description:
      "Impressão de documentos, trabalhos escolares, currículos e materiais gráficos com ótima qualidade.",
    highlights: [
      "Impressão P&B e colorida",
      "Formatos diversos",
      "Entrega no prazo",
    ],
  },
  {
    id: "item-fotos",
    slug: "fotos",
    name: "Fotos",
    category: "impressao-e-grafica",
    icon: "camera",
    summary: "Impressão de fotos para recordar momentos.",
    description:
      "Impressão de fotos em diversos tamanhos para guardar e presentear os seus melhores momentos.",
    highlights: [
      "Tamanhos variados",
      "Acabamento fosco ou brilhante",
      "Ideal para molduras e álbuns",
    ],
  },
  {
    id: "item-boletos",
    slug: "boletos",
    name: "Boletos",
    category: "impressao-e-grafica",
    icon: "file-text",
    summary: "Impressão de boletos e documentos financeiros.",
    description:
      "Impressão de boletos, carnês e documentos financeiros com clareza e precisão.",
    highlights: [
      "Boleto e carnê",
      "Leitura de código de barras preservada",
      "Impressão nítida",
    ],
  },
  {
    id: "item-encadernacao",
    slug: "encadernacao",
    name: "Encadernação",
    category: "impressao-e-grafica",
    icon: "book-open",
    summary: "Encadernação de trabalhos, documentos e materiais.",
    description:
      "Encadernação simples, espiral ou capa dura para monografias, trabalhos e documentos importantes.",
    highlights: [
      "Espiral, capa dura ou brochura",
      "Proteção e acabamento profissional",
      "Ideal para trabalhos acadêmicos",
    ],
  },
  {
    id: "item-escaneamento",
    slug: "escaneamento",
    name: "Escaneamento",
    category: "impressao-e-grafica",
    icon: "scan",
    summary: "Digitalização de fotos e documentos.",
    description:
      "Escaneamento de documentos e fotos em alta resolução para arquivo digital seguro e organizado.",
    highlights: [
      "Alta resolução",
      "Documentos e fotos",
      "Arquivo digitalizado",
    ],
  },
  {
    id: "item-curriculos",
    slug: "curriculos",
    name: "Currículos",
    category: "informatica",
    icon: "user-round",
    summary: "Elaboração e digitação de currículos profissionais.",
    description:
      "Criação, formatação e digitação de currículos com destaque para suas habilidades e experiência.",
    highlights: [
      "Modelo profissional",
      "Formatação e revisão",
      "Pronto para impressão",
    ],
  },
  {
    id: "item-digitacao",
    slug: "digitacao",
    name: "Digitação",
    category: "informatica",
    icon: "keyboard",
    summary: "Serviço de digitação de documentos e textos.",
    description:
      "Digitação de documentos, trabalhos, cartas e textos com agilidade e precisão.",
    highlights: [
      "Textos e documentos",
      "Formatação inclusa",
      "Prazo combinado",
    ],
  },
  {
    id: "item-formatacao-computador",
    slug: "formatacao-de-computador",
    name: "Formatação de computador",
    category: "informatica",
    icon: "monitor",
    summary: "Formatação completa de computadores desktop.",
    description:
      "Formatação e instalação de sistema operacional e programas essenciais para o seu computador voltar a funcionar rápido.",
    highlights: [
      "Instalação do sistema",
      "Drivers e programas essenciais",
      "Backup de arquivos orientado",
    ],
  },
  {
    id: "item-formatacao-notebook",
    slug: "formatacao-de-notebook",
    name: "Formatação de notebook",
    category: "informatica",
    icon: "laptop",
    summary: "Formatação e otimização de notebooks.",
    description:
      "Formatação completa de notebooks com instalação de sistema, drivers e programas necessários.",
    highlights: [
      "Sistema e drivers atualizados",
      "Otimização de desempenho",
      "Atendimento orientado",
    ],
  },
  {
    id: "item-servicos-informatica",
    slug: "servicos-de-informatica",
    name: "Serviços de informática",
    category: "informatica",
    icon: "wrench",
    summary: "Suporte técnico e manutenção de computadores.",
    description:
      "Manutenção preventiva e corretiva, instalação de programas e suporte técnico para equipamentos em geral.",
    highlights: [
      "Manutenção e suporte",
      "Instalação de programas",
      "Orientação técnica",
    ],
  },
  {
    id: "item-imposto-de-renda",
    slug: "declaracao-de-imposto-de-renda",
    name: "Declaração de imposto de renda",
    category: "servicos-digitais",
    icon: "calculator",
    summary: "Declaração de IR com acompanhamento e orientação.",
    description:
      "Elaboração e envio da declaração de imposto de renda com orientação sobre documentos e deduções.",
    highlights: [
      "Análise de documentos",
      "Envio da declaração",
      "Orientação sobre restituição",
    ],
  },
  {
    id: "item-abertura-mei",
    slug: "abertura-de-mei",
    name: "Abertura de MEI",
    category: "servicos-digitais",
    icon: "briefcase",
    summary: "Abertura de MEI completa e descomplicada.",
    description:
      "Abertura de MEI com orientação sobre atividades, obrigações e benefícios para o seu negócio.",
    highlights: [
      "Enquadramento correto",
      "Orientação completa",
      "Regularização facilitada",
    ],
  },
  {
    id: "item-emissao-certidoes",
    slug: "emissao-de-certidoes",
    name: "Emissão de certidões",
    category: "servicos-digitais",
    icon: "file-check",
    summary: "Emissão de certidões negativas e de regularidade.",
    description:
      "Emissão de certidões negativas, de regularidade fiscal e demais certidões junto a órgãos públicos.",
    highlights: [
      "Certidão negativa",
      "Regularidade fiscal",
      "Órgãos públicos",
    ],
  },
  {
    id: "item-recuperacao-gov",
    slug: "recuperacao-de-conta-gov",
    name: "Recuperação de conta GOV",
    category: "servicos-digitais",
    icon: "key-round",
    summary: "Recuperação de acesso ao gov.br com auxílio completo.",
    description:
      "Auxílio para recuperar e desbloquear o acesso da sua conta gov.br para usar os serviços públicos digitais.",
    highlights: [
      "Desbloqueio de acesso",
      "Orientação passo a passo",
      "Uso de serviços digitais",
    ],
  },
  {
    id: "item-servicos-documentos",
    slug: "servicos-relacionados-a-documentos",
    name: "Serviços relacionados a documentos",
    category: "servicos-digitais",
    icon: "folder-open",
    summary: "Auxílio com documentos e serviços online.",
    description:
      "Auxílio com emissão, regularização e atualização de documentos junto aos órgãos públicos.",
    highlights: [
      "Regularização de documentos",
      "Atendimento orientado",
      "Serviços online",
    ],
  },
];

export const PERSONALIZATION_OPTIONS: Record<string, string[]> = {
  "papelaria-e-personalizados": [
    "Personalização com nome, foto ou frase",
    "Escolha de tema e paleta de cores",
    "Tamanhos e formatos variados",
    "Acabamento premium",
  ],
};

export const getCatalogItemBySlug = (slug: string) =>
  CATALOG_ITEMS.find((item) => item.slug === slug);

export const getCatalogItemsByCategory = (categorySlug: string) =>
  CATALOG_ITEMS.filter((item) => item.category === categorySlug);
