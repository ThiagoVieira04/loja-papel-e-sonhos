"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { Category, Product, Service } from "@/types";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, ShoppingCart, Eye } from "lucide-react";
import toast from "react-hot-toast";

export default function CategoryDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api
      .get(`/categories/${slug}`)
      .then((cat) => {
        setCategory(cat);
        if (cat.type === "product") {
          api
            .get(`/products?category=${cat.id}&limit=50`)
            .then((res) => setProducts(res.data || []))
            .catch(() => {});
        } else {
          api
            .get(`/services?category=${cat.id}&limit=50`)
            .then((res) => setServices(res.data || []))
            .catch(() => {});
        }
      })
      .catch(() => toast.error("Categoria não encontrada"))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-2">
            {category?.name}
          </h1>
          {category?.description && (
            <p className="text-muted-foreground max-w-xl">
              {category.description}
            </p>
          )}
        </div>

        {products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const primaryImage = product.images?.find(
                (img) => img.isPrimary
              ) || product.images?.[0];

              return (
                <div
                  key={product.id}
                  className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                    {primaryImage ? (
                      <img
                        src={primaryImage.url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                        <Eye className="w-12 h-12" />
                      </div>
                    )}
                    {product.promotionalPrice && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-white text-xs font-bold rounded-full">
                        OFERTA
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {product.category?.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        {product.promotionalPrice ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-black text-primary">
                              {formatPrice(Number(product.promotionalPrice))}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(Number(product.price))}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-black">
                            {formatPrice(Number(product.price))}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/produtos/${product.slug}`}
                          className="p-2.5 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            addItem({
                              id: product.id,
                              type: "product",
                              name: product.name,
                              price: Number(
                                product.promotionalPrice || product.price
                              ),
                              quantity: 1,
                              image: primaryImage?.url,
                              productId: product.id,
                            });
                            toast.success(
                              `${product.name} adicionado ao carrinho`
                            );
                          }}
                          className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-card rounded-2xl border border-border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="font-bold mb-2">{service.name}</h3>
                {service.description && (
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {service.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  {service.estimatedTime && (
                    <span>Prazo: {service.estimatedTime}</span>
                  )}
                  {Number(service.price) > 0 && (
                    <span className="font-bold text-foreground">
                      {formatPrice(Number(service.price))}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    addItem({
                      id: service.id,
                      type: "service",
                      name: service.name,
                      price: Number(service.price),
                      quantity: 1,
                      serviceId: service.id,
                    });
                    toast.success(
                      `${service.name} adicionado ao carrinho`
                    );
                  }}
                  className="w-full py-2.5 bg-primary/10 text-primary text-sm font-bold rounded-xl hover:bg-primary hover:text-white transition-colors"
                >
                  Solicitar Orçamento
                </button>
              </div>
            ))}
          </div>
        )}

        {products.length === 0 && services.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p>Nenhum item encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
