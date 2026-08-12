"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DEFAULT_WHATSAPP_MESSAGE,
  whatsappLink,
} from "@/lib/whatsapp";

const faqData = [
  {
    question: "Quanto tempo leva para ficar pronto?",
    answer:
      "Depende do serviço. Serviços rápidos como xérox e impressão ficam prontos na hora. Personalizados como lembrancinhas e agendas levam de 3 a 7 dias úteis. Produtos como camisas e canecas podem levar de 5 a 10 dias úteis.",
  },
  {
    question: "Vocês entregam na região?",
    answer:
      "Sim! Realizamos entregas na região do Rio de Janeiro. Consulte o valor do frete no momento do orçamento pelo WhatsApp.",
  },
  {
    question: "Aceitam cartão e PIX?",
    answer:
      "Aceitamos PIX, cartões de crédito e débito (à vista ou parcelado) e dinheiro.",
  },
  {
    question: "Preciso levar algo para fazer xérox ou escaneamento?",
    answer:
      "Pode trazer o documento físico até nossa loja ou enviar digitalizado pelo WhatsApp que nós imprimimos.",
  },
  {
    question: "Atendem empresas?",
    answer:
      "Sim! Temos pacotes corporativos para empresas que precisam de impressões periódicas, papelaria personalizada ou suporte de informática. Entre em contato para mais detalhes.",
  },
  {
    question: "Como faço para solicitar um orçamento?",
    answer:
      "É很简单! Basta entrar em contato pelo WhatsApp, Instagram ou vir até nossa loja. Conte sua ideia ou necessidade e retornamos com o orçamento personalizado em até 24 horas.",
  },
  {
    question: "Posso personalizar os produtos?",
    answer:
      "Sim! A maioria dos nossos produtos pode ser personalizada com fotos, textos e cores à sua escolha. Entre em contato para conversarmos sobre o seu projeto.",
  },
  {
    question: "Vocês fazem imposto de renda?",
    answer:
      "Sim! Auxiliamos na elaboração, envio e regularização da declaração anual de ajuste do imposto de renda da pessoa física e MEI. Agende um horário pelo WhatsApp.",
  },
  {
    question: "Como funciona o serviço de recuperação de conta GOV?",
    answer:
      "Ajudamos na recuperação de acessos, redefinição de senhas, validações faciais e aumento de nível (bronze, prata, ouro) no portal Gov.br.",
  },
  {
    question: "Posso parcelar minhas compras?",
    answer:
      "Sim! Aceitamos parcelamento em até 6x no cartão de crédito para compras acima de R$ 100,00.",
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black mb-2">
            Perguntas Frequentes
          </h1>
          <p className="text-muted-foreground">
            Tire suas dúvidas rápido sobre nossos produtos e serviços.
          </p>
        </div>

        <div className="space-y-3">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border overflow-hidden"
            >
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-bold pr-4">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ${
                  activeIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Não encontrou o que procurava?
          </p>
          <a
            href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25d366] text-white rounded-xl font-medium hover:bg-[#20ba5a] transition-colors"
          >
            <i className="fab fa-whatsapp" /> Fale Conosco no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
