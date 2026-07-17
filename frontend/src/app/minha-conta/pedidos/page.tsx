"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { api } from "@/lib/api";
import { formatDate, formatPrice } from "@/lib/utils";
import { Order } from "@/types";
import { Package, User, Heart, LogOut, Search, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MyOrdersPage() {
  const { user, token, logout, loadProfile } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    if (user && token) {
      api
        .get("/orders/my-orders", token)
        .then(setOrders)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user, token]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Faça login</h1>
          <p className="text-muted-foreground mb-4">
            Acesse sua conta para ver seus pedidos
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

  const statusLabels: Record<string, { label: string; color: string }> = {
    PENDING: { label: "Pendente", color: "bg-yellow-500" },
    PAYMENT_CONFIRMED: { label: "Pagamento Confirmado", color: "bg-blue-500" },
    IN_PRODUCTION: { label: "Em Produção", color: "bg-purple-500" },
    AWAITING_APPROVAL: { label: "Aguardando Aprovação", color: "bg-orange-500" },
    CORRECTION: { label: "Em Correção", color: "bg-amber-500" },
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
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold">Meus Pedidos</h1>
            </div>

            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-32 rounded-2xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                <h2 className="text-xl font-bold mb-2">Nenhum pedido ainda</h2>
                <p className="text-muted-foreground mb-6">
                  Comece a comprar e seus pedidos aparecerão aqui.
                </p>
                <Link
                  href="/produtos"
                  className="inline-flex px-6 py-3 bg-primary text-white rounded-xl font-medium"
                >
                  Ver Produtos
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/minha-conta/pedidos/${order.id}`}
                    className="block bg-card rounded-2xl border border-border p-5 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono font-medium text-sm">
                        Pedido #{order.id.slice(0, 8)}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                          statusLabels[order.status]?.color || "bg-gray-500"
                        }`}
                      >
                        {statusLabels[order.status]?.label || order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>{formatDate(order.createdAt)}</span>
                      <span>
                        {order.items?.length || 0} item(ns)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-black">
                        {formatPrice(Number(order.total))}
                      </span>
                      {order.trackingCode && (
                        <span className="text-xs text-muted-foreground">
                          Rastreio: {order.trackingCode}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
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
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-muted"
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
