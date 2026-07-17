import { api } from "./api";

export const categoriesService = {
  list: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get(`/categories${query}`);
  },

  getBySlug: (slug: string) => api.get(`/categories/${slug}`),

  create: (data: any, token: string) => api.post("/categories", data, token),

  update: (id: string, data: any, token: string) => api.put(`/categories/${id}`, data, token),

  delete: (id: string, token: string) => api.delete(`/categories/${id}`, token),
};
