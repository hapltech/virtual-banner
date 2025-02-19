"use client";

import { BannerConfig, defaultBannerConfig } from "@/utils/config";
import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";

interface BannerContextType {
    config: BannerConfig;
    isFullScreen: boolean;
    updateConfig: (newConfig: Partial<BannerConfig>) => void;
    toggleFullScreen: () => void;
    addMemory: (imageUrl: string) => void;
    removeMemory: (imageUrl: string) => void;
    memoriesPerCycle: number;
}

const BannerContext = createContext<BannerContextType | null>(null);

export function BannerProvider({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<BannerConfig>(defaultBannerConfig);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [memoriesPerCycle, setMemoriesPerCycle] = useState(
        defaultBannerConfig.memoriesPerCycle
    );

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

    useEffect(() => {
        const loadMemories = async () => {
            try {
                const response = await fetch("/api/memories");
                const data = await response.json();
                if (data.imageUrls) {
                    setConfig((prev) => ({
                        ...prev,
                        memories: data.imageUrls,
                    }));
                } else {
                    console.error("Failed to load images:", data.error);
                }
            } catch (error) {
                console.error("Failed to fetch images:", error);
            }
        };

        loadMemories();
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
                memoriesPerCycle,
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
