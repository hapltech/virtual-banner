export interface BannerConfig {
    bannerImage: string;
    memories: string[];
    cycleInterval: number;
    cycleDuration: number;
    memoriesPerCycle: number;
}

export const defaultBannerConfig: BannerConfig = {
    bannerImage: "/banners/banner.webp",
    memories: [],
    cycleInterval: 60000,
    cycleDuration: 10000,
    memoriesPerCycle: 2,
};
