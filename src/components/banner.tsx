"use client";

import { useBannerCycle } from "@/hooks/use-banner-cycle";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mantine/core";
import React from "react";

export function Banner() {
    const { currentImage } = useBannerCycle();

    const imageVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    return (
        <Box className="flex-1 relative">
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentImage}
                    src={currentImage}
                    alt="Banner"
                    className="absolute inset-0 size-full object-cover"
                    variants={imageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                />
            </AnimatePresence>
        </Box>
    );
}
