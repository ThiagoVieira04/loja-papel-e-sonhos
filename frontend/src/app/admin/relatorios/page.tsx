"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { formatPrice } from "@/lib/utils";
import { BarChart3, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminReportsPage() {
  const token = useAuthStore((s) => s.token);
  const [salesData, setSalesData] = useState<any>(null);
  const [cashFlow, setCashFlow] = useState<any>(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([
      api.get(`/admin/reports/sales?year=${year}`, token),
      api.get("/admin/reports/cash-flow?days=30", token),
    ])
      .then(([sales, cash]) => {
        setSalesData(sales);
        setCashFlow(cash);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token, year]);

  const monthNames = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ];

  const chartData = salesData?.months?.map((m: any, i: number) => ({
    name: monthNames[i] || `M${i + 1}`,
    products: Number(m.productRevenue || 0),
    services: Number(m.serviceRevenue || 0),
  })) || [];

  const categoryData = salesData?.byCategory?.map((c: any) => ({
    name: c.category,
    value: Number(c.total),
  })) || [];

  const COLORS = ["#d11e5a", "#e31b6d", "#ff6b9d", "#c41854", "#8b1a4a"];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <BarChart3 className="w-6 h-6" /> Relatórios
        </h2>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="px-3 py-2 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <option key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-bold mb-4">Receita Mensal - {year}</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(340,15%,90%)" />
                <XAxis dataKey="name" stroke="hsl(340,10%,45%)" fontSize={12} />
                <YAxis
                  stroke="hsl(340,10%,45%)"
                  fontSize={12}
                  tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid hsl(340,15%,90%)" }}
                  formatter={(v: number) => [formatPrice(v)]}
                />
                <Bar dataKey="products" name="Produtos" fill="#d11e5a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="services" name="Serviços" fill="#e31b6d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-bold mb-4">Vendas por Categoria</h3>
          {categoryData.length > 0 ? (
            <>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((_: any, idx: number) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v: number) => [formatPrice(v)]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                {categoryData.map((cat: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    />
                    {cat.name}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground text-center py-8">Sem dados</p>
          )}
        </div>
      </div>

      {cashFlow && (
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-bold mb-4">Fluxo de Caixa (Últimos 30 dias)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
              <p className="text-sm text-green-600 font-medium">Entradas</p>
              <p className="text-2xl font-black text-green-600">
                {formatPrice(Number(cashFlow.totalIncome || 0))}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20">
              <p className="text-sm text-red-600 font-medium">Saídas</p>
              <p className="text-2xl font-black text-red-600">
                {formatPrice(Number(cashFlow.totalExpenses || 0))}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-muted">
              <p className="text-sm text-muted-foreground font-medium">Saldo</p>
              <p className="text-2xl font-black">
                {formatPrice(Number(cashFlow.balance || 0))}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
