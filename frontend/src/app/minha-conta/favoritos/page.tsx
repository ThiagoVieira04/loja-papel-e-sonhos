"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { useCartStore } from "@/store/cart-store";
import {
  Heart,
  User,
  Package,
  LogOut,
  ShoppingCart,
  Eye,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

interface FavoriteItem {
  id: string;
  productId: string;
  product: Product;
}

export default function FavoritesPage() {
  const { user, token, logout, loadProfile } = useAuthStore();
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    if (user && token) {
      api
        .get("/favorites", token)
        .then(setFavorites)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user, token]);

  const removeFavorite = async (productId: string) => {
    try {
      await api.post(`/favorites/${productId}/toggle`, {}, token ?? undefined);
      setFavorites((prev) => prev.filter((f) => f.productId !== productId));
      toast.success("Removido dos favoritos");
    } catch {
      toast.error("Erro ao remover favorito");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Faça login</h1>
          <p className="text-muted-foreground mb-4">
            Acesse sua conta para ver seus favoritos
          </p>
          <Link
            href="/login"
            className="inline-flex px-6 py-3 bg-primary text-white rounded-xl font-medium"
          >
            Entrar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <Heart className="w-6 h-6 text-primary" /> Meus Favoritos
            </h1>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-64 rounded-2xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : favorites.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                <h2 className="text-xl font-bold mb-2">Nenhum favorito ainda</h2>
                <p className="text-muted-foreground mb-6">
                  Adicione produtos aos favoritos para encontrá-los facilmente.
                </p>
                <Link
                  href="/produtos"
                  className="inline-flex px-6 py-3 bg-primary text-white rounded-xl font-medium"
                >
                  Ver Produtos
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {favorites.map((fav) => {
                  const product = fav.product;
                  const primaryImage =
                    product.images?.find((img) => img.isPrimary) ||
                    product.images?.[0];

                  return (
                    <div
                      key={fav.id}
                      className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all"
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
                        <button
                          onClick={() => removeFavorite(product.id)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-1 line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-3">
                          {product.category?.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-black">
                            {formatPrice(
                              Number(product.promotionalPrice || product.price)
                            )}
                          </span>
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
          </div>

          <div className="space-y-4">
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-black text-2xl">
                  {user.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-lg font-bold text-center">{user.name}</h3>
              <p className="text-sm text-muted-foreground text-center capitalize">
                {user.role.toLowerCase()}
              </p>
            </div>

            <nav className="bg-card rounded-2xl border border-border p-4 space-y-1">
              <Link
                href="/minha-conta"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-muted transition-colors"
              >
                <User className="w-4 h-4" /> Perfil
              </Link>
              <Link
                href="/minha-conta/pedidos"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-muted transition-colors"
              >
                <Package className="w-4 h-4" /> Meus Pedidos
              </Link>
              <Link
                href="/minha-conta/favoritos"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-muted"
              >
                <Heart className="w-4 h-4" /> Favoritos
              </Link>
              <hr className="my-1" />
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sair
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
