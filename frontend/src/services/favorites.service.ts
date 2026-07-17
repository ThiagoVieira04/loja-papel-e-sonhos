import { api } from "./api";

export const favoritesService = {
  list: (token: string) => api.get("/favorites", token),

  toggle: (productId: string, token: string) =>
    api.post(`/favorites/${productId}/toggle`, undefined, token),

  check: (productId: string, token: string) =>
    api.get(`/favorites/${productId}/check`, token),
};
