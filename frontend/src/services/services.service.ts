import { api } from "./api";

export const servicesService = {
  list: (params?: Record<string, string>) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get(`/services${query}`);
  },

  getBySlug: (slug: string) => api.get(`/services/${slug}`),

  create: (data: any, token: string) => api.post("/services", data, token),

  update: (id: string, data: any, token: string) => api.put(`/services/${id}`, data, token),

  delete: (id: string, token: string) => api.delete(`/services/${id}`, token),
};
