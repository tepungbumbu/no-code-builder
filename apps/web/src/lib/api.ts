import { getCookie } from './utils';
import type { ApiErrorResponse } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * API Error class
 */
export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

/**
 * API client
 */
export const api = {
  async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = getCookie('token');

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    });

    // Handle empty responses
    if (response.status === 204) {
      return null as T;
    }

    // Parse response
    const data = await response.json();

    // Handle errors
    if (!response.ok) {
      throw new ApiError(
        data.message || 'An error occurred',
        response.status,
        data.code
      );
    }

    return data as T;
  },

  get<T = any>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  },

  post<T = any>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  put<T = any>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete<T = any>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  },
};

/**
 * Project API
 */
export const projectAPI = {
  getAll: () => api.get('/api/projects'),
  get: (id: string) => api.get(`/api/projects/${id}`),
  create: (data: any) => api.post('/api/projects', data),
  save: (id: string, pageStructure: any) =>
    api.post(`/api/projects/${id}/save`, { pageStructure }),
  delete: (id: string) => api.delete(`/api/projects/${id}`),
  publish: (id: string) => api.post(`/api/projects/${id}/publish`),
  export: (id: string) => api.post(`/api/projects/${id}/export`),
};

/**
 * Auth API
 */
export const authAPI = {
  register: (email: string, password: string) =>
    api.post('/api/auth/register', { email, password }),
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  logout: () => api.post('/api/auth/logout'),
  me: () => api.get('/api/auth/me'),
};
