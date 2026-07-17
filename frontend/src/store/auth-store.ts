import { create } from "zustand";
import { User } from "@/types";
import { api } from "@/lib/api";

interface AuthStore {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  loadProfile: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  loading: false,

  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    set({ user: res.user, token: res.accessToken });
    localStorage.setItem("token", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
  },

  loginWithGoogle: async (credential) => {
    const res = await api.post("/auth/google", { credential });
    set({ user: res.user, token: res.accessToken });
    localStorage.setItem("token", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
  },

  register: async (data) => {
    const res = await api.post("/auth/register", data);
    set({ user: res.user, token: res.accessToken });
    localStorage.setItem("token", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  },

  loadProfile: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    set({ loading: true });
    try {
      const user = await api.get("/auth/profile", token);
      set({ user, token, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  setUser: (user) => set({ user }),
}));
