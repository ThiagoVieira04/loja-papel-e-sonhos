"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { Order } from "@/types";
import { formatPrice, formatDate } from "@/lib/utils";
import { ArrowLeft, Package, MapPin, CreditCard, MessageSquare } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [trackingCode, setTrackingCode] = useState("");

  useEffect(() => {
    if (!token || !id) return;
    api
      .get(`/orders/${id}`, token)
      .then((data) => {
        setOrder(data);
        setTrackingCode(data.trackingCode || "");
      })
      .catch(() => toast.error("Erro ao carregar pedido"))
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleStatusChange = async (newStatus: string) => {
    if (!token || !id) return;
    try {
      await api.put(
        `/orders/${id}/status`,
        { status: newStatus, trackingCode: trackingCode || undefined },
        token
      );
      setOrder((prev) => (prev ? { ...prev, status: newStatus as any } : prev));
      toast.success("Status atualizado!");
    } catch {
      toast.error("Erro ao atualizar status");
    }
  };

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

  const allStatuses: Order["status"][] = [
    "PENDING",
    "PAYMENT_CONFIRMED",
    "IN_PRODUCTION",
    "AWAITING_APPROVAL",
    "CORRECTION",
    "FINISHED",
    "READY_FOR_PICKUP",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">Pedido não encontrado</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold">
              Pedido #{order.id.slice(0, 8)}
            </h2>
            <p className="text-sm text-muted-foreground">
              {formatDate(order.createdAt)}
            </p>
          </div>
        </div>
        <Link
          href={`/admin/chat?orderId=${order.id}`}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-sm font-medium"
        >
          <MessageSquare className="w-4 h-4" /> Chat
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-bold mb-4">Itens do Pedido</h3>
            <div className="space-y-3">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50"
                >
                  <div className="w-14 h-14 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                    {item.product?.images?.[0] ? (
                      <img
                        src={item.product.images[0].url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Package className="w-5 h-5 text-muted-foreground/30" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {item.product?.name || item.service?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qtd: {item.quantity} x {formatPrice(Number(item.price))}
                    </p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="font-bold text-sm">
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
              <p className="text-muted-foreground text-sm">
                {order.shippingAddress}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-bold mb-4">Cliente</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-muted-foreground">Nome: </span>
                {order.user?.name}
              </p>
              <p>
                <span className="text-muted-foreground">Email: </span>
                {order.user?.email}
              </p>
              {order.user?.phone && (
                <p>
                  <span className="text-muted-foreground">Telefone: </span>
                  {order.user.phone}
                </p>
              )}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Pagamento
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(Number(order.subtotal))}</span>
              </div>
              {Number(order.discount) > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto</span>
                  <span>-{formatPrice(Number(order.discount))}</span>
                </div>
              )}
              {Number(order.shipping) > 0 && (
                <div className="flex justify-between">
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

          <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <h3 className="font-bold">Alterar Status</h3>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              {allStatuses.map((s) => (
                <option key={s} value={s}>
                  {statusLabels[s]?.label || s}
                </option>
              ))}
            </select>
            <div>
              <label className="text-sm font-medium mb-1 block">
                Código de Rastreio
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="Código de rastreio"
                />
                <button
                  onClick={() => handleStatusChange(order.status)}
                  className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="font-bold mb-3">Status Atual</h3>
            <span
              className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium text-white ${
                statusLabels[order.status]?.color || "bg-gray-500"
              }`}
            >
              {statusLabels[order.status]?.label || order.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
