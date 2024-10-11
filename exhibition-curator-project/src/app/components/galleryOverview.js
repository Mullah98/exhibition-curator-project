'use client'
import { useEffect, useState } from "react"
import { getSingleImage } from "../utils/imagesForHomePage"
import Image from "next/image";
import Link from "next/link";
import HomeCardSlider from "./homeCardSlider";
import ArtworkCollection from "./artworkCollection";

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
        <div className="flex flex-col items-center w-full max-w-[800px] mx-auto">
            <div className="relative align-center">
                {loading ? (
                    <div className="flex items-center justify-center h-64">Loading image....</div>
                ) : singleArtwork?.primaryimageurl ? (
                    <Image 
                        src={singleArtwork?.primaryimageurl} 
                        alt={`image for ${singleArtwork.title}`} 
                        width={900} height={250} 
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL={singleArtwork.primaryimageurl}
                        loading="lazy" 
                    />
                ) : (
                    <p>No image found</p>
                )}
                <div className="absolute left-4 bottom-1/4 h-20 p-4 text-white max-w-[90%]">
                    <h2 className="text-5xl font-bold">{singleArtwork.title}</h2> 
                    <p className="text-xl mt-2">
                        Explore a stunning collection of artworks that inspire and captivate.
                    </p>
                    <Link href="/artworks" className="text-lg text-blue-300 underline hover:text-blue-400">
                        View the full collection
                    </Link>
                </div>
            </div>
            <div className="mt-16 text-center">
                <HomeCardSlider loading={loading} />
            </div>
            <div className="mt-16 text-center">
                <ArtworkCollection loading={loading} />
            </div>
        </div>
    )
}