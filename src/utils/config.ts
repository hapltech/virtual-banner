export interface BannerConfig {
    bannerImage: string;
    memories: string[];
    cycleInterval: number;
    cycleDuration: number;
}

export const bannerConfig: BannerConfig = {
    bannerImage: "/banners/banner-1.jpg",
    memories: [
        "/memories/memory-1.png",
        "/memories/memory-2.jpg",
        "/memories/memory-3.jpg",
    ],
    cycleInterval: 12000,
    cycleDuration: 1000,
};
