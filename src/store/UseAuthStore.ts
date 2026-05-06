import { create } from "zustand";
import { persist } from 'zustand/middleware'

interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
    login: (userName: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
    (set) => ({
        user: null,
        isAuthenticated: false,
        login: (userName: string) => 
            set({ user: userName, isAuthenticated: true }),
        logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
    name: 'auth-storage', // Key di LocalStorage
    }
    )
);
