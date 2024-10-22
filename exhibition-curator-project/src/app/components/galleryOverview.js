'use client'
import { useEffect, useState } from "react"
import { getSingleImage } from "../utils/imagesForHomePage"
import Image from "next/image";
import Link from "next/link";
import HomeCardSlider from "./homeCardSlider";
import ArtworkCollection from "./artworkCollection";
import LoadingSpinner from "../ui/loading";
import SingleArtwork from "./singleArtwork";

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
        
    return (
        <div className="flex flex-col items-center max-w-full lg:max-w-[1200px] mx-auto">
            <div className="relative align-center">
                <SingleArtwork />
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