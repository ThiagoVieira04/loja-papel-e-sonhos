"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { formatPrice } from "@/lib/utils";
import { api } from "@/lib/api";
import {
  ShoppingCart,
  CreditCard,
  Banknote,
  QrCode,
  Barcode,
  ChevronLeft,
  Truck,
  MapPin,
  User,
  Lock,
} from "lucide-react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const { user, token } = useAuthStore();
  const router = useRouter();
  const [step, setStep] = useState<"cart" | "address" | "payment" | "confirm">("cart");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [address, setAddress] = useState({
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    district: "",
    city: "",
    state: "",
  });
  const [loading, setLoading] = useState(false);

  if (items.length === 0 && step === "cart") {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <ShoppingCart className="w-20 h-20 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Carrinho vazio</h1>
          <p className="text-muted-foreground mb-6">
            Adicione produtos ou serviços para continuar
          </p>
          <Link
            href="/produtos"
            className="inline-flex px-6 py-3 bg-primary text-white rounded-xl font-medium"
          >
            Ver Produtos
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Faça login para finalizar o pedido");
      router.push("/login");
      return;
    }
    if (!paymentMethod) {
      toast.error("Selecione uma forma de pagamento");
      return;
    }
    if (!address.street) {
      toast.error("Preencha o endereço");
      return;
    }

    setLoading(true);
    try {
      const order = await api.post(
        "/orders",
        {
          items: items.map((item) => ({
            productId: item.productId,
            serviceId: item.serviceId,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
            description: item.description || item.name,
            files: item.file ? [item.file] : [],
          })),
          subtotal: getTotal(),
          total: getTotal(),
          paymentMethod,
          shippingAddress: `${address.street}, ${address.number} - ${address.district}, ${address.city}/${address.state}`,
        },
        token || undefined
      );
      clearCart();
      toast.success("Pedido realizado com sucesso!");
      router.push(`/minha-conta/pedidos/${order.id}`);
    } catch (err: any) {
      toast.error(err.message || "Erro ao finalizar pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-black mb-8">Finalizar Pedido</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Resumo do Carrinho */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="text-lg font-bold mb-4">Itens do Pedido</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : item.file ? (
                        <img
                          src={item.file}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <ShoppingCart className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Qtd: {item.quantity} x {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="font-bold text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Endereço */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">Endereço de Entrega</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="CEP"
                  value={address.zipCode}
                  onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                  className="col-span-2 md:col-span-1 px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <input
                  type="text"
                  placeholder="Rua"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="col-span-2 px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <input
                  type="text"
                  placeholder="Número"
                  value={address.number}
                  onChange={(e) => setAddress({ ...address, number: e.target.value })}
                  className="px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <input
                  type="text"
                  placeholder="Complemento"
                  value={address.complement}
                  onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                  className="px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <input
                  type="text"
                  placeholder="Bairro"
                  value={address.district}
                  onChange={(e) => setAddress({ ...address, district: e.target.value })}
                  className="px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <input
                  type="text"
                  placeholder="Cidade"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <input
                  type="text"
                  placeholder="Estado"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            </div>

            {/* Forma de Pagamento */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold">Forma de Pagamento</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "PIX", label: "PIX", icon: QrCode, desc: "Pagamento instantâneo" },
                  { id: "CREDIT_CARD", label: "Cartão de Crédito", icon: CreditCard, desc: "Até 12x" },
                  { id: "BOLETO", label: "Boleto", icon: Barcode, desc: "Vence em 3 dias" },
                  { id: "MONEY", label: "Dinheiro", icon: Banknote, desc: "Presencial" },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      paymentMethod === method.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <method.icon className="w-6 h-6 text-primary mb-2" />
                    <p className="font-bold text-sm">{method.label}</p>
                    <p className="text-xs text-muted-foreground">{method.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Resumo</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(getTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="font-medium text-green-600">Grátis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Desconto</span>
                  <span className="font-medium">R$ 0,00</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-black text-primary">
                    {formatPrice(getTotal())}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full mt-6 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Processando..." : "Finalizar Pedido"}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                <Lock className="w-3 h-3" />
                Pagamento 100% seguro
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
