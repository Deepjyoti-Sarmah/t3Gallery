import Card from "./card";

export const mockImageURLs = [
    "https://utfs.io/f/2789cddd-c039-4d13-9872-f97ecfe7689f-ja6c04.com_death-stranding-fanart-4k_3625x2160.jpg",
    "https://utfs.io/f/2e6bf210-49e4-49bf-84c4-311747a041f5-3mczkm.jpg",
    "https://utfs.io/f/c9ae0bf6-494b-4f59-ad18-2548bd07b81b-a1jsaj.png",
    "https://utfs.io/f/bb6fab1b-c859-4a4a-b3a9-1a9fe190bc0b-v6mnai.png",
    "https://utfs.io/f/ea1b5820-7720-4937-855f-5234b4b70481-1b9sse.jpg"
]

export const mockImages = mockImageURLs.map((url, index) => ({
    id: index + 1,
    url,
}));


export function MockImages() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-2"> 
            {[...mockImages, ...mockImages, ...mockImages].map((image) => (
            <Card id={image.id} url={image.url} name={image.url}/>
            ))}
        </div>
    );
}
