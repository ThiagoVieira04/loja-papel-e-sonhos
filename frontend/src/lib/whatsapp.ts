import { APP } from "@/constants/app";

export interface WhatsAppMessageParams {
  produto: string;
  categoria?: string;
  quantidade?: string | number;
  cliente?: string;
  tema?: string;
  observacoes?: string;
}

export const WHATSAPP_NUMBER = APP.whatsApp;

export const WHATSAPP_PHONE = APP.phone;

export const WHATSAPP_TELEPHONE = `+${APP.whatsApp.slice(0, 2)}-${APP.whatsApp.slice(
  2,
  4
)}-${APP.whatsApp.slice(4, 9)}-${APP.whatsApp.slice(9)}`;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da Papel e Sonhos e gostaria de mais informações.";

export function whatsappLink(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  const trimmed = text?.trim();
  return trimmed ? `${base}?text=${encodeURIComponent(trimmed)}` : base;
}

export const WHATSAPP_URL = whatsappLink();

export function sendWhatsAppMessage(
  params: WhatsAppMessageParams
): string {
  const { produto, categoria, quantidade, cliente, tema, observacoes } =
    params;

  const lines = [
    "Olá! Vim pelo site da Papel e Sonhos.",
    "",
    "Tenho interesse em:",
    `Produto: ${produto}`,
  ];

  if (categoria?.trim()) lines.push(`Categoria: ${categoria.trim()}`);
  if (quantidade) lines.push(`Quantidade: ${quantidade}`);

  lines.push("");
  if (cliente?.trim()) lines.push(`Nome: ${cliente.trim()}`);
  if (tema?.trim()) lines.push(`Tema: ${tema.trim()}`);
  if (observacoes?.trim()) lines.push(`Observações: ${observacoes.trim()}`);

  lines.push("");
  lines.push("Gostaria de solicitar um orçamento.");

  const message = lines.join("\n").replace(/\n{3,}/g, "\n\n");
  return whatsappLink(message);
}