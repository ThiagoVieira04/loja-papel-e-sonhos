import { api } from "./api";

export const adminService = {
  getDashboard: (token: string) => api.get("/admin/dashboard", token),

  listCustomers: (params?: Record<string, string>, token?: string) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get(`/admin/customers${query}`, token);
  },

  getCustomerById: (id: string, token: string) =>
    api.get(`/admin/customers/${id}`, token),

  getFinancial: (params?: Record<string, string>, token?: string) => {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return api.get(`/admin/financial${query}`, token);
  },

  getSalesReport: (token: string) => api.get("/admin/reports/sales", token),

  getCashFlowReport: (token: string) => api.get("/admin/reports/cash-flow", token),
};
