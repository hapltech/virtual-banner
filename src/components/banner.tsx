"use client";

import { Box, Image } from "@mantine/core";
import { useBannerCycle } from "@/hooks/use-banner-cycle";
import { useBanner } from "@/components/banner-context-provider";

export function Banner() {
    const { config, isFullScreen } = useBanner();
    const { currentImage, showingMemories } = useBannerCycle(config);

    return (
        <Box className="flex-1 relative">
            <Image
                src={currentImage}
                alt="Banner"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    showingMemories ? "opacity-100" : "opacity-100"
                }`}
            />
        </Box>
    );
}
