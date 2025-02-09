"use client";

import { Box, Image } from "@mantine/core";
import { BannerConfig } from "@/utils/config";
import { useBannerCycle } from "@/hooks/use-banner-cycle";

interface BannerProps {
    config: BannerConfig;
}

export function Banner({ config }: BannerProps) {
    const { currentImage, showingMemories } = useBannerCycle(config);

    return (
        <Box className="w-full h-screen relative">
            <Image
                src={currentImage}
                alt="Banner"
                className={`w-full h-full object-cover transition-opacity duration-1000 ${
                    showingMemories ? "animate-fade-in" : ""
                }`}
            />
        </Box>
    );
}
