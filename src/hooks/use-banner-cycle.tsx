"use client";

import { useState, useEffect } from "react";
import { BannerConfig } from "@/utils/config";

export const useBannerCycle = (config: BannerConfig) => {
    const [showingMemories, setShowingMemories] = useState(false);
    const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);

    useEffect(() => {
        // Handle memory cycling interval
        const cycleInterval = setInterval(() => {
            setShowingMemories(true);

            // Reset after duration
            const durationTimeout = setTimeout(() => {
                setShowingMemories(false);
                setCurrentMemoryIndex(0);
            }, config.cycleDuration);

            return () => clearTimeout(durationTimeout);
        }, config.cycleInterval);

        return () => clearInterval(cycleInterval);
    }, [config.cycleInterval, config.cycleDuration]);

    useEffect(() => {
        // Handle memory image rotation
        let rotationInterval: NodeJS.Timeout;

        if (showingMemories) {
            rotationInterval = setInterval(() => {
                setCurrentMemoryIndex((prev) =>
                    prev === config.memories.length - 1 ? 0 : prev + 1
                );
            }, 1000); // Rotate every second during memory showing
        }

        return () => clearInterval(rotationInterval);
    }, [showingMemories, config.memories.length]);

    return {
        showingMemories,
        currentImage: showingMemories
            ? config.memories[currentMemoryIndex]
            : config.bannerImage,
    };
};
