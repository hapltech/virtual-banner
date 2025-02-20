import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { BannerConfig, defaultBannerConfig } from "@/utils/config";

interface BannerState {
    config: BannerConfig;
    isFullScreen: boolean;
    memoriesPerCycle: number;
    showConfetti: boolean;
    updateConfig: (newConfig: Partial<BannerConfig>) => void;
    toggleFullScreen: () => void;
    addMemory: (imageUrl: string) => void;
    removeMemory: (imageUrl: string) => void;
    setMemoriesPerCycle: (memoriesPerCycle: number) => void;
    loadInitialMemories: (initialMemories: string[]) => void;
    toggleConfetti: () => void;
}

export const useBannerStore = create<BannerState>()(
    persist(
        (set, get) => ({
            config: defaultBannerConfig,
            isFullScreen: false,
            memoriesPerCycle: defaultBannerConfig.memoriesPerCycle,
            showConfetti: false,
            updateConfig: (newConfig: Partial<BannerConfig>) =>
                set((state) => ({ config: { ...state.config, ...newConfig } })),
            toggleFullScreen: () =>
                set((state) => ({ isFullScreen: !state.isFullScreen })),
            addMemory: (imageUrl: string) =>
                set((state) => ({
                    config: {
                        ...state.config,
                        memories: [...state.config.memories, imageUrl],
                    },
                })),
            removeMemory: (imageUrl: string) =>
                set((state) => ({
                    config: {
                        ...state.config,
                        memories: state.config.memories.filter(
                            (mem) => mem !== imageUrl
                        ),
                    },
                })),
            setMemoriesPerCycle: (memoriesPerCycle: number) =>
                set({ memoriesPerCycle }),
            loadInitialMemories: (initialMemories: string[]) =>
                set((state) => ({
                    config: { ...state.config, memories: initialMemories },
                })),
            toggleConfetti: () =>
                set((state) => ({ showConfetti: !state.showConfetti })),
        }),
        {
            name: "banner-storage",
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => {
                return (state, error) => {
                    if (error) {
                        console.error(
                            "An error occurred during rehydration:",
                            error
                        );
                    }
                };
            },
        }
    )
);
