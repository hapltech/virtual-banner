"use client";

import { useState, useEffect, useRef } from "react";
import { useBannerStore } from "@/store/banner";

function getRandomItems<T>(arr: T[], count: number): T[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

export const useBannerCycle = () => {
    const { config, memoriesPerCycle } = useBannerStore();
    const [currentImage, setCurrentImage] = useState(config.bannerImage);
    const [showingMemories, setShowingMemories] = useState(false);
    const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);
    const [currentMemories, setCurrentMemories] = useState<string[]>([]);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const memoryIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const startCycle = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (memoryIntervalRef.current)
                clearInterval(memoryIntervalRef.current);

            const randomMemories = getRandomItems(
                config.memories,
                Math.min(memoriesPerCycle, config.memories.length)
            );
            setCurrentMemories(randomMemories);
            setCurrentMemoryIndex(0);

            if (randomMemories.length > 0) {
                setShowingMemories(true);
                setCurrentImage(randomMemories[0]);

                let memoryIndex = 0;
                memoryIntervalRef.current = setInterval(() => {
                    memoryIndex = (memoryIndex + 1) % randomMemories.length;
                    setCurrentImage(randomMemories[memoryIndex]);
                }, config.cycleDuration);

                timeoutRef.current = setTimeout(() => {
                    if (memoryIntervalRef.current)
                        clearInterval(memoryIntervalRef.current);
                    setShowingMemories(false);
                    setCurrentImage(config.bannerImage);
                }, config.cycleDuration * randomMemories.length);
            } else {
                setShowingMemories(false);
                setCurrentImage(config.bannerImage);
                timeoutRef.current = setTimeout(() => {
                    setCurrentImage(config.bannerImage);
                }, config.cycleInterval);
                return;
            }
        };

        startCycle();

        const cycleIntervalId = setInterval(startCycle, config.cycleInterval);

        return () => {
            clearInterval(cycleIntervalId);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (memoryIntervalRef.current)
                clearInterval(memoryIntervalRef.current);
        };
    }, [
        config.bannerImage,
        config.cycleDuration,
        config.cycleInterval,
        config.memories,
        memoriesPerCycle,
    ]);

    return {
        currentImage,
        showingMemories,
    };
};
