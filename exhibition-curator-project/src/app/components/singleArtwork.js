import { useEffect, useState } from "react"
import { getSingleImage } from "../utils/imagesForHomePage"
import Image from "next/image"
import Link from "next/link"

export default function SingleArtwork() {
    const [artwork, setArtwork] = useState(null)

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const artwork = await getSingleImage()
                setArtwork(artwork)
            } catch (error) {
                console.log('Error fetching artwork', error)
            }
        }
        fetchImage();
    }, [])

  return (
    <div>
      {artwork && (
        <div>
        <Image 
            src={artwork?.primaryimageurl} 
            alt={`image for ${artwork.title}`} 
            width={900} height={250} 
            className="object-cover"
            placeholder="blur"
            blurDataURL={artwork.primaryimageurl}
            priority />
            <div className="absolute left-4 bottom-1/4 h-20 p-4 text-white max-w-[90%]">
            <h2 className="text-5xl font-bold animate-fade-in-left">
            {artwork.title}
            </h2> 
            <p className="text-xl mt-2 animate-fade-in-left">
                Explore a stunning collection of artworks that inspire and captivate.
            </p>
            <Link href="/artworks" 
            className="text-lg text-blue-300 underline hover:text-blue-400 animate-fade-in-left">
                View the full collection
            </Link>
            </div>
        </div>
      )}
    </div>
  )
}
