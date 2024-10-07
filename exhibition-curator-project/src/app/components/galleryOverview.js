'use client'
import { useEffect, useState } from "react"
import { getImagesForHomepage, getSingleImage } from "../utils/imagesForHomePage"
import Image from "next/image";

export default function GalleryOverview() {
    const [gallery, setGallery] = useState([]);
    const [singleArtwork, setSingleArtwork] = useState([])
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     const fetchImages = async () => {
    //         const artworks = await getImagesForHomepage();

    //         if(artworks) {
    //             setGallery(artworks)
    //         }
    //     };
    //     fetchImages();
    // }, []);

    // const firstimg = gallery[0]
    // console.log(firstimg);

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
        <div className="flex flex-col items-center w-full max-w-[800] mx-auto border-4 border-red-500">
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
            <h1 className="absolute bottom-0 right-0 text-white text-3xl p-4">View more artworks</h1>
            </div>
            <div className="mt-4 text-center">
                <h2>More items</h2>
            </div>
        </div>
    )
}