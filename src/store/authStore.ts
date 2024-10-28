import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: any | null;
    forceRender: number;
    setTokens: (accessToken: string, refreshToken: string) => void;
    clearTokens: () => void;
    isAuthenticated: () => boolean;
    getUser: () => any | null;
    forceRenderUpdate: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            refreshToken: null,
            user: null,
            forceRender: 0,
            setTokens: (access, refresh) => {
                set({ accessToken: access, refreshToken: refresh });
            },
            clearTokens: () => set({ accessToken: null, refreshToken: null, user: null }),
            isAuthenticated: () => !!get().accessToken,
            getUser: () => get().user,
            forceRenderUpdate: () => set((state) => ({ forceRender: state.forceRender + 1 })),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

export default useAuthStore;
