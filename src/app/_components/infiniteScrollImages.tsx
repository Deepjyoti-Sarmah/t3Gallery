"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { getMyImages } from '~/server/queries';

interface Image {
    id: number;
    url: string;
    name: string;
}

const InfiniteScrollImages = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null)
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const newImages = await getMyImages() // TODO: fix with pages
                setImages((prevImages) => [...prevImages, ...newImages]);
                setHasMore(newImages.length === 10);
                setPage((prevPage) => prevPage + 1);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting && hasMore) {
                    setLoading(true);
                }
            },
            {rootMargin: "100px"}
        );

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = observer;

        const lastImageElement = document.querySelector(".image-card:last-child");
        if (lastImageElement) {
            observer.observe(lastImageElement);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [hasMore]);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
            {images.map((image) => (
                <div key={image.id} className='flex flex-col items-center justify-center bg-slate-900/90 shadow-lg rounded-lg p-2 image-card'>
                    <Link href={`/img/${image.id}`}>
                        <div className='w-48 h-48 relative'>
                            <Image
                                src={image.url}
                                style={{objectFit: "contain"}}
                                fill
                                alt={image.name}
                                className='w-full h-full object-cover'
                            />
                        </div>
                    </Link>
                    <div className='p-1 font-thin text-slate-50 text-center'>
                        <span>{image.name.length > 15 ? `${image.name.slice(0,15)}...` : image.name}</span>
                    </div>
                </div>
            ))}
            {loading && <div>Loading...</div>}
        </div>
    );
}

export default InfiniteScrollImages
