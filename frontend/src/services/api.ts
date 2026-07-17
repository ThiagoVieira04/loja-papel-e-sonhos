const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface FetchOptions extends RequestInit {
  token?: string;
}

async function fetchAPI(endpoint: string, options: FetchOptions = {}) {
  const { token, ...fetchOpts } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOpts.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOpts,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Erro na requisição" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: (endpoint: string, token?: string) =>
    fetchAPI(endpoint, { method: "GET", token }),

  post: (endpoint: string, data?: any, token?: string) =>
    fetchAPI(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
      token,
    }),

  put: (endpoint: string, data?: any, token?: string) =>
    fetchAPI(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
      token,
    }),

  delete: (endpoint: string, token?: string) =>
    fetchAPI(endpoint, { method: "DELETE", token }),
};

export async function uploadFile(file: File, token: string) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload/single`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) throw new Error("Erro no upload");
  return res.json();
}
