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

    return children;
}

export default function HomePage() {
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
