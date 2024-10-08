import { useEffect, useState } from "react";
import { getImagesForHomepage } from "../utils/imagesForHomePage";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeCardSlider() {
    const [gallery, setGallery] = useState([])


    useEffect(() => {
        const fetchImages = async () => {
            try {
                const artworks = await getImagesForHomepage();
                if (artworks) {
                    setGallery(artworks)
                }
            } catch(error) {
                console.log('Error fetching artworks', error);
            }
        };
        fetchImages();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
    }    

    return (
        <div className="container mx-auto">
            <h1 className="text-6xl m-10 text-center">Card Slider</h1>
            <Slider {...settings}>
                {gallery.map((art) => (
                    <div key={art.id} className="p-4 flex justify-center">
                    <div className="relative w-full max-w-xl h-96 shadow-lg border rounded-lg overflow-hidden flex items-center justify-center border-grey-100 cursor-pointer"> 
                        <Image 
                        src={art.image} 
                        alt={art.title} 
                        width={600} 
                        height={400} 
                        className="object-contain w-full h-full rounded-lg transition-opacity duration-300 hover:opacity-50"
                        loading="lazy"
                        />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 transition-opacity duration-300 hover:opacity-100 z-10">
                        <p className="text-white">hello</p>
                    </div>
                </div>
                </div>
                ))}
        </Slider>
        </div>
    )
}