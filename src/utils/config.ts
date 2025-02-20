export enum AnimationType {
    FADE = "fade",
    SLIDE_LEFT = "slideLeft",
    SLIDE_RIGHT = "slideRight",
    ZOOM_IN = "zoomIn",
    ZOOM_OUT = "zoomOut",
    RANDOM = "random",
}

export interface BannerConfig {
    bannerImage: string;
    memories: string[];
    cycleInterval: number;
    cycleDuration: number;
    memoriesPerCycle: number;
    animationType: AnimationType;
}

export const defaultBannerConfig: BannerConfig = {
    bannerImage: "/banners/banner.webp",
    memories: [],
    cycleInterval: 60000,
    cycleDuration: 10000,
    memoriesPerCycle: 2,
    animationType: AnimationType.FADE, // Default animation
};
