import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function Images() {
    const images = await getMyImages();

    return ( 
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {images.map((image) => (
                <div key={image.id} className="w-48 h-48 flex flex-col pt-2 pb-2">
                    <Link href={`/img/${image.id}`}>
                        <Image 
                            src={image.url} 
                            style={{objectFit:"contain"}} 
                            width={192}
                            height={192}
                            alt={image.name}
                        />
                    </Link>
                    <div className="p-2 font-thin text-slate-50">
                        <span>{image.name.length > 15 ? (image.name).slice(0,15)+"..." : (image.name)}</span>
                    </div>
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
