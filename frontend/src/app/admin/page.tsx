"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import {
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const token = useAuthStore((s) => s.token);

  useEffect(() => {
    if (token) {
      api.get("/admin/dashboard", token ?? undefined).then(setStats).catch(() => {});
    }
  }, [token]);

  const cards = [
    {
      label: "Pedidos Hoje",
      value: stats?.todayOrders || 0,
      icon: ShoppingCart,
      change: "+12%",
      positive: true,
    },
    {
      label: "Pedidos do Mês",
      value: stats?.monthOrders || 0,
      icon: Clock,
      change: "+8%",
      positive: true,
    },
    {
      label: "Receita do Mês",
      value: formatPrice(stats?.monthRevenue || 0),
      icon: DollarSign,
      change: "+15%",
      positive: true,
    },
    {
      label: "Clientes Ativos",
      value: stats?.totalCustomers || 0,
      icon: Users,
      change: "+5%",
      positive: true,
    },
    {
      label: "Produtos",
      value: stats?.totalProducts || 0,
      icon: Package,
      change: "",
      positive: true,
    },
    {
      label: "Serviços",
      value: stats?.totalServices || 0,
      icon: Package,
      change: "",
      positive: true,
    },
    {
      label: "Receita Total",
      value: formatPrice(stats?.totalRevenue || 0),
      icon: TrendingUp,
      change: "+22%",
      positive: true,
    },
    {
      label: "Lucro Total",
      value: formatPrice(stats?.totalProfit || 0),
      icon: TrendingDown,
      change: "+18%",
      positive: true,
    },
  ];

  const orderStatusColors: Record<string, string> = {
    PENDING: "#f59e0b",
    PAYMENT_CONFIRMED: "#3b82f6",
    IN_PRODUCTION: "#8b5cf6",
    FINISHED: "#10b981",
    DELIVERED: "#059669",
    CANCELLED: "#ef4444",
  };

  const orderStatusLabels: Record<string, string> = {
    PENDING: "Pendente",
    PAYMENT_CONFIRMED: "Pagamento Confirmado",
    IN_PRODUCTION: "Em Produção",
    FINISHED: "Finalizado",
    DELIVERED: "Entregue",
    CANCELLED: "Cancelado",
  };

  const salesData = [
    { name: "Jan", value: 4500 },
    { name: "Fev", value: 5200 },
    { name: "Mar", value: 4800 },
    { name: "Abr", value: 6100 },
    { name: "Mai", value: 5900 },
    { name: "Jun", value: 7200 },
    { name: "Jul", value: 6800 },
    { name: "Ago", value: 8100 },
    { name: "Set", value: 7600 },
    { name: "Out", value: 8500 },
    { name: "Nov", value: 9200 },
    { name: "Dez", value: 10500 },
  ];

  const topProducts = [
    { name: "Topo de Bolo Personalizado", sales: 145 },
    { name: "Caderneta de Vacina", sales: 120 },
    { name: "Convite Digital", sales: 98 },
    { name: "Adesivo Personalizado", sales: 85 },
    { name: "Caneca Personalizada", sales: 72 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.slice(0, 4).map((card, idx) => (
          <div
            key={idx}
            className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              {card.change && (
                <span
                  className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                    card.positive
                      ? "bg-green-50 dark:bg-green-900/20 text-green-600"
                      : "bg-red-50 dark:bg-red-900/20 text-red-600"
                  }`}
                >
                  {card.positive ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {card.change}
                </span>
              )}
            </div>
            <p className="text-2xl font-black">{card.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-bold mb-4">Vendas do Ano</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(340,75%,47%)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(340,75%,47%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(340,15%,90%)" />
                <XAxis
                  dataKey="name"
                  stroke="hsl(340,10%,45%)"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(340,10%,45%)"
                  fontSize={12}
                  tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid hsl(340,15%,90%)",
                  }}
                  formatter={(v: number) => [formatPrice(v), "Vendas"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(340,75%,47%)"
                  fillOpacity={1}
                  fill="url(#colorSales)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-bold mb-4">Status dos Pedidos</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.ordersByStatus?.map((o: any) => ({
                    name: orderStatusLabels[o.status] || o.status,
                    value: o.count,
                  })) || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {(stats?.ordersByStatus || []).map((_: any, idx: number) => (
                    <Cell
                      key={idx}
                      fill={
                        Object.values(orderStatusColors)[
                          idx % Object.values(orderStatusColors).length
                        ]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {Object.entries(orderStatusLabels).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2 text-xs">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      orderStatusColors[key] || "#6b7280",
                  }}
                />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-bold mb-4">Produtos Mais Vendidos</h3>
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4"
              >
                <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-sm">{product.name}</p>
                  <div className="w-full h-2 rounded-full bg-muted mt-1">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                      style={{
                        width: `${(product.sales / topProducts[0].sales) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-sm font-bold">{product.sales}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-bold mb-4">Resumo Financeiro</h3>
          <div className="grid grid-cols-2 gap-4">
            {cards.slice(4).map((card, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-muted/50"
              >
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="text-xl font-black mt-1">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
