import { Banner } from "@/components/banner";
import { bannerConfig } from "@/utils/config";

export default function HomePage() {
    return (
        <div className="w-full h-screen">
            <Banner config={bannerConfig} />
        </div>
    );
}
