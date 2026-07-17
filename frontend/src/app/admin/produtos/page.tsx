"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatPrice, formatDate } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { Product } from "@/types";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  MoreHorizontal,
  Eye,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((s) => s.token);

  const loadProducts = () => {
    if (!token) return;
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("limit", "15");
    if (search) params.set("search", search);
    params.set("status", "all");

    api
      .get(`/products?${params}`, token)
      .then((res) => {
        setProducts(res.data);
        setTotalPages(res.meta.totalPages);
      })
      .catch(() => toast.error("Erro ao carregar produtos"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, [page, token]);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await api.delete(`/products/${id}`, token ?? undefined);
      toast.success("Produto excluído com sucesso");
      loadProducts();
    } catch {
      toast.error("Erro ao excluir produto");
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      await api.post(`/products/${id}/duplicate`, {}, token ?? undefined);
      toast.success("Produto duplicado com sucesso");
      loadProducts();
    } catch {
      toast.error("Erro ao duplicar produto");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Produtos</h2>
          <p className="text-muted-foreground text-sm">
            Gerencie seus produtos
          </p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Novo Produto
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
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
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-sm font-medium">Produto</th>
                <th className="text-left px-4 py-3 text-sm font-medium">SKU</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Categoria</th>
                <th className="text-right px-4 py-3 text-sm font-medium">Preço</th>
                <th className="text-right px-4 py-3 text-sm font-medium">Estoque</th>
                <th className="text-center px-4 py-3 text-sm font-medium">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-muted-foreground">
                    Carregando...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-muted-foreground">
                    Nenhum produto encontrado
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                          {product.images?.[0] ? (
                            <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{product.sku || "-"}</td>
                    <td className="px-4 py-3 text-sm">{product.category?.name}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      {product.promotionalPrice ? (
                        <div>
                          <span className="text-primary font-medium">
                            {formatPrice(Number(product.promotionalPrice))}
                          </span>
                          <span className="text-xs text-muted-foreground line-through ml-1">
                            {formatPrice(Number(product.price))}
                          </span>
                        </div>
                      ) : (
                        formatPrice(Number(product.price))
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">{product.stock}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          product.status === "ACTIVE"
                            ? "bg-green-50 dark:bg-green-900/20 text-green-600"
                            : "bg-red-50 dark:bg-red-900/20 text-red-600"
                        }`}
                      >
                        {product.status === "ACTIVE" ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/produtos/${product.id}`}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDuplicate(product.id)}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
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
  );
}
