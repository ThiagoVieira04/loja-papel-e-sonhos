"use client";

import { useState } from "react";
import {
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  Send,
  Star,
} from "lucide-react";
import { APP } from "@/constants/app";
import {
  WHATSAPP_URL,
  whatsappLink,
} from "@/lib/whatsapp";

const CONTACT_METHODS = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: APP.phone,
    note: "Resposta rápida em horário comercial",
    href: WHATSAPP_URL,
    action: "Chamar no WhatsApp",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Instagram,
    title: "Instagram",
    value: APP.instagram,
    note: "Acompanhe nossos trabalhos e novidades",
    href: APP.instagramUrl,
    action: "Seguir no Instagram",
    color: "from-fuchsia-500 to-purple-500",
  },
  {
    icon: MapPin,
    title: "Endereço",
    value: APP.address,
    note: APP.addressShort,
    href: APP.googleMapsUrl,
    action: "Como chegar",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Clock,
    title: "Horário",
    value: "Seg a Sex: 8h às 18h | Sáb: 8h às 12h",
    note: "Horários a confirmar",
    href: null,
    action: null,
    color: "from-indigo-500 to-violet-500",
  },
];

export default function ContatoPage() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

  const buildMessage = () => {
    const parts = ["Olá! Gostaria de entrar em contato com a Papel e Sonhos."];
    if (nome.trim()) parts.push(`Nome: ${nome.trim()}`);
    if (telefone.trim()) parts.push(`Telefone: ${telefone.trim()}`);
    if (assunto) parts.push(`Assunto: ${assunto}`);
    if (mensagem.trim()) parts.push(`Mensagem: ${mensagem.trim()}`);
    return parts.join("\n");
  };

  const linkMensagem = whatsappLink(buildMessage());

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm";
  const labelClass = "block text-sm font-bold mb-2";

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-4">
            Fale conosco
          </span>
          <h1 className="text-3xl md:text-5xl font-black mb-3">Contato</h1>
          <p className="text-muted-foreground">
            Estamos prontos para atender você. Escolha o canal preferido ou
            envie sua mensagem pelo formulário.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div>
            <h2 className="text-xl font-black mb-6">Canais de atendimento</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {CONTACT_METHODS.map((method) => (
                <div
                  key={method.title}
                  className="p-6 rounded-3xl border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4`}
                  >
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-base mb-1">{method.title}</h3>
                  <p className="text-sm text-foreground font-medium">
                    {method.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 mb-4">
                    {method.note}
                  </p>
                  {method.href && method.action && (
                    <a
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary/10 text-primary text-sm font-bold rounded-xl hover:bg-primary hover:text-white transition-colors"
                    >
                      <method.icon className="w-4 h-4" />
                      {method.action}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <h2 className="text-xl font-black mb-1">
                Envie uma mensagem
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Preencha e sua mensagem será enviada direto pelo WhatsApp.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.open(linkMensagem, "_blank", "noopener,noreferrer");
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="nome" className={labelClass}>
                    Nome
                  </label>
                  <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="telefone" className={labelClass}>
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(00) 00000-0000"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="assunto" className={labelClass}>
                    Assunto
                  </label>
                  <select
                    id="assunto"
                    value={assunto}
                    onChange={(e) => setAssunto(e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="Orçamento">Orçamento</option>
                    <option value="Pedido personalizado">
                      Pedido personalizado
                    </option>
                    <option value="Serviços de informática">
                      Serviços de informática
                    </option>
                    <option value="Impressão e gráfica">
                      Impressão e gráfica
                    </option>
                    <option value="Serviços digitais">
                      Serviços digitais
                    </option>
                    <option value="Outro">Outro assunto</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mensagem" className={labelClass}>
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Escreva sua mensagem..."
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <a
                  href={linkMensagem}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 hover:-translate-y-0.5 transition-all shadow-lg shadow-green-500/25"
                >
                  <Send className="w-5 h-5" />
                  Enviar pelo WhatsApp
                </a>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-14 max-w-5xl mx-auto">
          <div className="rounded-3xl border border-border bg-card overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="flex-1">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider mb-3">
                    Localização
                  </span>
                  <h2 className="text-2xl font-black mb-2">Onde estamos</h2>
                  <p className="text-muted-foreground text-sm mb-4">
                    {APP.address}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={APP.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
                    >
                      <MapPin className="w-4 h-4" />
                      Abrir no Google Maps
                    </a>
                    <a
                      href={APP.googleReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-primary/10 text-primary text-sm font-bold rounded-xl hover:bg-primary hover:text-white transition-colors"
                    >
                      Ver avaliações
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <iframe
              src={APP.mapsEmbedUrl}
              title="Mapa - Papel e Sonhos"
              className="w-full h-72 md:h-80 border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="mt-10 max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-dark-900 via-dark-100 to-dark-900 px-6 py-12 md:p-14 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(251,191,36,0.12),transparent_60%)]" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="flex justify-center gap-1 mb-4 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current" />
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
                Gostou do nosso atendimento?
              </h2>
              <p className="text-white/60 mb-8">
                Sua avaliação no Google ajuda outras pessoas a conhecerem nosso
                trabalho — e motiva nossa equipe a cada dia!
              </p>
              <a
                href={APP.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-dark-900 font-bold rounded-full hover:bg-amber-100 hover:-translate-y-0.5 transition-all shadow-lg shadow-black/20"
              >
                <Star className="w-5 h-5 fill-current" />
                Avaliar no Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
