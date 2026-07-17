"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Category } from "@/types";
import { Grid3X3, Package, Wrench, ArrowRight } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/categories")
      .then(setCategories)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const productCategories = categories.filter((c) => c.type === "product");
  const serviceCategories = categories.filter((c) => c.type === "service");

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black mb-2">Categorias</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore nossos produtos e serviços organizados por categoria.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {productCategories.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Package className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Produtos</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categorias/${cat.slug}`}
                      className="group bg-card rounded-2xl border border-border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        {cat.icon ? (
                          <i className={`fas ${cat.icon} text-primary text-xl`} />
                        ) : (
                          <Grid3X3 className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {cat.name}
                      </h3>
                      {cat.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {cat.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {cat._count?.products || 0} produtos
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {serviceCategories.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Wrench className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold">Serviços</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {serviceCategories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categorias/${cat.slug}`}
                      className="group bg-card rounded-2xl border border-border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        {cat.icon ? (
                          <i className={`fas ${cat.icon} text-primary text-xl`} />
                        ) : (
                          <Wrench className="w-6 h-6 text-primary" />
                        )}
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {cat.name}
                      </h3>
                      {cat.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {cat.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {cat._count?.services || 0} serviços
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
