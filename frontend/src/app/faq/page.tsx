"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DEFAULT_WHATSAPP_MESSAGE,
  whatsappLink,
} from "@/lib/whatsapp";
import { FAQ_ITEMS } from "@/constants/faq";

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
          {FAQ_ITEMS.map((item, index) => (
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
