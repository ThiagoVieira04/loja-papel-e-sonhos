"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { Coupon } from "@/types";
import { formatPrice, formatDate } from "@/lib/utils";
import { Plus, Search, Edit2, Trash2, X, Ticket } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminCouponsPage() {
  const token = useAuthStore((s) => s.token);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [form, setForm] = useState({
    code: "",
    description: "",
    type: "percentage",
    value: "",
    minValue: "",
    maxUses: "",
    isActive: true,
    expiresAt: "",
  });

  const loadCoupons = () => {
    if (!token) return;
    setLoading(true);
    api
      .get("/coupons", token)
      .then((res) => setCoupons(res.data || []))
      .catch(() => toast.error("Erro ao carregar cupons"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCoupons();
  }, [token]);

  const openNew = () => {
    setEditing(null);
    setForm({
      code: "",
      description: "",
      type: "percentage",
      value: "",
      minValue: "",
      maxUses: "",
      isActive: true,
      expiresAt: "",
    });
    setShowModal(true);
  };

  const openEdit = (coupon: Coupon) => {
    setEditing(coupon);
    setForm({
      code: coupon.code,
      description: coupon.description || "",
      type: coupon.type,
      value: coupon.value?.toString() || "",
      minValue: coupon.minValue?.toString() || "",
      maxUses: coupon.maxUses?.toString() || "",
      isActive: coupon.isActive,
      expiresAt: coupon.expiresAt
        ? new Date(coupon.expiresAt).toISOString().split("T")[0]
        : "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!token) return;
    try {
      const data = {
        ...form,
        value: parseFloat(form.value) || 0,
        minValue: form.minValue ? parseFloat(form.minValue) : null,
        maxUses: form.maxUses ? parseInt(form.maxUses) : null,
        expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null,
      };
      if (editing) {
        await api.put(`/coupons/${editing.id}`, data, token);
        toast.success("Cupom atualizado!");
      } else {
        await api.post("/coupons", data, token);
        toast.success("Cupom criado!");
      }
      setShowModal(false);
      loadCoupons();
    } catch {
      toast.error("Erro ao salvar cupom");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este cupom?") || !token) return;
    try {
      await api.delete(`/coupons/${id}`, token);
      toast.success("Cupom excluído!");
      loadCoupons();
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
          <h2 className="text-2xl font-bold">Cupons</h2>
          <p className="text-muted-foreground text-sm">
            Gerencie cupons de desconto
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Novo Cupom
        </button>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-sm font-medium">Código</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Descrição</th>
                <th className="text-center px-4 py-3 text-sm font-medium">Tipo</th>
                <th className="text-right px-4 py-3 text-sm font-medium">Valor</th>
                <th className="text-center px-4 py-3 text-sm font-medium">Usos</th>
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
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-muted-foreground">
                    Nenhum cupom encontrado
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr key={coupon.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-primary" />
                        <span className="font-mono font-bold text-sm">{coupon.code}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {coupon.description || "-"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs px-2 py-1 rounded-full bg-muted">
                        {coupon.type === "percentage" ? "Percentual" : "Fixo"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-bold">
                      {coupon.type === "percentage"
                        ? `${coupon.value}%`
                        : formatPrice(Number(coupon.value))}
                    </td>
                    <td className="px-4 py-3 text-center text-sm">
                      {coupon.usedCount}/{coupon.maxUses || "∞"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          coupon.isActive
                            ? "bg-green-50 dark:bg-green-900/20 text-green-600"
                            : "bg-red-50 dark:bg-red-900/20 text-red-600"
                        }`}
                      >
                        {coupon.isActive ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(coupon)}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(coupon.id)}
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
          <div className="bg-card rounded-2xl border border-border w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editing ? "Editar Cupom" : "Novo Cupom"}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Código *</label>
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  className={inputClass}
                  placeholder="EXEMPLO10"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Tipo</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className={inputClass}
                >
                  <option value="percentage">Percentual (%)</option>
                  <option value="fixed">Fixo (R$)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Descrição</label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Valor *</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Pedido Mínimo (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.minValue}
                  onChange={(e) => setForm({ ...form, minValue: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Limite de Usos</label>
                <input
                  type="number"
                  value={form.maxUses}
                  onChange={(e) => setForm({ ...form, maxUses: e.target.value })}
                  className={inputClass}
                  placeholder="Ilimitado"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Data de Expiração</label>
                <input
                  type="date"
                  value={form.expiresAt}
                  onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="w-4 h-4 rounded border-border"
              />
              <span className="text-sm">Ativo</span>
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
                {editing ? "Salvar" : "Criar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
