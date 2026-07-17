import { useAuthStore } from "@/store/auth-store";

export function useAuth() {
  const { user, token, loading, login, loginWithGoogle, register, logout } =
    useAuthStore();

  return {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    isAdmin: user?.role === "ADMIN" || user?.role === "STAFF",
    login,
    loginWithGoogle,
    register,
    logout,
  };
}
