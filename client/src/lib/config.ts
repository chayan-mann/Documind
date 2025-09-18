export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

export const API_ENDPOINTS = {
  upload: `${API_BASE_URL}/upload`,
  query: `${API_BASE_URL}/query`,
} as const
