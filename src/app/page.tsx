"use client";

import { Banner } from "@/components/banner";
import { ControlPanel } from "@/components/control-panel";
import { BannerProvider } from "@/components/banner-context-provider";
import { useEffect } from "react";
import { useBanner } from "@/components/banner-context-provider";

function Layout({ children }: { children: React.ReactNode }) {
    const { isFullScreen, toggleFullScreen } = useBanner();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "h" && e.altKey) {
                e.preventDefault();
                toggleFullScreen();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [toggleFullScreen]);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {children}
        </div>
    );
}

export default function HomePage() {
    return (
        <BannerProvider>
            <Layout>
                <div className="flex h-full">
                    <ControlPanel />
                    <Banner />
                </div>
            </Layout>
        </BannerProvider>
    );
}
