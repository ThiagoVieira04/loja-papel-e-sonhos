"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import { api } from "@/lib/api";
import { formatDate, formatPrice } from "@/lib/utils";
import { Order } from "@/types";
import {
  ArrowLeft,
  Package,
  User,
  Heart,
  LogOut,
  MapPin,
  CreditCard,
  Truck,
  MessageSquare,
} from "lucide-react";

export default function OrderDetailPage() {
  const { id } = useParams();
  const { user, token, logout, loadProfile } = useAuthStore();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    if (user && token && id) {
      api
        .get(`/orders/${id}`, token)
        .then(setOrder)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user, token, id]);

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

  const paymentLabels: Record<string, string> = {
    PIX: "PIX",
    CREDIT_CARD: "Cartão de Crédito",
    BOLETO: "Boleto",
    MONEY: "Dinheiro",
  };

  const statusFlow: Order["status"][] = [
    "PENDING",
    "PAYMENT_CONFIRMED",
    "IN_PRODUCTION",
    "AWAITING_APPROVAL",
    "FINISHED",
    "READY_FOR_PICKUP",
    "SHIPPED",
    "DELIVERED",
  ];

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="h-96 rounded-2xl bg-muted animate-pulse" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-24 pb-16">
        <div className="container text-center py-16">
          <h2 className="text-2xl font-bold mb-2">Pedido não encontrado</h2>
          <Link href="/minha-conta/pedidos" className="text-primary">
            Voltar para meus pedidos
          </Link>
        </div>
      </div>
    );
  }

  const currentStepIndex = statusFlow.indexOf(order.status as any);

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">
                  Pedido #{order.id.slice(0, 8)}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5" /> Status do Pedido
              </h3>
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  {statusFlow.map((step, index) => {
                    const isCompleted = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    return (
                      <div key={step} className="flex flex-col items-center flex-1">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                            isCompleted
                              ? "bg-primary text-white"
                              : "bg-muted text-muted-foreground"
                          } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                        >
                          {index + 1}
                        </div>
                        <span className="text-[10px] text-center mt-1 text-muted-foreground hidden md:block">
                          {statusLabels[step]?.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-muted -z-0">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${
                        currentStepIndex >= 0
                          ? (currentStepIndex / (statusFlow.length - 1)) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`px-3 py-1.5 rounded-full text-sm font-medium text-white ${
                    statusLabels[order.status]?.color || "bg-gray-500"
                  }`}
                >
                  {statusLabels[order.status]?.label || order.status}
                </span>
                {order.trackingCode && (
                  <span className="text-sm text-muted-foreground">
                    Rastreio: <span className="font-mono">{order.trackingCode}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" /> Itens do Pedido
              </h3>
              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50"
                  >
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                      {item.product?.images?.[0] ? (
                        <img
                          src={item.product.images[0].url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-6 h-6 text-muted-foreground/30" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.product?.name || item.service?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qtd: {item.quantity} x {formatPrice(Number(item.price))}
                      </p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <span className="font-bold">
                      {formatPrice(Number(item.total))}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {order.shippingAddress && (
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> Endereço de Entrega
                </h3>
                <p className="text-muted-foreground">{order.shippingAddress}</p>
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

            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Pagamento
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Método</span>
                  <span className="font-medium">
                    {order.paymentMethod
                      ? paymentLabels[order.paymentMethod]
                      : "Não informado"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <span
                    className={`font-medium ${
                      order.paymentStatus === "APPROVED"
                        ? "text-green-600"
                        : order.paymentStatus === "PENDING"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.paymentStatus === "APPROVED"
                      ? "Aprovado"
                      : order.paymentStatus === "PENDING"
                      ? "Pendente"
                      : "Recusado"}
                  </span>
                </div>
                <hr />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(Number(order.subtotal))}</span>
                </div>
                {Number(order.discount) > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Desconto</span>
                    <span>-{formatPrice(Number(order.discount))}</span>
                  </div>
                )}
                {Number(order.shipping) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    <span>{formatPrice(Number(order.shipping))}</span>
                  </div>
                )}
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(Number(order.total))}</span>
                </div>
              </div>
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
