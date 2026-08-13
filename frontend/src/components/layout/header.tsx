"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { useCartDrawerStore } from "@/store/cart-drawer-store";
import { useTheme } from "next-themes";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  Package,
  Settings,
  MessageCircle,
} from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
                Início
              </Link>
              <Link
                href="/catalogo"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled || !isHome
                    ? "text-foreground hover:bg-muted"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Catálogo
              </Link>
              <Link
                href="/sobre"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled || !isHome
                    ? "text-foreground hover:bg-muted"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Sobre
              </Link>
              <Link
                href="/contato"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  scrolled || !isHome
                    ? "text-foreground hover:bg-muted"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                Contato
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden lg:inline-flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white text-sm font-bold rounded-xl hover:bg-green-600 hover:-translate-y-0.5 transition-all shadow-lg shadow-green-500/25 ${
                  scrolled || !isHome ? "" : "ring-1 ring-white/10"
                }`}
                aria-label="Falar pelo WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Buscar"
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
                aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
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
                    aria-label="Menu da conta"
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
                  aria-label="Entrar"
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
                onClick={() => useCartDrawerStore.getState().setOpen(true)}
                aria-label="Abrir carrinho"
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
                aria-label={mobileMenu ? "Fechar menu" : "Abrir menu"}
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
                Início
              </Link>
              <Link
                href="/catalogo"
                onClick={() => setMobileMenu(false)}
                className="block px-4 py-3 rounded-xl text-foreground hover:bg-muted font-medium"
              >
                Catálogo
              </Link>
              <Link
                href="/sobre"
                onClick={() => setMobileMenu(false)}
                className="block px-4 py-3 rounded-xl text-foreground hover:bg-muted font-medium"
              >
                Sobre
              </Link>
              <Link
                href="/contato"
                onClick={() => setMobileMenu(false)}
                className="block px-4 py-3 rounded-xl text-foreground hover:bg-muted font-medium"
              >
                Contato
              </Link>
              <hr className="my-2 border-border" />
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-500 text-white font-bold text-center"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
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
