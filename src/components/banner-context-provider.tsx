"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { BannerConfig, defaultBannerConfig } from "@/utils/config";

interface BannerContextType {
    config: BannerConfig;
    isFullScreen: boolean;
    updateConfig: (newConfig: Partial<BannerConfig>) => void;
    toggleFullScreen: () => void;
    addMemory: (imageUrl: string) => void;
    removeMemory: (imageUrl: string) => void;
}

const BannerContext = createContext<BannerContextType | null>(null);

export function BannerProvider({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<BannerConfig>(defaultBannerConfig);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const updateConfig = useCallback((newConfig: Partial<BannerConfig>) => {
        setConfig((prev) => ({ ...prev, ...newConfig }));
    }, []);

    const toggleFullScreen = useCallback(() => {
        setIsFullScreen((prev) => !prev);
    }, []);

    const addMemory = useCallback((imageUrl: string) => {
        setConfig((prev) => ({
            ...prev,
            memories: [...prev.memories, imageUrl],
        }));
    }, []);

    const removeMemory = useCallback((imageUrl: string) => {
        setConfig((prev) => ({
            ...prev,
            memories: prev.memories.filter((mem) => mem !== imageUrl),
        }));
    }, []);

    return (
        <BannerContext.Provider
            value={{
                config,
                isFullScreen,
                updateConfig,
                toggleFullScreen,
                addMemory,
                removeMemory,
            }}>
            {children}
        </BannerContext.Provider>
    );
}

export const useBanner = () => {
    const context = useContext(BannerContext);
    if (!context)
        throw new Error("useBanner must be used within BannerProvider");
    return context;
};
