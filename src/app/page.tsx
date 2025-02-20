"use client";

import { useLoadInitialMemories } from "@/hooks/use-load-memories";
import { ControlPanel } from "@/components/control-panel";
import { useBannerStore } from "@/store/banner";
import { Banner } from "@/components/banner";
import { useEffect } from "react";
import {
    BannerProvider,
    useBanner,
} from "@/components/banner-context-provider";

function Layout({ children }: { children: React.ReactNode }) {
    const { toggleFullScreen } = useBanner();
    const { toggleConfetti } = useBannerStore();
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "h" || e.key === " ") {
                e.preventDefault();
                toggleFullScreen();
            }
            if (e.key === "Enter" || e.key === "f") {
                e.preventDefault();
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else {
                    document.documentElement.requestFullscreen();
                }
            }
            if (e.key === "c") {
                e.preventDefault();
                toggleConfetti();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [toggleFullScreen, toggleConfetti]); // Add toggleConfetti to the dependency array

    return children;
}

export default function HomePage() {
    useLoadInitialMemories();

    return (
        <BannerProvider>
            <Layout>
                <main className="fixed inset-0">
                    <div className="relative w-full h-full flex">
                        <ControlPanel />
                        <Banner />
                    </div>
                </main>
            </Layout>
        </BannerProvider>
    );
}
