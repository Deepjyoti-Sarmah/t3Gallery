import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "../server/db/index";

export const dynamic = "force-dynamic";


async function Images() {
    const images = await db.query.images.findMany({
        orderBy: (model, {desc}) => desc(model.id),
    });
    console.log(images);

    return ( 
        <div className="flex flex-wrap gap-4">
            {images.map((image) => (
                <div key={image.id} className="w-48 flex flex-col">
                    <img src={image.url} alt="image"/>
                    <div>{image.name}</div>
                </div>
            ))}
        </div>
    );
}

export default async function HomePage() {

    return (
        <main className="">
            <SignedOut>
                <div className="h-full w-full text-2xl text-center">Please sign in above</div>
            </SignedOut>
            <SignedIn>
                <Images />
            </SignedIn>
        </main>
    );
}
