import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Card from "./_components/card";
import React from "react";
import { MockImages } from "./_components/mokeImages";
// import InfiniteScrollImages from "./_components/infiniteScrollImages";

export const dynamic = "force-dynamic";

async function Images() {
    const images = await getMyImages();

    return ( 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-2"> 
            {[...images, ...images].map((image) => (
                <Card id={image.id} url={image.url} name={image.name}/>
            ))}
        </div>
    );
}

export default async function HomePage() {
    return (
        <main className="">
            <SignedOut>
                <div className="h-full w-full text-2xl text-center p-4">Please sign in above to upload and view images</div>
                <MockImages />
            </SignedOut>
            <SignedIn>
                <Images />
                {/* <InfiniteScrollImages /> */}
            </SignedIn>
        </main>
    );
}
