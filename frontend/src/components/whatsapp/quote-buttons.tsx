import { MessageCircle, Send } from "lucide-react";
import {
  DEFAULT_WHATSAPP_MESSAGE,
  WhatsAppMessageParams,
  sendWhatsAppMessage,
  whatsappLink,
} from "@/lib/whatsapp";

interface QuoteButtonsProps extends WhatsAppMessageParams {
  variante?: "grande" | "compacto";
  mostrarFalar?: boolean;
  className?: string;
}

export function QuoteButtons({
  produto,
  categoria = "",
  quantidade,
  cliente,
  tema,
  observacoes,
  variante = "grande",
  mostrarFalar = true,
  className,
}: QuoteButtonsProps) {
  const isGrande = variante === "grande";
  const orcamentoUrl = sendWhatsAppMessage({
    produto,
    categoria,
    quantidade,
    cliente,
    tema,
    observacoes,
  });
  const falarUrl = whatsappLink(DEFAULT_WHATSAPP_MESSAGE);

  const base = isGrande
    ? "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all"
    : "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors";

  const botaoOrcamento = `${base} bg-green-500 text-white hover:bg-green-600 ${
    isGrande ? "hover:-translate-y-0.5 shadow-lg shadow-green-500/25" : ""
  }`;
  const botaoFalar = `${base} bg-primary/10 text-primary hover:bg-primary hover:text-white`;

  return (
    <div className={`flex flex-col sm:flex-row gap-2 ${className ?? ""}`}>
      <a
        href={orcamentoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={botaoOrcamento}
      >
        <Send className={isGrande ? "w-5 h-5" : "w-4 h-4"} />
        Solicitar orçamento
      </a>
      {mostrarFalar && (
        <a
          href={falarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={botaoFalar}
        >
          <MessageCircle className={isGrande ? "w-5 h-5" : "w-4 h-4"} />
          Falar no WhatsApp
        </a>
      )}
    </div>
  );
}