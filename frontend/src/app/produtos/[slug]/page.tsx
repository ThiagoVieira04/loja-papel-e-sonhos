"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Product } from "@/types";
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  Clock,
  ChevronLeft,
  Minus,
  Plus,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api
      .get(`/products/${slug}`)
      .then((product) => {
        setProduct(product);
        setSelectedImage(0);
        return api.get(`/products/${product.id}/related?categoryId=${product.categoryId}`);
      })
      .then((related) => setRelated(related))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="aspect-square rounded-2xl bg-muted animate-pulse" />
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-6 bg-muted rounded w-1/3" />
              <div className="h-20 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 pb-16 text-center">
        <h1 className="text-2xl font-bold">Produto não encontrado</h1>
        <Link href="/produtos" className="text-primary mt-4 inline-block">
          Voltar para produtos
        </Link>
      </div>
    );
  }

  const currentPrice = product.promotionalPrice
    ? Number(product.promotionalPrice)
    : Number(product.price);

  const discount = product.promotionalPrice
    ? Math.round((1 - Number(product.promotionalPrice) / Number(product.price)) * 100)
    : 0;

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <Link
          href="/produtos"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Voltar
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="aspect-square rounded-2xl bg-muted overflow-hidden mb-4">
              {product.images?.[selectedImage] ? (
                <img
                  src={product.images[selectedImage].url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <ShoppingCart className="w-20 h-20" />
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      selectedImage === idx
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm text-primary font-bold uppercase tracking-wider mb-2">
              {product.category?.name}
            </p>
            <h1 className="text-3xl font-black mb-4">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 5 ? "fill-amber-400 text-amber-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(12 avaliações)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-black text-primary">
                {formatPrice(currentPrice)}
              </span>
              {product.promotionalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(Number(product.price))}
                  </span>
                  <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {product.description && (
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="w-4 h-4 text-primary" />
                Prazo de produção: {product.productionDays} dias úteis
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                Produto personalizado
              </div>
              {product.stock > 0 && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Clock className="w-4 h-4" />
                  {product.stock} em estoque
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 bg-muted rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-lg hover:bg-background transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-lg hover:bg-background transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  addItem({
                    id: product.id,
                    type: "product",
                    name: product.name,
                    price: currentPrice,
                    quantity,
                    image: product.images?.[0]?.url,
                    productId: product.id,
                  });
                  toast.success("Produto adicionado ao carrinho!");
                }}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                <ShoppingCart className="w-5 h-5" /> Adicionar ao Carrinho
              </button>
              <button className="p-4 rounded-xl border border-border hover:bg-muted transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-4 rounded-xl border border-border hover:bg-muted transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {product.sku && (
              <p className="text-xs text-muted-foreground mt-4">
                SKU: {product.sku}
              </p>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-black mb-6">Produtos Relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/produtos/${rel.slug}`}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="aspect-square bg-muted overflow-hidden">
                    {rel.images?.[0] ? (
                      <img
                        src={rel.images[0].url}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <ShoppingCart className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">
                      {rel.name}
                    </h3>
                    <p className="text-sm font-bold mt-1">
                      {formatPrice(
                        Number(rel.promotionalPrice || rel.price)
                      )}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
