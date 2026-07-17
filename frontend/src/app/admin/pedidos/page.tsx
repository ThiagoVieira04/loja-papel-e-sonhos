"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatPrice, formatDate } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { Order, OrderStatus } from "@/types";
import {
  Search,
  Eye,
  Filter,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore((s) => s.token);

  const loadOrders = () => {
    if (!token) return;
    setLoading(true);
    const params = new URLSearchParams();
    params.set("page", page.toString());
    if (search) params.set("search", search);
    if (status) params.set("status", status);

    api
      .get(`/orders?${params}`, token)
      .then((res) => {
        setOrders(res.data);
        setTotalPages(res.meta.totalPages);
      })
      .catch(() => toast.error("Erro ao carregar pedidos"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, [page, status, token]);

  const handleStatusChange = async (id: string, newStatus: OrderStatus) => {
    try {
      await api.put(`/orders/${id}/status`, { status: newStatus }, token ?? undefined);
      toast.success("Status atualizado!");
      loadOrders();
    } catch {
      toast.error("Erro ao atualizar status");
    }
  };

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-500",
    PAYMENT_CONFIRMED: "bg-blue-500",
    IN_PRODUCTION: "bg-purple-500",
    AWAITING_APPROVAL: "bg-orange-500",
    FINISHED: "bg-teal-500",
    READY_FOR_PICKUP: "bg-indigo-500",
    SHIPPED: "bg-cyan-500",
    DELIVERED: "bg-green-500",
    CANCELLED: "bg-red-500",
  };

  const statusLabels: Record<string, string> = {
    PENDING: "Pendente",
    PAYMENT_CONFIRMED: "Confirmado",
    IN_PRODUCTION: "Em Produção",
    AWAITING_APPROVAL: "Aguardando Aprovação",
    FINISHED: "Finalizado",
    READY_FOR_PICKUP: "Pronto Retirada",
    SHIPPED: "Enviado",
    DELIVERED: "Entregue",
    CANCELLED: "Cancelado",
  };

  const statusFlow: OrderStatus[] = [
    "PENDING",
    "PAYMENT_CONFIRMED",
    "IN_PRODUCTION",
    "AWAITING_APPROVAL",
    "FINISHED",
    "READY_FOR_PICKUP",
    "SHIPPED",
    "DELIVERED",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Pedidos</h2>
        <p className="text-muted-foreground text-sm">
          Gerencie todos os pedidos
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por cliente..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
        >
          <option value="">Todos os status</option>
          {Object.entries(statusLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {statusFlow.map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatus(s);
                setPage(1);
              }}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium text-white ${statusColors[s]}`}
            >
              {statusLabels[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 text-sm font-medium">Pedido</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Cliente</th>
                <th className="text-left px-4 py-3 text-sm font-medium">Itens</th>
                <th className="text-right px-4 py-3 text-sm font-medium">Total</th>
                <th className="text-center px-4 py-3 text-sm font-medium">Status</th>
                <th className="text-center px-4 py-3 text-sm font-medium">Pagamento</th>
                <th className="text-right px-4 py-3 text-sm font-medium">Data</th>
                <th className="text-right px-4 py-3 text-sm font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-muted-foreground">
                    Carregando...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-muted-foreground">
                    Nenhum pedido encontrado
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-sm font-mono font-medium">
                        #{order.id.slice(0, 8)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-sm">{order.user?.name}</p>
                        <p className="text-xs text-muted-foreground">{order.user?.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {order.items?.length || 0} item(ns)
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-bold">
                      {formatPrice(Number(order.total))}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium text-white ${
                          statusColors[order.status] || "bg-gray-500"
                        }`}
                      >
                        {statusLabels[order.status] || order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          order.paymentStatus === "APPROVED"
                            ? "bg-green-50 text-green-600"
                            : order.paymentStatus === "PENDING"
                            ? "bg-yellow-50 text-yellow-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {order.paymentStatus === "APPROVED"
                          ? "Aprovado"
                          : order.paymentStatus === "PENDING"
                          ? "Pendente"
                          : "Recusado"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/pedidos/${order.id}`}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/chat?orderId=${order.id}`}
                          className="p-2 rounded-lg hover:bg-muted transition-colors"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Link>
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
