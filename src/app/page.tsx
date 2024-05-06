import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function Images() {
    const images = await getMyImages();

    return ( 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-2">
            {[...images, ...images].map((image) => (
                <div key={image.id} className="flex flex-col items-center justify-center bg-slate-900/90 shadow-lg rounded-l g p-2">
                    <Link href={`/img/${image.id}`}>
                        <div className=" w-48 h-48 relative ">
                            <Image 
                                src={image.url} 
                                style={{objectFit:"contain"}} 
                                fill
                                alt={image.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </Link>
                    <div className="p-1 font-thin text-slate-50 text-center">
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
