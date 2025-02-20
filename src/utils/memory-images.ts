import fs from "fs/promises";
import path from "path";

export async function getMemoryImages(): Promise<string[]> {
    const memoriesDirectory = path.join(process.cwd(), "public", "memories");

    try {
        const files = await fs.readdir(memoriesDirectory);
        const imageFiles = files.filter((file) =>
            /\.(png|jpe?g|webp)$/i.test(file)
        );
        return imageFiles.map((file) => `/memories/${file}`);
    } catch (error) {
        console.error("Failed to read memory images directory:", error);
        return [];
    }
}
