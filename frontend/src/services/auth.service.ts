import { api } from "./api";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
  cpf?: string;
}

export const authService = {
  login: (data: LoginData) => api.post("/auth/login", data),

  register: (data: RegisterData) => api.post("/auth/register", data),

  loginWithGoogle: (tokenId: string) =>
    api.post("/auth/google", { tokenId, role: "CUSTOMER" }),

  refreshToken: (refreshToken: string) =>
    api.post("/auth/refresh", { refreshToken }),

  getProfile: (token: string) => api.get("/auth/profile", token),

  updateProfile: (data: any, token: string) => api.put("/auth/profile", data, token),

  changePassword: (data: { currentPassword: string; newPassword: string }, token: string) =>
    api.put("/auth/change-password", data, token),
};
