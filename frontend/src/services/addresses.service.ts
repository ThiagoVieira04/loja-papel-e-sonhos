import { api } from "./api";

export const addressesService = {
  list: (token: string) => api.get("/addresses", token),

  create: (data: any, token: string) => api.post("/addresses", data, token),

  update: (id: string, data: any, token: string) => api.put(`/addresses/${id}`, data, token),

  delete: (id: string, token: string) => api.delete(`/addresses/${id}`, token),
};
