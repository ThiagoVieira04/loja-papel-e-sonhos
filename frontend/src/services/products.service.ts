import { api } from "./api";

export const productsService = {
  list: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get(`/products${query}`);
  },

  getBySlug: (slug: string) => api.get(`/products/${slug}`),

  getFeatured: () => api.get("/products/featured"),

  getBestSellers: () => api.get("/products/best-sellers"),

  getNew: () => api.get("/products/new"),

  getRelated: (id: string) => api.get(`/products/${id}/related`),

  create: (data: any, token: string) => api.post("/products", data, token),

  update: (id: string, data: any, token: string) => api.put(`/products/${id}`, data, token),

  delete: (id: string, token: string) => api.delete(`/products/${id}`, token),

  duplicate: (id: string, token: string) => api.post(`/products/${id}/duplicate`, undefined, token),
};
