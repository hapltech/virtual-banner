export const getPublicImageUrls = async (
    directory: string,
    imageExtensions: string[] = ["jpg", "webp", "jpeg", "png", "gif"]
): Promise<string[]> => {
    const imageUrls: string[] = [];

    const imageUrlExists = async (url: string): Promise<boolean> => {
        try {
            const response = await fetch(url, { method: "HEAD" });
            return response.status >= 200 && response.status < 300;
        } catch (error) {
            return false;
        }
    };

    const checkImage = async (baseName: string) => {
        for (const ext of imageExtensions) {
            const imageUrl = `${directory}/${baseName}.${ext}`;
            if (await imageUrlExists(imageUrl)) {
                imageUrls.push(imageUrl);
            }
        }
    };

    const imageBaseNames = ["memory", "image", "banner"];

    const numberOfImagesToCheck = 10;
    for (let i = 1; i <= numberOfImagesToCheck; i++) {
        await checkImage(`memory-${i}`);
    }

    for (const baseName of imageBaseNames) {
        await checkImage(baseName);
    }

    return imageUrls;
};
