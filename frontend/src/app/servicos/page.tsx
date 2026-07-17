"use client";

import { useEffect, useState } from "react";
import { api, uploadFile } from "@/lib/api";
import { useCartStore } from "@/store/cart-store";
import { useAuthStore } from "@/store/auth-store";
import { Service, Category } from "@/types";
import { formatPrice } from "@/lib/utils";
import {
  Search,
  Clock,
  FileText,
  Wrench,
  Upload,
  X,
  ImageUp,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

const categoryColors: Record<string, string> = {
  Papelaria: "from-red-500 to-pink-500",
  Documentos: "from-green-500 to-emerald-500",
  Governamentais: "from-blue-500 to-cyan-500",
  Informatica: "from-purple-500 to-indigo-500",
};

const categoryIcons: Record<string, string> = {
  Papelaria: "fa-wand-magic-sparkles",
  Documentos: "fa-file-lines",
  Governamentais: "fa-id-card",
  Informatica: "fa-laptop",
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [description, setDescription] = useState("");
  const addItem = useCartStore((s) => s.addItem);
  const { user, token } = useAuthStore();

  useEffect(() => {
    api.get("/categories?type=service").then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (search) params.set("search", search);
    api
      .get(`/services?${params}`)
      .then((res) => setServices(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selectedCategory, search]);

  const groupedServices = categories.map((cat) => ({
    ...cat,
    services: services.filter((s) => s.categoryId === cat.id),
  }));

  const getColor = (name: string) => {
    const key = Object.keys(categoryColors).find((k) =>
      name.toLowerCase().includes(k.toLowerCase())
    );
    return key ? categoryColors[key] : "from-gray-500 to-gray-600";
  };

  const getIcon = (name: string) => {
    const key = Object.keys(categoryIcons).find((k) =>
      name.toLowerCase().includes(k.toLowerCase())
    );
    return key ? categoryIcons[key] : "fa-cog";
  };

  const openModal = (service: Service) => {
    setSelectedService(service);
    setUploadedUrl("");
    setUploadedFileName("");
    setDescription("");
    setModalOpen(true);
  };

  const renderServiceCard = (service: Service, color: string, iconName: string) => (
    <div
      key={service.id}
      className="group bg-card rounded-2xl border border-border p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
      >
        <i className={`fas ${iconName} text-white`} />
      </div>
      <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
        {service.name}
      </h3>
      {service.description && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {service.description}
        </p>
      )}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
        {service.estimatedTime && (
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {service.estimatedTime}
          </span>
        )}
        {Number(service.price) > 0 && (
          <span className="font-bold text-foreground">
            {formatPrice(Number(service.price))}
          </span>
        )}
        {(!service.price || Number(service.price) === 0) && (
          <span className="flex items-center gap-1">
            <FileText className="w-3 h-3" /> Orçamento
          </span>
        )}
      </div>
      <button
        onClick={() => openModal(service)}
        className="w-full py-2.5 bg-primary/10 text-primary text-sm font-bold rounded-xl hover:bg-primary hover:text-white transition-colors"
      >
        Solicitar Orçamento
      </button>
    </div>
  );

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black mb-2">Nossos Serviços</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Soluções completas em papelaria personalizada, documentos,
            serviços governamentais e informática.
          </p>
          <div className="relative max-w-md mx-auto mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar serviços..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory
                ? "bg-primary text-white"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat.id
                  ? "bg-primary text-white"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Wrench className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">Nenhum serviço encontrado</p>
            <p className="text-sm mt-2">
              Tente buscar por outros termos ou entre em contato conosco.
            </p>
          </div>
        ) : selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const color = getColor(service.category?.name || "");
              const icon = getIcon(service.category?.name || "");
              return renderServiceCard(service, color, icon);
            })}
          </div>
        ) : (
          groupedServices.map((cat) => {
            if (cat.services.length === 0) return null;
            const color = getColor(cat.name);
            const icon = getIcon(cat.name);
            return (
              <div key={cat.id} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}
                  >
                    <i className={`fas ${icon} text-white`} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{cat.name}</h2>
                    <p className="text-xs text-muted-foreground">
                      {cat.services.length} serviços disponíveis
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.services.map((service) =>
                    renderServiceCard(service, color, icon)
                  )}
                </div>
              </div>
            );
          })
        )}

        {modalOpen && selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />
            <div className="relative bg-card rounded-2xl border border-border shadow-2xl max-w-lg w-full p-6 z-10 animate-in zoom-in-95">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-5">
                <h3 className="text-lg font-bold">{selectedService.name}</h3>
                {selectedService.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedService.description}
                  </p>
                )}
                <div className="flex items-center gap-3 mt-2 text-sm">
                  {selectedService.estimatedTime && (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" /> {selectedService.estimatedTime}
                    </span>
                  )}
                  {Number(selectedService.price) > 0 ? (
                    <span className="font-bold">
                      {formatPrice(Number(selectedService.price))}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <FileText className="w-3.5 h-3.5" /> Orçamento
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Imagem de referência
                  </label>
                  {uploadedUrl ? (
                    <div className="relative rounded-xl overflow-hidden border border-border">
                      <img
                        src={uploadedUrl}
                        alt="Preview"
                        className="w-full h-48 object-contain bg-muted"
                      />
                      <button
                        onClick={() => {
                          setUploadedUrl("");
                          setUploadedFileName("");
                        }}
                        className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-border bg-muted/30 cursor-pointer hover:bg-muted/50 hover:border-primary transition-colors">
                      {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="w-6 h-6 animate-spin text-primary" />
                          <span className="text-xs text-muted-foreground">Enviando...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <ImageUp className="w-6 h-6 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {token
                              ? "Clique para enviar uma imagem"
                              : "Faça login para enviar imagem"}
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploading || !token}
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file || !token) return;
                          setUploading(true);
                          try {
                            const result = await uploadFile(file, token);
                            setUploadedUrl(result.url);
                            setUploadedFileName(file.name);
                            toast.success("Imagem enviada");
                          } catch {
                            toast.error("Erro ao enviar imagem");
                          } finally {
                            setUploading(false);
                          }
                        }}
                      />
                    </label>
                  )}
                  {uploadedFileName && (
                    <p className="text-xs text-muted-foreground mt-1">
                      <Upload className="w-3 h-3 inline mr-1" />
                      {uploadedFileName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Descrição do serviço
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descreva o que precisa (medidas, quantidade, detalhes...)"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-muted border-none outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  addItem({
                    id: selectedService.id,
                    type: "service",
                    name: selectedService.name,
                    price: Number(selectedService.price) || 0,
                    quantity: 1,
                    serviceId: selectedService.id,
                    file: uploadedUrl || undefined,
                    description: description || undefined,
                  });
                  setModalOpen(false);
                  toast.success(`${selectedService.name} adicionado ao carrinho`);
                }}
                className="w-full mt-5 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
