import type { GalleryItem } from "./gallery";

export const WORK_CATEGORIES = [
  "Aniversários",
  "Personalizados",
  "Papelaria",
  "Camisas",
  "Canecas",
  "Lembrancinhas",
  "Impressões",
] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export interface WorkItem extends GalleryItem {
  category: WorkCategory;
  image?: string;
}

export const WORK_ITEMS: WorkItem[] = [
  {
    id: "kit-festa-infantil",
    title: "Kit Festa Infantil",
    category: "Aniversários",
    description:
      "[Imagem de exemplo - adicione a foto do kit festa produzido pelo painel administrativo]",
    tags: ["kit festa", "aniversário", "decoração"],
  },
  {
    id: "topo-bolo-aniversario",
    title: "Topo de Bolo de Aniversário",
    category: "Aniversários",
    description:
      "[Imagem de exemplo - adicione a foto do topo de bolo produzido pelo painel administrativo]",
    tags: ["topo de bolo", "aniversário", "personalizado"],
  },
  {
    id: "topper-mesa-doce",
    title: "Topper de Mesa Doce",
    category: "Aniversários",
    description:
      "[Imagem de exemplo - adicione a foto do topper produzido pelo painel administrativo]",
    tags: ["topper", "mesa doce", "tema"],
  },
  {
    id: "caderneta-personalizada",
    title: "Caderneta Personalizada",
    category: "Personalizados",
    description:
      "[Imagem de exemplo - adicione a foto da caderneta produzida pelo painel administrativo]",
    tags: ["caderneta", "personalizado", "presente"],
  },
  {
    id: "azulejo-personalizado",
    title: "Azulejo Personalizado",
    category: "Personalizados",
    description:
      "[Imagem de exemplo - adicione a foto do azulejo produzido pelo painel administrativo]",
    tags: ["azulejo", "personalizado", "decorativo"],
  },
  {
    id: "convite-casamento",
    title: "Convite de Casamento",
    category: "Papelaria",
    description:
      "[Imagem de exemplo - adicione a foto do convite produzido pelo painel administrativo]",
    tags: ["convite", "casamento", "papelaria"],
  },
  {
    id: "papelaria-corporativa",
    title: "Papelaria Corporativa",
    category: "Papelaria",
    description:
      "[Imagem de exemplo - adicione a foto do material corporativo produzido pelo painel administrativo]",
    tags: ["cartão de visita", "empresa", "identidade visual"],
  },
  {
    id: "camisa-evento-familiar",
    title: "Camisa de Evento Familiar",
    category: "Camisas",
    description:
      "[Imagem de exemplo - adicione a foto da camisa produzida pelo painel administrativo]",
    tags: ["camisa", "família", "evento"],
  },
  {
    id: "camisa-confra",
    title: "Camisa de Confraternização",
    category: "Camisas",
    description:
      "[Imagem de exemplo - adicione a foto da camisa produzida pelo painel administrativo]",
    tags: ["camisa", "confraternização", "estampa"],
  },
  {
    id: "caneca-com-foto",
    title: "Caneca com Foto",
    category: "Canecas",
    description:
      "[Imagem de exemplo - adicione a foto da caneca produzida pelo painel administrativo]",
    tags: ["caneca", "foto", "presente"],
  },
  {
    id: "caneca-termica",
    title: "Caneca Térmica Personalizada",
    category: "Canecas",
    description:
      "[Imagem de exemplo - adicione a foto da caneca térmica produzida pelo painel administrativo]",
    tags: ["caneca térmica", "personalizado", "marca"],
  },
  {
    id: "saquinhos-personalizados",
    title: "Saquinhos Personalizados",
    category: "Lembrancinhas",
    description:
      "[Imagem de exemplo - adicione a foto dos saquinhos produzidos pelo painel administrativo]",
    tags: ["saquinho", "lembrancinha", "festa"],
  },
  {
    id: "caixinhas-de-mimo",
    title: "Caixinhas de Mimo",
    category: "Lembrancinhas",
    description:
      "[Imagem de exemplo - adicione a foto das caixinhas produzidas pelo painel administrativo]",
    tags: ["caixinha", "mimo", "presente"],
  },
  {
    id: "banner-evento",
    title: "Banner de Evento",
    category: "Impressões",
    description:
      "[Imagem de exemplo - adicione a foto do banner produzido pelo painel administrativo]",
    tags: ["banner", "evento", "impressão"],
  },
  {
    id: "impressao-de-fotos",
    title: "Impressão de Fotos",
    category: "Impressões",
    description:
      "[Imagem de exemplo - adicione a foto do material impresso pelo painel administrativo]",
    tags: ["fotos", "impressão", "recordação"],
  },
  {
    id: "encadernacao-trabalho",
    title: "Encadernação de Trabalho",
    category: "Impressões",
    description:
      "[Imagem de exemplo - adicione a foto do material encadernado pelo painel administrativo]",
    tags: ["encadernação", "documentos", "acabamento"],
  },
];

export const WORK_GRADIENTS: Record<WorkCategory, string> = {
  Aniversários: "from-pink-400 to-rose-500",
  Personalizados: "from-fuchsia-400 to-purple-500",
  Papelaria: "from-rose-400 to-red-500",
  Camisas: "from-sky-400 to-blue-500",
  Canecas: "from-amber-400 to-orange-500",
  Lembrancinhas: "from-violet-400 to-purple-500",
  Impressões: "from-emerald-400 to-teal-500",
};
