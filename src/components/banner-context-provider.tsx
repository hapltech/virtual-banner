"use client";

import { createContext, useContext, ReactNode } from "react";
import { useBannerStore } from "@/store/banner";
import { BannerConfig } from "@/utils/config";

interface BannerContextType {
    config: BannerConfig;
    isFullScreen: boolean;
    updateConfig: (newConfig: Partial<BannerConfig>) => void;
    toggleFullScreen: () => void;
    addMemory: (imageUrl: string) => void;
    removeMemory: (imageUrl: string) => void;
    memoriesPerCycle: number;
    setMemoriesPerCycle: (memoriesPerCycle: number) => void;
}

const BannerContext = createContext<BannerContextType | null>(null);

export function BannerProvider({ children }: { children: ReactNode }) {
    const {
        config,
        isFullScreen,
        updateConfig,
        toggleFullScreen,
        addMemory,
        removeMemory,
        memoriesPerCycle,
        setMemoriesPerCycle,
    } = useBannerStore();

    return (
        <BannerContext.Provider
            value={{
                config,
                isFullScreen,
                updateConfig,
                toggleFullScreen,
                addMemory,
                removeMemory,
                memoriesPerCycle,
                setMemoriesPerCycle,
            }}>
            {children}
        </BannerContext.Provider>
    );
}

export const useBanner = () => useBannerStore();
