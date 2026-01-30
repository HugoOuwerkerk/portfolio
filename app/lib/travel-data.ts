import fs from 'fs';
import path from 'path';

export interface Trip {
    slug: string;
    title: string;
    cover: string | null;
    images: string[];
    imageCount: number;
}

export function getTrips(): Trip[] {
    const travelDir = path.join(process.cwd(), 'public', 'travel');

    if (!fs.existsSync(travelDir)) {
        return [];
    }

    const folders = fs.readdirSync(travelDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    const trips: Trip[] = folders.map(folder => {
        const folderPath = path.join(travelDir, folder);
        const files = fs.readdirSync(folderPath)
            .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file));

        const images = files.map(file => `/travel/${folder}/${file}`);

        // Extract year from end of folder name (e.g. "Austria-2024")
        const yearMatch = folder.match(/[-_](\d{4})$/);
        const year = yearMatch ? yearMatch[1] : null;
        const cleanTitle = folder.replace(/[-_](\d{4})$/, '').replace(/[-_]/g, ' ');

        return {
            slug: folder,
            title: cleanTitle + (year ? ` (${year})` : ''),
            cover: images.length > 0 ? images[0] : null,
            images: images,
            imageCount: images.length
        };
    });

    return trips;
}
