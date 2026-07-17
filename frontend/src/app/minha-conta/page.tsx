"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { User, Mail, Phone, MapPin, Package, Heart, LogOut } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function MyAccountPage() {
  const { user, token, logout, loadProfile } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, phone: user.phone || "" });
      api.get("/orders/my-orders", token || undefined)
        .then(setOrders)
        .catch(() => {});
    }
  }, [user, token]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Faça login</h1>
          <p className="text-muted-foreground mb-4">
            Acesse sua conta para ver seus dados
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

  const handleUpdate = async () => {
    try {
      await api.put("/auth/profile", form, token || undefined);
      toast.success("Perfil atualizado!");
      setEditing(false);
      loadProfile();
    } catch {
      toast.error("Erro ao atualizar perfil");
    }
  };

  const orderStatusLabels: Record<string, { label: string; color: string }> = {
    PENDING: { label: "Pendente", color: "bg-yellow-500" },
    PAYMENT_CONFIRMED: { label: "Pagamento Confirmado", color: "bg-blue-500" },
    IN_PRODUCTION: { label: "Em Produção", color: "bg-purple-500" },
    AWAITING_APPROVAL: { label: "Aguardando Aprovação", color: "bg-orange-500" },
    FINISHED: { label: "Finalizado", color: "bg-teal-500" },
    READY_FOR_PICKUP: { label: "Pronto para Retirada", color: "bg-indigo-500" },
    SHIPPED: { label: "Enviado", color: "bg-cyan-500" },
    DELIVERED: { label: "Entregue", color: "bg-green-500" },
    CANCELLED: { label: "Cancelado", color: "bg-red-500" },
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Meus Dados</h2>
                <button
                  onClick={() => setEditing(!editing)}
                  className="text-sm text-primary font-medium"
                >
                  {editing ? "Cancelar" : "Editar"}
                </button>
              </div>

              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Nome</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Telefone</label>
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <button
                    onClick={handleUpdate}
                    className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium"
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <span>{user.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <span>{user.phone || "Não informado"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span>
                      {user.points || 0} pontos no programa de fidelidade
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-xl font-bold mb-6">Últimos Pedidos</h2>
              {orders.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                  <p>Nenhum pedido ainda</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order: any) => (
                    <Link
                      key={order.id}
                      href={`/minha-conta/pedidos/${order.id}`}
                      className="block p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          Pedido #{order.id.slice(0, 8)}
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium text-white ${
                            orderStatusLabels[order.status]?.color || "bg-gray-500"
                          }`}
                        >
                          {orderStatusLabels[order.status]?.label || order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{formatDate(order.createdAt)}</span>
                        <span>
                          {order.items?.length || 0} item(ns)
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-muted"
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
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium hover:bg-muted transition-colors"
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
