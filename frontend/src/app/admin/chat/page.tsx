"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { Message, Order } from "@/types";
import { formatDate } from "@/lib/utils";
import { Send, ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function AdminChatPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!token) return;
    api
      .get("/orders?limit=50", token)
      .then((res) => {
        const orderList = res.data || [];
        setOrders(orderList);
        if (orderId) {
          const found = orderList.find((o: Order) => o.id === orderId);
          if (found) {
            setSelectedOrder(found);
            loadMessages(found.id);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token, orderId]);

  const loadMessages = async (oId: string) => {
    if (!token) return;
    try {
      const msgs = await api.get(`/chat/messages?orderId=${oId}`, token);
      setMessages(msgs.data || []);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedOrder) {
      const interval = setInterval(() => loadMessages(selectedOrder.id), 5000);
      return () => clearInterval(interval);
    }
  }, [selectedOrder]);

  const handleSend = async () => {
    if (!token || !newMessage.trim() || !selectedOrder) return;
    try {
      await api.post(
        "/chat/send",
        { orderId: selectedOrder.id, content: newMessage.trim() },
        token
      );
      setNewMessage("");
      loadMessages(selectedOrder.id);
    } catch {
      // ignore
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Chat</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px]">
        <div className="bg-card rounded-2xl border border-border p-4 overflow-y-auto max-h-[600px]">
          <h3 className="font-bold text-sm mb-3 px-2">Pedidos com Mensagens</h3>
          {orders.length === 0 ? (
            <p className="text-sm text-muted-foreground px-2">Nenhum pedido</p>
          ) : (
            <div className="space-y-1">
              {orders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => {
                    setSelectedOrder(order);
                    loadMessages(order.id);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-colors ${
                    selectedOrder?.id === order.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  <p className="text-sm font-medium truncate">
                    #{order.id.slice(0, 8)} - {order.user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.items?.length || 0} item(ns)
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-3 bg-card rounded-2xl border border-border flex flex-col">
          {!selectedOrder ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Selecione um pedido para ver as mensagens</p>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 border-b border-border flex items-center gap-3">
                <Link
                  href={`/admin/pedidos/${selectedOrder.id}`}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                  <p className="font-bold text-sm">
                    Pedido #{selectedOrder.id.slice(0, 8)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedOrder.user?.name} - {selectedOrder.user?.email}
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[400px]">
                {messages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <p>Nenhuma mensagem ainda</p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.senderId === user?.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-2xl ${
                            isMe
                              ? "bg-primary text-white rounded-br-sm"
                              : "bg-muted rounded-bl-sm"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p
                            className={`text-[10px] mt-1 ${
                              isMe ? "text-white/60" : "text-muted-foreground"
                            }`}
                          >
                            {formatDate(msg.createdAt)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!newMessage.trim()}
                    className="p-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
