import { db } from "../server/db/index";

export const dynamic = "force-dynamic";

// const mockURL = [
//     "https://utfs.io/f/2789cddd-c039-4d13-9872-f97ecfe7689f-ja6c04.com_death-stranding-fanart-4k_3625x2160.jpg",
//     "https://utfs.io/f/2e6bf210-49e4-49bf-84c4-311747a041f5-3mczkm.jpg",
//     "https://utfs.io/f/c9ae0bf6-494b-4f59-ad18-2548bd07b81b-a1jsaj.png",
//     "https://utfs.io/f/bb6fab1b-c859-4a4a-b3a9-1a9fe190bc0b-v6mnai.png"
// ]

// const mockImages = mockURL.map((url, index) => ({
//     id: index + 1,
//     url
// }));

export default async function HomePage() {

    const images = await db.query.images.findMany({
        orderBy: (model, {desc}) => desc(model.id),
    });

    console.log(images);

    return (
        <main className="">
            <div className="flex flex-wrap gap-4">
                {[...images, ...images, ...images].map((image, index) => (
                    <div key={image.id + "-" + index} className="w-48 flex flex-col">
                        <img src={image.url} alt="image"/>
                        <div>{image.name}</div>
                    </div>
                ))}
            </div>
        </main>
    );
}
