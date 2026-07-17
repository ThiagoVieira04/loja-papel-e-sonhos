"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminFinancialPage() {
  const token = useAuthStore((s) => s.token);
  const [stats, setStats] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    Promise.all([
      api.get("/admin/dashboard", token),
      api.get("/admin/financial", token),
    ])
      .then(([dashboard, financial]) => {
        setStats(dashboard);
        setRecords(financial.records || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  const cards = [
    {
      label: "Receita Total",
      value: formatPrice(stats?.totalRevenue || 0),
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/20",
    },
    {
      label: "Lucro Total",
      value: formatPrice(stats?.totalProfit || 0),
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      label: "Receita do Mês",
      value: formatPrice(stats?.monthRevenue || 0),
      icon: ArrowUpRight,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Pedidos do Mês",
      value: stats?.monthOrders || 0,
      icon: TrendingDown,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Financeiro</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
            <p className="text-2xl font-black">{card.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="font-bold mb-4">Últimos Registros</h3>
        {records.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhum registro financeiro encontrado
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-2 text-sm font-medium">Data</th>
                  <th className="text-left px-4 py-2 text-sm font-medium">Categoria</th>
                  <th className="text-left px-4 py-2 text-sm font-medium">Descrição</th>
                  <th className="text-center px-4 py-2 text-sm font-medium">Tipo</th>
                  <th className="text-right px-4 py-2 text-sm font-medium">Valor</th>
                </tr>
              </thead>
              <tbody>
                {records.slice(0, 20).map((record: any) => (
                  <tr key={record.id} className="border-b border-border/50">
                    <td className="px-4 py-3 text-sm">{formatDate(record.date)}</td>
                    <td className="px-4 py-3 text-sm">{record.category}</td>
                    <td className="px-4 py-3 text-sm">{record.description}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          record.type === "income"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {record.type === "income" ? "Entrada" : "Saída"}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-3 text-sm text-right font-bold ${
                        record.type === "income" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {record.type === "income" ? "+" : "-"}
                      {formatPrice(Number(record.amount))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
