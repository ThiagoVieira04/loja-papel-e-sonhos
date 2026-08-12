"use client";

import { useMemo, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { CatalogItem } from "@/constants/catalog";

const WHATSAPP_URL = "https://wa.me/5521987172463";

export function QuoteForm({ item }: { item: CatalogItem }) {
  const personalized = item.category === "papelaria-e-personalizados";
  const [nome, setNome] = useState("");
  const [tema, setTema] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const message = useMemo(() => {
    const parts = [
      `Olá! Vi o produto ${item.name} no site da Papel e Sonhos e gostaria de solicitar um orçamento.`,
    ];
    if (personalized && nome.trim()) parts.push(`Nome: ${nome.trim()}`);
    if (personalized && tema.trim()) parts.push(`Tema: ${tema.trim()}`);
    if (personalized && quantidade.trim()) parts.push(`Quantidade: ${quantidade.trim()}`);
    if (observacoes.trim()) parts.push(`Observações: ${observacoes.trim()}`);
    return parts.join("\n");
  }, [item.name, personalized, nome, tema, quantidade, observacoes]);

  const whatsappLink = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary text-sm";
  const labelClass = "block text-sm font-bold mb-2";

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-7">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
          <Send className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-xl font-black">Solicitar orçamento</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Preencha as informações que desejar e envie direto pelo WhatsApp. Nenhum
        campo é obrigatório.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          window.open(whatsappLink, "_blank", "noopener,noreferrer");
        }}
        className="space-y-4"
      >
        {personalized && (
          <>
            <div>
              <label htmlFor={`nome-${item.id}`} className={labelClass}>
                Nome
              </label>
              <input
                id={`nome-${item.id}`}
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome ou de quem vai receber"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`tema-${item.id}`} className={labelClass}>
                Tema
              </label>
              <input
                id={`tema-${item.id}`}
                type="text"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                placeholder="Ex.: aniversário, casamento, unicórnio..."
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor={`quantidade-${item.id}`} className={labelClass}>
                Quantidade
              </label>
              <input
                id={`quantidade-${item.id}`}
                type="number"
                min="1"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                placeholder="Ex.: 30 unidades"
                className={inputClass}
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor={`obs-${item.id}`} className={labelClass}>
            Observações
          </label>
          <textarea
            id={`obs-${item.id}`}
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Conte mais detalhes, como cores, prazos, referências..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 hover:-translate-y-0.5 transition-all shadow-lg shadow-green-500/25"
        >
          <MessageCircle className="w-5 h-5" />
          Solicitar pelo WhatsApp
        </a>

        <p className="text-xs text-muted-foreground bg-muted/60 rounded-xl p-3 leading-relaxed">
          Sua mensagem será aberta no WhatsApp já preenchida com os dados
          informados acima.
        </p>
      </form>
    </div>
  );
}
