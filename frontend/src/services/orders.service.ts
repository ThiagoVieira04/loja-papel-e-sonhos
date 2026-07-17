import { api } from "./api";

export const ordersService = {
  create: (data: any, token: string) => api.post("/orders", data, token),

  listMyOrders: (token: string) => api.get("/orders/my-orders", token),

  getById: (id: string, token: string) => api.get(`/orders/${id}`, token),

  updateStatus: (id: string, status: string, token: string) =>
    api.put(`/orders/${id}/status`, { status }, token),

  listAll: (params?: Record<string, string>, token?: string) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get(`/orders${query}`, token);
  },

  getStats: (token: string) => api.get("/orders/stats", token),
};
