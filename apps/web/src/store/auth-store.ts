import { create } from 'zustand';
import { authAPI } from '@/lib/api';
import { setCookie, deleteCookie, getCookie } from '@/lib/utils';
import type { User } from '@/lib/types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await authAPI.login(email, password);
      const { user, token } = response as any;
      
      setCookie('token', token);
      set({ user, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  register: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await authAPI.register(email, password);
      const { user, token } = response as any;
      
      setCookie('token', token);
      set({ user, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      deleteCookie('token');
      set({ user: null });
    }
  },

  checkAuth: async () => {
    const token = getCookie('token');
    if (!token) {
      set({ user: null, loading: false });
      return;
    }

    set({ loading: true });
    try {
      const user = await authAPI.me();
      set({ user: user as User, loading: false });
    } catch (error) {
      deleteCookie('token');
      set({ user: null, loading: false });
    }
  },

  setUser: (user: User | null) => {
    set({ user });
  },
}));
