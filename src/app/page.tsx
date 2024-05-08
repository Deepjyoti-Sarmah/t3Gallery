import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Card from "./_components/card";
import React from "react";

export const dynamic = "force-dynamic";

async function Images() {
    const images = await getMyImages();

    return ( 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-2"> 
            {[...images, ...images, ...images].map((image) => (
                <Card id={image.id} url={image.url} name={image.name}/>
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
