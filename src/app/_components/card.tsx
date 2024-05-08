import React from 'react'
import Image from "next/image";
import Link from "next/link";

export interface Image {
    id: number,
    url: string,
    name: string
}

const Card = ({id, url, name}: Image) => {
  return (
        <div key={id} className="flex flex-col items-center justify-center bg-slate-900/90 shadow-lg rounded-l g p-2">
            <Link href={`/img/${id}`}>
                <div className=" w-48 h-48 relative ">
                    <Image 
                        src={url} 
                        style={{objectFit:"contain"}} 
                        fill
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>
            <div className="p-1 font-thin text-slate-50 text-center">
                <span>{name.length > 15 ? (name).slice(0,15)+"..." : (name)}</span>
            </div>
        </div>
    );
}

export default Card
