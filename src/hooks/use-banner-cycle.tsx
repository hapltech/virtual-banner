"use client";

import { useState, useEffect } from "react";
import { BannerConfig } from "@/utils/config";

function getRandomItems<T>(arr: T[], count: number): T[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

export const useBannerCycle = (config: BannerConfig) => {
    const [showingMemories, setShowingMemories] = useState(false);
    const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);
    const [currentMemories, setCurrentMemories] = useState<string[]>([]);

    useEffect(() => {
        const cycleInterval = setInterval(() => {
            const randomMemories = getRandomItems(
                config.memories,
                Math.min(config.memoriesPerCycle, config.memories.length)
            );
            setCurrentMemories(randomMemories);
            setShowingMemories(true);

            const durationTimeout = setTimeout(() => {
                setTimeout(() => {
                    setShowingMemories(false);
                    setCurrentMemoryIndex(0);
                }, 1000);
            }, config.cycleDuration);

            return () => clearTimeout(durationTimeout);
        }, config.cycleInterval);

        return () => clearInterval(cycleInterval);
    }, [
        config.cycleInterval,
        config.cycleDuration,
        config.memories,
        config.memoriesPerCycle,
    ]);

    useEffect(() => {
        let rotationInterval: NodeJS.Timeout;

        if (showingMemories) {
            rotationInterval = setInterval(() => {
                setCurrentMemoryIndex((prev) =>
                    prev === currentMemories.length - 1 ? 0 : prev + 1
                );
            }, 1000);
        }

        return () => clearInterval(rotationInterval);
    }, [showingMemories, currentMemories.length]);

    return {
        showingMemories,
        currentImage: showingMemories
            ? currentMemories[currentMemoryIndex]
            : config.bannerImage,
    };
};
