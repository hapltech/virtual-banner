"use client";

import { Box, Image } from "@mantine/core";
import { useBannerCycle } from "@/hooks/use-banner-cycle";

export function Banner() {
    const { currentImage, showingMemories } = useBannerCycle();

    return (
        <Box className="flex-1 relative">
            <Image
                src={currentImage}
                alt="Banner"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ${
                    showingMemories ? "opacity-100" : "opacity-100"
                }`}
                style={{ transition: "opacity 1s ease-in-out" }}
            />
        </Box>
    );
}
