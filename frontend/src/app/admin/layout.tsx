"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import {
  LayoutDashboard,
  Package,
  Wrench,
  Users,
  ShoppingCart,
  DollarSign,
  Ticket,
  BarChart3,
  MessageSquare,
  Settings,
  ChevronLeft,
  Menu,
  X,
  LogOut,
  Bell,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Produtos", href: "/admin/produtos", icon: Package },
  { label: "Serviços", href: "/admin/servicos", icon: Wrench },
  { label: "Pedidos", href: "/admin/pedidos", icon: ShoppingCart },
  { label: "Clientes", href: "/admin/clientes", icon: Users },
  { label: "Financeiro", href: "/admin/financeiro", icon: DollarSign },
  { label: "Cupons", href: "/admin/cupons", icon: Ticket },
  { label: "Relatórios", href: "/admin/relatorios", icon: BarChart3 },
  { label: "Chat", href: "/admin/chat", icon: MessageSquare },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, loadProfile } = useAuthStore();

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setSidebarOpen(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setSidebarOpen(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (user && user.role !== "ADMIN" && user.role !== "STAFF") {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user.role !== "ADMIN" && user.role !== "STAFF") {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-40 h-full bg-card border-r border-border transition-all duration-300 ${
          sidebarOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full lg:translate-x-0 lg:w-16"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          {sidebarOpen && (
            <Link href="/admin" className="font-bold text-lg">
              Papel <span className="text-primary">&</span> Sonhos
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? "Recolher menu" : "Expandir menu"}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft
              className={`w-5 h-5 transition-transform ${
                !sidebarOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-4rem)]">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-foreground/70 hover:bg-muted"
                }`}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{link.label}</span>}
              </Link>
            );
          })}
          <hr className="my-2 border-border" />
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/70 hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Ver Loja</span>}
          </Link>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Sair</span>}
          </button>
        </nav>
      </aside>

      <div
        className={`transition-all duration-300 ml-0 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-16"
        }`}
      >
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-muted transition-colors lg:hidden"
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
              <h2 className="font-bold text-lg">
                {sidebarLinks.find((l) => l.href === pathname)?.label ||
                  "Admin"}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-muted transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user.role.toLowerCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="p-4 lg:p-6">{children}</div>
      </div>
    </div>
  );
}
