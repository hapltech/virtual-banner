"use client";

import { useBannerCycle } from "@/hooks/use-banner-cycle";
import { motion, AnimatePresence } from "framer-motion";
import { useBannerStore } from "@/store/banner";
import { AnimationType } from "@/utils/config";
import Confetti from "react-confetti";
import { Box } from "@mantine/core";
import React from "react";

const animationVariants = {
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
    slideLeft: {
        initial: { x: "100%", opacity: 0 },
        animate: { x: "0%", opacity: 1 },
        exit: { x: "-100%", opacity: 0 },
    },
    slideRight: {
        initial: { x: "-100%", opacity: 0 },
        animate: { x: "0%", opacity: 1 },
        exit: { x: "100%", opacity: 0 },
    },
    zoomIn: {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0, opacity: 0 },
    },
    zoomOut: {
        initial: { scale: 1.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 1.5, opacity: 0 },
    },
};

const getRandomAnimation = () => {
    const animationKeys = Object.keys(animationVariants) as AnimationType[];
    const randomIndex = Math.floor(Math.random() * animationKeys.length);
    return animationKeys[randomIndex];
};

export function Banner() {
    const { currentImage } = useBannerCycle();
    const { config, showConfetti } = useBannerStore();

    const animationToUse =
        config.animationType === AnimationType.RANDOM
            ? getRandomAnimation()
            : config.animationType;

    const variants =
        animationVariants[animationToUse as keyof typeof animationVariants] ||
        animationVariants.fade;

    return (
        <Box className="flex-1 relative">
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
            )}
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentImage}
                    src={currentImage}
                    alt="Banner"
                    className="absolute inset-0 size-full object-cover"
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </AnimatePresence>
        </Box>
    );
}
