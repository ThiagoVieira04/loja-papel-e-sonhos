"use client";

import { useMemo, useState } from "react";
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  GalleryItem,
} from "@/constants/gallery";
import { GalleryCard } from "@/components/gallery/gallery-card";
import { Lightbox } from "@/components/gallery/lightbox";

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>("Todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = useMemo(
    () =>
      filter === "Todos"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((i) => i.category === filter),
    [filter]
  );

  const handleOpen = (item: GalleryItem) => {
    const index = items.findIndex((i) => i.id === item.id);
    setLightboxIndex(index);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
            Galeria
          </span>
          <h1 className="text-3xl md:text-4xl font-black mb-3">
            Nossos trabalhos
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Um pouco do que já criamos com carinho. Toque em um trabalho para
            ver de perto.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter("Todos")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === "Todos"
                ? "bg-primary text-white"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            Todos
          </button>
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <GalleryCard key={item.id} item={item} onOpen={handleOpen} />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && items.length > 0 && (
        <Lightbox
          items={items}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
