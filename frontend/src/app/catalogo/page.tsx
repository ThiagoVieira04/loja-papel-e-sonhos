"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Book,
  BookOpen,
  Briefcase,
  Cake,
  Calculator,
  Camera,
  ChevronDown,
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
  MessageCircle,
  Monitor,
  Notebook,
  PenTool,
  Printer,
  Scan,
  Scissors,
  Search,
  Shirt,
  ShoppingBag,
  Sticker,
  UserRound,
  Wrench,
} from "lucide-react";
import {
  CATALOG_CATEGORIES,
  CATALOG_ITEMS,
  CatalogItem,
} from "@/constants/catalog";

const WHATSAPP_URL = "https://wa.me/5521987172463";
const waWithText = (text: string) =>
  `https://wa.me/5521987172463?text=${encodeURIComponent(text)}`;

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
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

const CATEGORY_STYLE: Record<string, { gradient: string; badge: string }> = {
  "papelaria-e-personalizados": {
    gradient: "from-pink-500 to-rose-500",
    badge: "bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300",
  },
  "impressao-e-grafica": {
    gradient: "from-emerald-500 to-teal-500",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  informatica: {
    gradient: "from-indigo-500 to-violet-500",
    badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  },
  "servicos-digitais": {
    gradient: "from-amber-500 to-orange-500",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  },
};

const getCategory = (slug: string) =>
  CATALOG_CATEGORIES.find((c) => c.slug === slug);

export default function CatalogoPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("todos");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const items = useMemo(() => {
    const term = search.trim().toLowerCase();
    return CATALOG_ITEMS.filter((item) => {
      const matchesCategory =
        category === "todos" || item.category === category;
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const handleToggle = (item: CatalogItem) => {
    setExpandedId((prev) => (prev === item.id ? null : item.id));
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
            Catálogo
          </span>
          <h1 className="text-3xl md:text-5xl font-black mb-3">
            O que você procura?
          </h1>
          <p className="text-muted-foreground">
            Explore produtos personalizados, impressão, informática e serviços
            digitais. Todos os valores são consultados pelo WhatsApp.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar no catálogo..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
                  aria-label="Buscar no catálogo"
                />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-bold mb-2">Categorias</p>
                <button
                  onClick={() => setCategory("todos")}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    category === "todos"
                      ? "bg-primary text-white"
                      : "hover:bg-muted"
                  }`}
                >
                  <Search className="w-4 h-4" />
                  Todos
                </button>
                {CATALOG_CATEGORIES.map((cat) => {
                  const Icon = ICONS[cat.icon] ?? Scissors;
                  const style = CATEGORY_STYLE[cat.slug];
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategory(cat.slug)}
                      className={`flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        category === cat.slug
                          ? "bg-primary text-white"
                          : "hover:bg-muted"
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg bg-gradient-to-br ${style.gradient} flex items-center justify-center text-white flex-shrink-0`}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {items.length} {items.length === 1 ? "item encontrado" : "itens encontrados"}
              </p>
              {category !== "todos" && (
                <button
                  onClick={() => setCategory("todos")}
                  className="text-sm text-primary font-medium hover:underline"
                >
                  Limpar filtro
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <div className="text-center py-20 rounded-3xl border border-border bg-card">
                <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-lg font-medium mb-1">Nenhum item encontrado</p>
                <p className="text-muted-foreground text-sm">
                  Tente buscar por outros termos ou categorias
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {items.map((item) => {
                  const cat = getCategory(item.category);
                  const Icon = ICONS[item.icon] ?? ShoppingBag;
                  const style = CATEGORY_STYLE[item.category];
                  const isExpanded = expandedId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="group flex flex-col rounded-3xl border border-border bg-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div
                        className={`relative h-28 bg-gradient-to-br ${style.gradient} bg-opacity-20 flex items-center justify-center`}
                      >
                        <Icon className="w-12 h-12 text-white/90 group-hover:scale-110 transition-transform duration-500" />
                        <span
                          className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${style.badge}`}
                        >
                          {cat?.name}
                        </span>
                      </div>

                      <div className="p-5 flex flex-col flex-1">
                        <h2 className="font-bold text-base mb-2">{item.name}</h2>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {item.summary}
                        </p>

                        {isExpanded && (
                          <div className="animate-fade-in mb-4">
                            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                              {item.description}
                            </p>
                            <ul className="space-y-1.5">
                              {item.highlights.map((highlight) => (
                                <li
                                  key={highlight}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="mt-auto pt-4 space-y-2">
                          <button
                            onClick={() => handleToggle(item)}
                            className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 bg-muted text-foreground text-sm font-bold rounded-xl hover:bg-muted/70 transition-colors"
                            aria-expanded={isExpanded}
                          >
                            {isExpanded ? "Ver menos" : "Ver detalhes"}
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          <a
                            href={waWithText(
                              `Olá! Gostaria de solicitar um orçamento para ${item.name}.`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 bg-green-500 text-white text-sm font-bold rounded-xl hover:bg-green-600 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Solicitar orçamento
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/servicos"
            className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
          >
            Ver serviços detalhados <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
