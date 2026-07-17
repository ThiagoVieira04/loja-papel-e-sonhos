"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Product, Category } from "@/types";
import { Search, SlidersHorizontal, Grid, List, ShoppingBag } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    api.get("/categories?type=product").then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", "12");
    if (selectedCategory) params.set("category", selectedCategory);
    if (search) params.set("search", search);

    api
      .get(`/products?${params}`)
      .then((res) => {
        setProducts(res.data);
        setTotalPages(res.meta.totalPages);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, selectedCategory, search]);

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-2">Produtos</h1>
          <p className="text-muted-foreground">
            Explore nossa seleção de produtos personalizados
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-bold mb-2">Categorias</p>
                <button
                  onClick={() => {
                    setSelectedCategory("");
                    setPage(1);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    !selectedCategory
                      ? "bg-primary text-white"
                      : "hover:bg-muted"
                  }`}
                >
                  Todas
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setPage(1);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat.slug
                        ? "bg-primary text-white"
                        : "hover:bg-muted"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {products.length} produto{products.length !== 1 && "s"} encontrado
                {products.length !== 1 && "s"}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid" ? "bg-primary text-white" : "hover:bg-muted"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list" ? "bg-primary text-white" : "hover:bg-muted"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl bg-muted animate-pulse">
                    <div className="aspect-square" />
                    <div className="p-4 space-y-2">
                      <div className="h-3 bg-muted-foreground/20 rounded w-1/3" />
                      <div className="h-4 bg-muted-foreground/20 rounded w-2/3" />
                      <div className="h-5 bg-muted-foreground/20 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-lg font-medium mb-1">Nenhum produto encontrado</p>
                <p className="text-muted-foreground text-sm">
                  Tente buscar por outros termos ou categorias
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 gap-4"
                    : "space-y-4"
                }
              >
                {products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/produtos/${product.slug}`}
                    className={`group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    <div
                      className={`relative bg-muted overflow-hidden ${
                        viewMode === "list"
                          ? "w-48 h-48 flex-shrink-0"
                          : "aspect-square"
                      }`}
                    >
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <ShoppingBag className="w-12 h-12" />
                        </div>
                      )}
                      {product.isNew && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-secondary text-white text-xs font-bold rounded-full">
                          NOVO
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        {product.category?.name}
                      </p>
                      <h3 className="font-bold group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        {product.promotionalPrice ? (
                          <>
                            <span className="text-lg font-black text-primary">
                              {formatPrice(Number(product.promotionalPrice))}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(Number(product.price))}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-black">
                            {formatPrice(Number(product.price))}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addItem({
                            id: product.id,
                            type: "product",
                            name: product.name,
                            price: Number(product.promotionalPrice || product.price),
                            quantity: 1,
                            image: product.images?.[0]?.url,
                            productId: product.id,
                          });
                        }}
                        className="mt-3 w-full py-2.5 bg-primary/10 text-primary text-sm font-bold rounded-xl hover:bg-primary hover:text-white transition-colors"
                      >
                        Adicionar ao Carrinho
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-xl font-medium transition-colors ${
                      page === i + 1
                        ? "bg-primary text-white"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
