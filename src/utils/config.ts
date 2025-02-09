export interface BannerConfig {
    bannerImage: string;
    memories: string[];
    cycleInterval: number;
    cycleDuration: number;
}

export const defaultBannerConfig: BannerConfig = {
    bannerImage: "/banners/banner.jpg",
    memories: [
        "/memories/memory-1.png",
        "/memories/memory-2.jpg",
        "/memories/memory-3.jpg",
    ],
    cycleInterval: 12000,
    cycleDuration: 1000,
};
