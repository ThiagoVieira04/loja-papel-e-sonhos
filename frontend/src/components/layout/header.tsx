"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { useTheme } from "next-themes";
import { api } from "@/lib/api";
import { Category } from "@/types";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  LogOut,
  Package,
  Settings,
} from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [userMenu, setUserMenu] = useState(false);

  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const cartCount = useCartStore((s) => s.getItemsCount());
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    api.get("/categories").then(setCategories).catch(() => {});
  }, []);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isHome
            ? "bg-white/95 dark:bg-dark-900/95 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Papel e Sonhos" className="h-10 w-auto" />
              <div className="hidden sm:block">
                <h1 className={`font-bold text-lg leading-tight ${scrolled || !isHome ? "text-foreground" : "text-white"}`}>
                  Papel <span className="text-primary">&</span> Sonhos
                </h1>
                <p className={`text-xs ${scrolled || !isHome ? "text-muted-foreground" : "text-white/60"}`}>
                  Papelaria Criativa & Informática
                </p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled || !isHome
                    ? "text-foreground hover:bg-muted"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Home
              </Link>
              <div className="relative group">
                <button
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    scrolled || !isHome
                      ? "text-foreground hover:bg-muted"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Produtos <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-dark-900 rounded-xl shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2 space-y-1">
                    {categories
                      .filter((c) => c.type === "product")
                      .map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/categorias/${cat.slug}`}
                          className="block px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
              <Link
                href="/servicos"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled || !isHome
                    ? "text-foreground hover:bg-muted"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Serviços
              </Link>
              <Link
                href="/categorias"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled || !isHome
                    ? "text-foreground hover:bg-muted"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Categorias
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2.5 rounded-xl transition-colors ${
                  scrolled || !isHome
                    ? "text-foreground hover:bg-muted"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`p-2.5 rounded-xl transition-colors hidden md:block ${
                  scrolled || !isHome
                    ? "text-foreground hover:bg-muted"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenu(!userMenu)}
                    className={`p-2.5 rounded-xl transition-colors ${
                      scrolled || !isHome
                        ? "text-foreground hover:bg-muted"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <User className="w-5 h-5" />
                  </button>
                  {userMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserMenu(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-dark-900 rounded-xl shadow-xl border border-border z-50">
                        <div className="p-3 border-b border-border">
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="p-2 space-y-1">
                          <Link
                            href="/minha-conta"
                            onClick={() => setUserMenu(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors"
                          >
                            <User className="w-4 h-4" /> Minha Conta
                          </Link>
                          <Link
                            href="/minha-conta/pedidos"
                            onClick={() => setUserMenu(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors"
                          >
                            <Package className="w-4 h-4" /> Meus Pedidos
                          </Link>
                          <Link
                            href="/minha-conta/favoritos"
                            onClick={() => setUserMenu(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors"
                          >
                            <Heart className="w-4 h-4" /> Favoritos
                          </Link>
                          {user.role === "ADMIN" && (
                            <Link
                              href="/admin"
                              onClick={() => setUserMenu(false)}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors"
                            >
                              <Settings className="w-4 h-4" /> Admin
                            </Link>
                          )}
                          <hr className="my-1 border-border" />
                          <button
                            onClick={() => {
                              logout();
                              setUserMenu(false);
                            }}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-colors"
                          >
                            <LogOut className="w-4 h-4" /> Sair
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`p-2.5 rounded-xl transition-colors ${
                    scrolled || !isHome
                      ? "text-foreground hover:bg-muted"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              <button
                onClick={() => useCartStore.getState().getItemsCount() > 0 && setMobileMenu(true)}
                className={`p-2.5 rounded-xl transition-colors relative ${
                  scrolled || !isHome
                    ? "text-foreground hover:bg-muted"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className={`p-2.5 rounded-xl transition-colors lg:hidden ${
                  scrolled || !isHome
                    ? "text-foreground hover:bg-muted"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-border bg-background">
            <div className="container py-3">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar produtos e serviços..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-foreground"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {mobileMenu && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenu(false)}
          />
          <div className="fixed right-0 top-0 h-full w-80 max-w-full bg-white dark:bg-dark-900 shadow-2xl p-6 pt-20 overflow-y-auto">
            <nav className="space-y-2">
              <Link
                href="/"
                onClick={() => setMobileMenu(false)}
                className="block px-4 py-3 rounded-xl text-foreground hover:bg-muted font-medium"
              >
                Home
              </Link>
              <Link
                href="/produtos"
                onClick={() => setMobileMenu(false)}
                className="block px-4 py-3 rounded-xl text-foreground hover:bg-muted font-medium"
              >
                Produtos
              </Link>
              <Link
                href="/servicos"
                onClick={() => setMobileMenu(false)}
                className="block px-4 py-3 rounded-xl text-foreground hover:bg-muted font-medium"
              >
                Serviços
              </Link>
              <Link
                href="/categorias"
                onClick={() => setMobileMenu(false)}
                className="block px-4 py-3 rounded-xl text-foreground hover:bg-muted font-medium"
              >
                Categorias
              </Link>
              <hr className="my-2 border-border" />
              {!user && (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenu(false)}
                    className="block px-4 py-3 rounded-xl bg-primary text-white font-medium text-center"
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/cadastro"
                    onClick={() => setMobileMenu(false)}
                    className="block px-4 py-3 rounded-xl bg-muted text-foreground font-medium text-center"
                  >
                    Cadastrar
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
