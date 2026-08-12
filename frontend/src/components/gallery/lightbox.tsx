"use client";

import { useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Tag,
} from "lucide-react";
import {
  GalleryItem,
  GALLERY_GRADIENTS,
} from "@/constants/gallery";

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  gradients?: Record<string, string>;
}

export function Lightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
  gradients,
}: LightboxProps) {
  const item = items[currentIndex];
  const gradient = item
    ? (gradients ?? GALLERY_GRADIENTS)[item.category] ?? "from-primary to-secondary"
    : "";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        onNavigate((currentIndex - 1 + items.length) % items.length);
      if (e.key === "ArrowRight")
        onNavigate((currentIndex + 1) % items.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-card rounded-3xl border border-border shadow-2xl max-w-3xl w-full overflow-hidden z-10 animate-in zoom-in-95">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-foreground shadow-md hover:bg-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div
          className={`relative aspect-square md:aspect-video w-full bg-gradient-to-br ${gradient} bg-opacity-20`}
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <span className="text-sm font-medium bg-white/70 px-4 py-1.5 rounded-full">
                Foto em breve
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
            {item.category}
          </span>
          <h3 className="text-xl font-black mb-2">{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {item.description}
          </p>
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted text-xs text-muted-foreground"
                >
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {items.length > 1 && (
          <>
            <button
              onClick={() =>
                onNavigate((currentIndex - 1 + items.length) % items.length)
              }
              aria-label="Anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 text-foreground shadow-md hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => onNavigate((currentIndex + 1) % items.length)}
              aria-label="Próximo"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/90 text-foreground shadow-md hover:bg-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-medium px-3 py-1 rounded-full">
          {currentIndex + 1} / {items.length}
        </div>
      </div>
    </div>
  );
}
