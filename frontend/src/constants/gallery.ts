export const GALLERY_CATEGORIES = [
  "Papelaria Personalizada",
  "Lembrancinhas",
  "Topos de Bolo",
  "Encadernação",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  tags: string[];
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "convite-personalizado",
    title: "Convite Personalizado",
    category: "Papelaria Personalizada",
    description:
      "[Imagem de exemplo - adicione a foto de um convite produzido]",
    tags: ["convite", "personalizado", "aniversário"],
  },
  {
    id: "kit-festa-completo",
    title: "Kit Festa Completo",
    category: "Papelaria Personalizada",
    description:
      "[Imagem de exemplo - adicione a foto de um kit festa montado]",
    tags: ["kit festa", "personalizado", "decoração"],
  },
  {
    id: "papelaria-corporativa",
    title: "Papelaria Corporativa",
    category: "Papelaria Personalizada",
    description:
      "[Imagem de exemplo - adicione a foto de cartões de visita ou papelaria de empresa]",
    tags: ["cartão de visita", "empresa", "identidade visual"],
  },
  {
    id: "lembrancinha-tematica",
    title: "Lembrancinha Temática",
    category: "Lembrancinhas",
    description:
      "[Imagem de exemplo - adicione a foto de uma lembrancinha produzida]",
    tags: ["lembrancinha", "tema", "festa"],
  },
  {
    id: "saquinho-personalizado",
    title: "Saquinho Personalizado",
    category: "Lembrancinhas",
    description:
      "[Imagem de exemplo - adicione a foto de saquinhos personalizados]",
    tags: ["saquinho", "personalizado", "festa"],
  },
  {
    id: "topo-bolo-infantil",
    title: "Topo de Bolo Infantil",
    category: "Topos de Bolo",
    description:
      "[Imagem de exemplo - adicione a foto de um topo de bolo infantil]",
    tags: ["topo de bolo", "infantil", "aniversário"],
  },
  {
    id: "topo-bolo-casamento",
    title: "Topo de Bolo Casamento",
    category: "Topos de Bolo",
    description:
      "[Imagem de exemplo - adicione a foto de um topo de bolo de casamento]",
    tags: ["topo de bolo", "casamento", "noivos"],
  },
  {
    id: "encadernacao-capa-dura",
    title: "Encadernação em Capa Dura",
    category: "Encadernação",
    description:
      "[Imagem de exemplo - adicione a foto de um trabalho encadernado]",
    tags: ["encadernação", "capa dura", "acabamento"],
  },
];

export const GALLERY_GRADIENTS: Record<string, string> = {
  "Papelaria Personalizada": "from-pink-400 to-rose-500",
  Lembrancinhas: "from-purple-400 to-pink-500",
  "Topos de Bolo": "from-rose-400 to-red-500",
  "Encadernação": "from-cyan-400 to-blue-500",
};
