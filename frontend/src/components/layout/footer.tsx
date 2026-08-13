"use client";

import Link from "next/link";
import { APP } from "@/constants/app";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const footerLinks = {
  navegacao: [
    { label: "Home", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" },
  ],
  servicos: [
    { label: "Papelaria Criativa", href: "/categorias/papelaria-personalizada" },
    { label: "Documentos", href: "/categorias/documentos" },
    { label: "Governamentais", href: "/categorias/governamentais" },
    { label: "Informática", href: "/categorias/informatica" },
  ],
  contato: [
    { label: APP.phone, href: WHATSAPP_URL },
    { label: APP.instagram, href: APP.instagramUrl },
    { label: APP.addressShort, href: APP.googleMapsUrl, external: true },
    { label: "Avaliar no Google", href: APP.googleReviewUrl, external: true },
  ],
};

export function Footer() {
  return (
    <footer className="bg-dark-900 text-white/60">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="Papel e Sonhos" className="h-10 w-auto" />
              <div>
                <h3 className="font-bold text-lg text-white">
                  Papel <span className="text-primary">&</span> Sonhos
                </h3>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Papelaria Criativa & Informática. Transformamos ideias em memórias que encantam. Há mais de 10 anos realizando projetos com qualidade e carinho.
            </p>
            <div className="flex gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all"
              >
                <i className="fab fa-whatsapp" />
              </a>
              <a
                href={APP.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all"
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Navegação</h4>
            <ul className="space-y-3">
              {footerLinks.navegacao.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Serviços</h4>
            <ul className="space-y-3">
              {footerLinks.servicos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Contato</h4>
            <ul className="space-y-4">
              {footerLinks.contato.map((item, idx) => (
                <li key={idx}>
                  {item.href.startsWith("http") ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-primary transition-colors flex items-center gap-2"
                    >
                      {idx === 0 && <i className="fab fa-whatsapp text-primary" />}
                      {idx === 1 && <i className="fab fa-instagram text-primary" />}
                      {idx === 2 && <i className="fas fa-map-marker-alt text-primary" />}
                      {idx === 3 && <i className="fab fa-google text-primary" />}
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-sm flex items-center gap-2">
                      <i className="fas fa-map-marker-alt text-primary" />
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
              <li className="text-sm flex items-center gap-2">
                <i className="fas fa-clock text-primary" />
                Seg a Sex: 8h às 18h | Sáb: 8h às 12h
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Papel e Sonhos. Todos os direitos reservados.
          </p>
          <p className="text-sm">
            Desenvolvido por Papel e Sonhos Informática
          </p>
        </div>
      </div>
    </footer>
  );
}
