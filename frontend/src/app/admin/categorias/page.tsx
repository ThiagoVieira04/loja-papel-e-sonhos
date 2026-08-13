"use client";

import { useEffect, useState } from "react";
import { api, uploadFile } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { Category } from "@/types";
import { Plus, Search, Edit2, Trash2, X, Upload, Tag } from "lucide-react";
import toast from "react-hot-toast";

type TypeFilter = "" | "product" | "service";
type ActiveFilter = "all" | "active" | "inactive";

export default function AdminCategoriesPage() {
  const token = useAuthStore((s) => s.token);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form, setForm] = useState({
    name: "",
    type: "product",
    description: "",
    order: "0",
    icon: "",
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const loadCategories = () => {
    if (!token) return;
    setLoading(true);
    const params = new URLSearchParams();
    params.set("isActive", "all");
    if (typeFilter) params.set("type", typeFilter);
    api
      .get(`/categories?${params}`, token)
      .then((res) => {
        let data: Category[] = res.data || res;
        if (search) {
          const q = search.toLowerCase();
          data = data.filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              (c.slug || "").toLowerCase().includes(q)
          );
        }
        if (activeFilter === "active") data = data.filter((c) => c.isActive);
        if (activeFilter === "inactive") data = data.filter((c) => !c.isActive);
        setCategories(data);
      })
      .catch(() => toast.error("Erro ao carregar categorias"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCategories();
  }, [typeFilter, activeFilter, token]);

  useEffect(() => {
    loadCategories();
  }, [search]);

  const openNew = () => {
    setEditingCategory(null);
    setForm({
      name: "",
      type: "product",
      description: "",
      order: "0",
      icon: "",
      isActive: true,
    });
    setImageFile(null);
    setImagePreview("");
    setShowModal(true);
  };

  const openEdit = (category: Category) => {
    setEditingCategory(category);
    setForm({
      name: category.name,
      type: category.type || "product",
      description: category.description || "",
      order: (category.order ?? 0).toString(),
      icon: category.icon || "",
      isActive: category.isActive,
    });
    setImageFile(null);
    setImagePreview(category.image || "");
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!token) return;
    if (!form.name.trim()) {
      toast.error("Informe o nome da categoria");
      return;
    }
    try {
      let image = imagePreview;
      if (imageFile) {
        const uploaded = await uploadFile(imageFile, token);
        image = uploaded.url;
      }
      const data = {
        name: form.name,
        type: form.type,
        description: form.description,
        order: parseInt(form.order) || 0,
        icon: form.icon,
        isActive: form.isActive,
        image,
      };
      if (editingCategory) {
        await api.put(`/categories/${editingCategory.id}`, data, token);
        toast.success("Categoria atualizada!");
      } else {
        await api.post("/categories", data, token);
        toast.success("Categoria criada!");
      }
      setShowModal(false);
      loadCategories();
    } catch (e: any) {
      toast.error(e?.message || "Erro ao salvar categoria");
    }
  };

  const handleDelete = async (category: Category) => {
    if (!confirm(`Excluir a categoria "${category.name}"?`) || !token) return;
    try {
      await api.delete(`/categories/${category.id}`, token);
      toast.success("Categoria excluída!");
      loadCategories();
    } catch (e: any) {
      toast.error(e?.message || "Erro ao excluir. Categoria pode ter itens vinculados.");
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Categorias</h2>
          <p className="text-muted-foreground text-sm">
            Gerencie as categorias de produtos e serviços
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nova Categoria
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar categorias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
          className="px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
        >
          <option value="">Todos os tipos</option>
          <option value="product">Produtos</option>
          <option value="service">Serviços</option>
        </select>
        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value as ActiveFilter)}
          className="px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
        >
          <option value="all">Ativas e inativas</option>
          <option value="active">Somente ativas</option>
          <option value="inactive">Somente inativas</option>
        </select>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-sm font-medium">Categoria</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Tipo</th>
                <th className="text-center px-4 py-3 text-sm font-medium">Itens</th>
                <th className="text-right px-4 py-3 text-sm font-medium">Ordem</th>
                <th className="text-center px-4 py-3 text-sm font-medium">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-muted-foreground">
                    Carregando...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-muted-foreground">
                    Nenhuma categoria encontrada
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                          {category.image ? (
                            <img
                              src={category.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Tag className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{category.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {category.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm capitalize">
                      {category.type === "service" ? "Serviço" : "Produto"}
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      {(category._count?.products || 0) + (category._count?.services || 0)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right">{category.order}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          category.isActive
                            ? "bg-green-50 dark:bg-green-900/20 text-green-600"
                            : "bg-red-50 dark:bg-red-900/20 text-red-600"
                        }`}
                      >
                        {category.isActive ? "Ativa" : "Inativa"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(category)}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category)}
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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingCategory ? "Editar Categoria" : "Nova Categoria"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Nome *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Tipo</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className={inputClass}
                >
                  <option value="product">Produto</option>
                  <option value="service">Serviço</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Ordem</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Descrição</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={`${inputClass} min-h-[80px] resize-y`}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Ícone (classe FontAwesome, ex: fas fa-heart)
              </label>
              <input
                type="text"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className={inputClass}
                placeholder="fas fa-star"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Imagem</label>
              {imagePreview && (
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={imagePreview}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                      setImageFile(null);
                    }}
                    className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                <span className="text-sm text-muted-foreground">
                  Escolher imagem
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm({ ...form, isActive: e.target.checked })
                }
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm">Categoria ativa</span>
            </label>
            <div className="flex gap-4 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border font-medium hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                {editingCategory ? "Salvar" : "Criar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
