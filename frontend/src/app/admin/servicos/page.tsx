"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { Service, Category } from "@/types";
import { Plus, Search, Edit2, Trash2, Eye, X } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminServicesPage() {
  const token = useAuthStore((s) => s.token);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    categoryId: "",
    price: "",
    estimatedTime: "",
    requiredDocs: "",
    requiresUpload: false,
    status: "ACTIVE",
  });

  const loadServices = () => {
    if (!token) return;
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    api
      .get(`/services?${params}`, token)
      .then((res) => setServices(res.data || []))
      .catch(() => toast.error("Erro ao carregar serviços"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadServices();
    api.get("/categories?type=service").then(setCategories).catch(() => {});
  }, [token]);

  useEffect(() => {
    loadServices();
  }, [search]);

  const openNew = () => {
    setEditingService(null);
    setForm({
      name: "",
      description: "",
      categoryId: "",
      price: "",
      estimatedTime: "",
      requiredDocs: "",
      requiresUpload: false,
      status: "ACTIVE",
    });
    setShowModal(true);
  };

  const openEdit = (service: Service) => {
    setEditingService(service);
    setForm({
      name: service.name,
      description: service.description || "",
      categoryId: service.categoryId,
      price: service.price?.toString() || "",
      estimatedTime: service.estimatedTime || "",
      requiredDocs: service.requiredDocs || "",
      requiresUpload: service.requiresUpload || false,
      status: service.status,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!token) return;
    try {
      const data = {
        ...form,
        price: parseFloat(form.price) || 0,
      };
      if (editingService) {
        await api.put(`/services/${editingService.id}`, data, token);
        toast.success("Serviço atualizado!");
      } else {
        await api.post("/services", data, token);
        toast.success("Serviço criado!");
      }
      setShowModal(false);
      loadServices();
    } catch {
      toast.error("Erro ao salvar serviço");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este serviço?") || !token) return;
    try {
      await api.delete(`/services/${id}`, token);
      toast.success("Serviço excluído!");
      loadServices();
    } catch {
      toast.error("Erro ao excluir");
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Serviços</h2>
          <p className="text-muted-foreground text-sm">Gerencie seus serviços</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Novo Serviço
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar serviços..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
        />
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-sm font-medium">Serviço</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Categoria</th>
                <th className="text-right px-4 py-3 text-sm font-medium">Preço</th>
                <th className="text-center px-4 py-3 text-sm font-medium">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-muted-foreground">
                    Carregando...
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-muted-foreground">
                    Nenhum serviço encontrado
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr key={service.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-sm">{service.name}</p>
                      {service.estimatedTime && (
                        <p className="text-xs text-muted-foreground">{service.estimatedTime}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">{service.category?.name}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      {Number(service.price) > 0
                        ? formatPrice(Number(service.price))
                        : "Sob consulta"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          service.status === "ACTIVE"
                            ? "bg-green-50 dark:bg-green-900/20 text-green-600"
                            : "bg-red-50 dark:bg-red-900/20 text-red-600"
                        }`}
                      >
                        {service.status === "ACTIVE" ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(service)}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
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
                {editingService ? "Editar Serviço" : "Novo Serviço"}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-muted">
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
            <div>
              <label className="text-sm font-medium mb-1 block">Descrição</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={`${inputClass} min-h-[80px] resize-y`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Categoria</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Selecione</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Prazo Estimado</label>
                <input
                  type="text"
                  value={form.estimatedTime}
                  onChange={(e) => setForm({ ...form, estimatedTime: e.target.value })}
                  className={inputClass}
                  placeholder="Ex: 3-5 dias úteis"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className={inputClass}
                >
                  <option value="ACTIVE">Ativo</option>
                  <option value="INACTIVE">Inativo</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Documentos Necessários</label>
              <input
                type="text"
                value={form.requiredDocs}
                onChange={(e) => setForm({ ...form, requiredDocs: e.target.value })}
                className={inputClass}
                placeholder="Ex: RG, CPF, comprovante de residência"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.requiresUpload}
                onChange={(e) => setForm({ ...form, requiresUpload: e.target.checked })}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm">Requer upload de arquivo</span>
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
                {editingService ? "Salvar" : "Criar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
