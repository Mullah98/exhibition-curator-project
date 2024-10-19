'use client'
import { useEffect, useState } from "react"
import { getSingleImage } from "../utils/imagesForHomePage"
import Image from "next/image";
import Link from "next/link";
import HomeCardSlider from "./homeCardSlider";
import ArtworkCollection from "./artworkCollection";
import LoadingSpinner from "../ui/loading";

export default function GalleryOverview() {
    const [singleArtwork, setSingleArtwork] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const artwork = await getSingleImage();
                setSingleArtwork(artwork)
            } catch(error) {
                console.log('Error fetching artwork', error);
            } finally {
                setLoading(false)
            }
        }
        fetchImage();
    }, [])

    if (!singleArtwork) {
        return (
            <div><h2>Error happened</h2></div>
        )
    }
        
    return (
        <div className="flex flex-col items-center max-w-full lg:max-w-[1200px] mx-auto">
            <div className="relative align-center">
                {loading ? (
                    <LoadingSpinner />
                ) : singleArtwork?.primaryimageurl ? (
                    <>
                    <Image 
                    src={singleArtwork?.primaryimageurl} 
                    alt={`image for ${singleArtwork.title}`} 
                    width={900} height={250} 
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={singleArtwork.primaryimageurl}
                    priority />
                    <div className="absolute left-4 bottom-1/4 h-20 p-4 text-white max-w-[90%]">
                    <h2 className="text-5xl font-bold animate-fade-in-left">
                    {singleArtwork.title}
                    </h2> 
                    <p className="text-xl mt-2 animate-fade-in-left">
                        Explore a stunning collection of artworks that inspire and captivate.
                    </p>
                    <Link href="/artworks" 
                    className="text-lg text-blue-300 underline hover:text-blue-400 animate-fade-in-left">
                        View the full collection
                    </Link>
                </div>
                </>
                ) : (
                    <p>No image found</p>
                )}
            </div>
            <div className="mt-16 text-center">
                <HomeCardSlider />
            </div>
            <div className="mt-16 text-center">
                <ArtworkCollection />
            </div>
        </div>
    )
}