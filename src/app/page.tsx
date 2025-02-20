"use client";

import { BannerProvider } from "@/components/banner-context-provider";
import { useLoadInitialMemories } from "@/hooks/use-load-memories";
import { useBanner } from "@/components/banner-context-provider";
import { ControlPanel } from "@/components/control-panel";
import { Banner } from "@/components/banner";
import { useEffect } from "react";

function Layout({ children }: { children: React.ReactNode }) {
    const { isFullScreen, toggleFullScreen } = useBanner();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "h" || e.key === " ") {
                e.preventDefault();
                toggleFullScreen();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [toggleFullScreen]);

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
