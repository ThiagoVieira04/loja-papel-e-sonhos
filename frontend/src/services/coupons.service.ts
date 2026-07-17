import { api } from "./api";

export const couponsService = {
  validate: (code: string) => api.post("/coupons/validate", { code }),

  apply: (code: string, total: number) => api.post("/coupons/apply", { code, total }),

  listAll: (token: string) => api.get("/coupons", token),

  create: (data: any, token: string) => api.post("/coupons", data, token),

  update: (id: string, data: any, token: string) => api.put(`/coupons/${id}`, data, token),

  delete: (id: string, token: string) => api.delete(`/coupons/${id}`, token),
};
