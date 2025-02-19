import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
    const directoryPath = path.join(process.cwd(), "public/memories");
    try {
        const files = await fs.readdir(directoryPath);
        const imageUrls = files
            .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map((file) => `/memories/${file}`);

        return NextResponse.json({ imageUrls });
    } catch (error) {
        console.error("Error reading directory:", error);
        return NextResponse.json(
            { error: "Failed to load images" },
            { status: 500 }
        );
    }
}
