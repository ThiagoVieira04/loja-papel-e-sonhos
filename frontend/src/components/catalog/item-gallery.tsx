"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { CatalogItem } from "@/constants/catalog";
import { getCatalogIcon, getCategoryStyle } from "@/lib/catalog-ui";

const VIEWS = [
  { label: "Foto do produto", iconClass: "w-28 h-28", tileClass: "" },
  { label: "Detalhe do acabamento", iconClass: "w-16 h-16", tileClass: "rotate-6 scale-95" },
  { label: "Exemplo de aplicação", iconClass: "w-20 h-20", tileClass: "-rotate-6" },
];

export function ItemGallery({ item }: { item: CatalogItem }) {
  const [active, setActive] = useState(0);
  const Icon = getCatalogIcon(item.icon);
  const style = getCategoryStyle(item.category);
  const view = VIEWS[active];

  return (
    <div>
      <div
        className={`relative aspect-square rounded-3xl border border-border overflow-hidden bg-gradient-to-br ${style.gradient} bg-opacity-20 flex flex-col items-center justify-center gap-4`}
        aria-label={`Imagem principal de ${item.name}`}
      >
        <Icon className={`${view.iconClass} text-white/90 transition-all duration-500`} />
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-primary text-xs font-bold shadow-sm">
          <Camera className="w-3.5 h-3.5" />
          Foto em breve
        </span>
        <span className="text-xs text-white/70 font-medium">{view.label}</span>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-3">
        {VIEWS.map((v, index) => (
          <button
            key={v.label}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Ver ${v.label}`}
            className={`relative aspect-square rounded-2xl border-2 bg-gradient-to-br ${style.gradient} bg-opacity-20 flex items-center justify-center overflow-hidden transition-all ${
              active === index
                ? "border-primary shadow-lg"
                : "border-border hover:border-primary/40"
            }`}
          >
            <div className={v.tileClass}>
              <Icon className="w-10 h-10 text-white/90" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
