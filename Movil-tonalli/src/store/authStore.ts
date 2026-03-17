import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  xlmBalance: number;
  lessonsCompleted: number;
  walletAddress: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const MOCK_USER: User = {
  id: "u1",
  name: "Tonalli User",
  email: "user@tonalli.xyz",
  avatar: "😎",
  level: 5,
  xp: 3400,
  streak: 7,
  xlmBalance: 15.5,
  lessonsCompleted: 4,
  walletAddress: "GBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, _password: string) => {
    set({ isLoading: true });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    set({
      user: { ...MOCK_USER, email },
      token: "mock-jwt-token-12345",
      isAuthenticated: true,
      isLoading: false,
    });
  },

  register: async (name: string, email: string, _password: string) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    set({
      user: { ...MOCK_USER, name, email, xp: 0, streak: 0, lessonsCompleted: 0 },
      token: "mock-jwt-token-new",
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateUser: (updates: Partial<User>) => {
    const { user } = get();
    if (user) {
      set({ user: { ...user, ...updates } });
    }
  },
}));
