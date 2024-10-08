'use client'
import { useEffect, useState } from "react"
import { getSingleImage } from "../utils/imagesForHomePage"
import Image from "next/image";
import Link from "next/link";
import HomeCardSlider from "./homeCardSlider";

export default function GalleryOverview() {
    const [singleArtwork, setSingleArtwork] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const artwork = await getSingleImage();
                if (artwork) {
                    setSingleArtwork(artwork)
                }
            } catch(error) {
                console.log('Error fetching artwork', error);
                
            } finally {
                setLoading(false)
            }
        }
        fetchImage();
    }, [])
    
    return (
        <div className="flex flex-col items-center w-full max-w-[800] mx-auto">
            <div className="relative align-center">
            {loading ? (
                <div className="flex items=center justify-center h-64">Loading image....</div>
            ) : singleArtwork?.primaryimageurl ? (
                <Image 
                src={singleArtwork?.primaryimageurl} 
                alt={`image for ${singleArtwork.title}`} 
                width={900} height={250} 
                className="object-cover"
                placeholder="blur"
                blurDataURL={singleArtwork.primaryimageurl}
                loading="lazy" />
            ) : (
                <p>No image found</p>
            )}
            <Link href="/artworks">
            <h1 className="absolute bottom-0 right-0 text-white text-3xl p-4 cursor-pointer hover:underline transition">View more artworks</h1>
            </Link>
            </div>
            <div className="mt-16 text-center">
                <HomeCardSlider />
            </div>
        </div>
    )
}