import type { ComponentType } from "react";
import {
  Book,
  BookOpen,
  Briefcase,
  Cake,
  Calculator,
  Camera,
  Coffee,
  Copy,
  FileCheck,
  FileText,
  Flag,
  FolderOpen,
  Gift,
  Globe,
  Keyboard,
  KeyRound,
  Laptop,
  LayoutGrid,
  Monitor,
  Notebook,
  PenTool,
  Printer,
  Scan,
  Scissors,
  Shirt,
  ShoppingBag,
  Sticker,
  UserRound,
  Wrench,
} from "lucide-react";

export type CatalogIcon = ComponentType<{ className?: string }>;

export const CATALOG_ICONS: Record<string, CatalogIcon> = {
  book: Book,
  "book-open": BookOpen,
  briefcase: Briefcase,
  cake: Cake,
  calculator: Calculator,
  camera: Camera,
  coffee: Coffee,
  copy: Copy,
  "file-check": FileCheck,
  "file-text": FileText,
  flag: Flag,
  "folder-open": FolderOpen,
  gift: Gift,
  globe: Globe,
  keyboard: Keyboard,
  "key-round": KeyRound,
  laptop: Laptop,
  "layout-grid": LayoutGrid,
  monitor: Monitor,
  notebook: Notebook,
  "pen-tool": PenTool,
  printer: Printer,
  scan: Scan,
  scissors: Scissors,
  shirt: Shirt,
  "shopping-bag": ShoppingBag,
  sticker: Sticker,
  "user-round": UserRound,
  wrench: Wrench,
};

export const getCatalogIcon = (key: string): CatalogIcon =>
  CATALOG_ICONS[key] ?? Scissors;

export const CATALOG_CATEGORY_STYLE: Record<
  string,
  { gradient: string; badge: string }
> = {
  "papelaria-e-personalizados": {
    gradient: "from-pink-500 to-rose-500",
    badge: "bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300",
  },
  "impressao-e-grafica": {
    gradient: "from-emerald-500 to-teal-500",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  informatica: {
    gradient: "from-indigo-500 to-violet-500",
    badge:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  },
  "servicos-digitais": {
    gradient: "from-amber-500 to-orange-500",
    badge:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  },
};

export const getCategoryStyle = (slug: string) =>
  CATALOG_CATEGORY_STYLE[slug] ?? CATALOG_CATEGORY_STYLE["papelaria-e-personalizados"];
