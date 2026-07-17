"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api, uploadFile } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { Category, Product } from "@/types";
import { ArrowLeft, Upload, X, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    categoryId: "",
    price: "",
    promotionalPrice: "",
    stock: "",
    productionDays: "3",
    sku: "",
    status: "ACTIVE",
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
  });

  useEffect(() => {
    if (!token || !id) return;
    Promise.all([
      api.get(`/categories?type=product`),
      api.get(`/products/${id}`),
    ])
      .then(([cats, product]) => {
        setCategories(cats);
        setForm({
          name: product.name || "",
          description: product.description || "",
          categoryId: product.categoryId || "",
          price: product.price?.toString() || "",
          promotionalPrice: product.promotionalPrice?.toString() || "",
          stock: product.stock?.toString() || "0",
          productionDays: product.productionDays?.toString() || "3",
          sku: product.sku || "",
          status: product.status || "ACTIVE",
          isFeatured: product.isFeatured || false,
          isNew: product.isNew || false,
          isBestSeller: product.isBestSeller || false,
        });
        setExistingImages(product.images || []);
      })
      .catch(() => toast.error("Erro ao carregar produto"))
      .finally(() => setInitialLoading(false));
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !id) return;
    setLoading(true);

    try {
      await api.put(
        `/products/${id}`,
        {
          ...form,
          price: parseFloat(form.price) || 0,
          promotionalPrice: form.promotionalPrice
            ? parseFloat(form.promotionalPrice)
            : null,
          stock: parseInt(form.stock) || 0,
          productionDays: parseInt(form.productionDays) || 3,
          images: existingImages.map((img, i) => ({
            url: img.url,
            alt: img.alt,
            order: i,
            isPrimary: i === 0,
          })),
        },
        token
      );

      for (let i = 0; i < newImages.length; i++) {
        try {
          const uploaded = await uploadFile(newImages[i], token);
          await api.post(
            "/upload/single",
            { url: uploaded.url, productId: id },
            token
          );
        } catch {
          // Continue
        }
      }

      toast.success("Produto atualizado com sucesso!");
      router.push("/admin/produtos");
    } catch {
      toast.error("Erro ao atualizar produto");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm";

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold">Editar Produto</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h3 className="font-bold">Informações Básicas</h3>
          <div>
            <label className="text-sm font-medium mb-1 block">Nome *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Descrição</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={`${inputClass} min-h-[100px] resize-y`}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Categoria *</label>
              <select
                required
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className={inputClass}
              >
                <option value="">Selecione</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">SKU</label>
              <input
                type="text"
                value={form.sku}
                onChange={(e) => setForm({ ...form, sku: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h3 className="font-bold">Preço e Estoque</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Preço (R$) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Preço Promocional</label>
              <input
                type="number"
                step="0.01"
                value={form.promotionalPrice}
                onChange={(e) =>
                  setForm({ ...form, promotionalPrice: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Estoque</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Dias de Produção</label>
              <input
                type="number"
                value={form.productionDays}
                onChange={(e) =>
                  setForm({ ...form, productionDays: e.target.value })
                }
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h3 className="font-bold">Imagens</h3>
          {existingImages.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {existingImages.map((img, i) => (
                <div key={img.id || i} className="relative w-20 h-20">
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setExistingImages(
                        existingImages.filter((_, j) => j !== i)
                      )
                    }
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">
              Adicionar mais imagens
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  setNewImages([...newImages, ...Array.from(e.target.files)]);
                }
              }}
            />
          </label>
          {newImages.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {newImages.map((img, i) => (
                <div key={i} className="relative w-20 h-20">
                  <img
                    src={URL.createObjectURL(img)}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setNewImages(newImages.filter((_, j) => j !== i))}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
          <h3 className="font-bold">Status e Destaque</h3>
          <div>
            <label className="text-sm font-medium mb-1 block">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className={inputClass}
            >
              <option value="ACTIVE">Ativo</option>
              <option value="INACTIVE">Inativo</option>
              <option value="DRAFT">Rascunho</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-4">
            {[
              { key: "isFeatured", label: "Destaque" },
              { key: "isNew", label: "Novo" },
              { key: "isBestSeller", label: "Mais Vendido" },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={(form as any)[key]}
                  onChange={(e) =>
                    setForm({ ...form, [key]: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-border"
                />
                <span className="text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 rounded-xl border border-border font-medium hover:bg-muted transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
