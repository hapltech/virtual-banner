import { useBannerStore } from "@/store/banner";
import { useEffect } from "react";

export const useLoadInitialMemories = () => {
    const { loadInitialMemories, config } = useBannerStore();

    useEffect(() => {
        const fetchInitialMemories = async () => {
            if (config.memories.length === 0) {
                try {
                    const response = await fetch("/api/memories");
                    const data = await response.json();
                    if (data && data.imageUrls) {
                        loadInitialMemories(data.imageUrls);
                    }
                } catch (error) {
                    console.error("Failed to load initial memories:", error);
                }
            }
        };

        fetchInitialMemories();
    }, [loadInitialMemories, config.memories.length]);
};
