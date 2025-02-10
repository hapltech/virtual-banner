"use client";

import { BannerConfig, defaultBannerConfig } from "@/utils/config";
import { getPublicImageUrls } from "@/utils/image";
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
        const memoriesDirectory = "/memories";

        const loadImageUrls = async () => {
            const imageUrls = await getPublicImageUrls(memoriesDirectory);

            setConfig((prev) => ({
                ...prev,
                memories: imageUrls,
            }));
        };

        loadImageUrls();
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
