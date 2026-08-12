import { Camera } from "lucide-react";
import {
  GalleryItem,
  GALLERY_GRADIENTS,
} from "@/constants/gallery";

interface GalleryCardProps {
  item: GalleryItem;
  onOpen: (item: GalleryItem) => void;
}

export function GalleryCard({ item, onOpen }: GalleryCardProps) {
  const gradient = GALLERY_GRADIENTS[item.category];

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group w-full overflow-hidden rounded-2xl border border-border bg-card text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={`Ver detalhes de ${item.title}`}
    >
      <div
        className={`relative aspect-square w-full overflow-hidden bg-gradient-to-br ${gradient} bg-opacity-20`}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <div className="w-14 h-14 rounded-2xl bg-white/80 flex items-center justify-center">
              <Camera className="w-7 h-7 text-primary" />
            </div>
            <span className="text-xs font-medium bg-white/70 px-3 py-1 rounded-full">
              Foto em breve
            </span>
          </div>
        )}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-primary text-xs font-bold shadow-sm">
          {item.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-sm group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {item.description}
        </p>
      </div>
    </button>
  );
}
