import { useEffect, useState } from "react";
import { getImagesForHomepage } from "../utils/imagesForHomePage";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";


export default function HomeCardSlider({ loading }) {
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

    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <div 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer rounded-full shadow-md hover:bg-black-800 transition duration-200 z-20"
            onClick={onClick}>
            <FaArrowAltCircleRight className="text-gray-700" />
            </div>
        )
    }
    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-4xl cursor-pointer rounded-full shadow-md hover:bg-black-800 transition duration-200 z-20"
            onClick={onClick}>
            <FaArrowAltCircleLeft className="text-gray-700" />
            </div>
        )
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="container mx-auto">
        {loading ? (
            <div>Loading...</div>
        ) : (
        <>
        <div className="bg-gray-100 p-6 sm:p-8 rounded-lg border border-gray-200 border-opacity-25 shadow-md">
            <h1 className="text-4xl sm:text-5xl md:text-5xl italic text-center text-gray-800">
            {"\"Art is the elimination of the unnecessary\""}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl italic text-center text-gray-600 mt-3">
            - Picasso
            </h2>
        </div>
        <div className="relative">
            <Slider {...settings}>
                {gallery.map((artwork) => (
                    <div key={artwork.id} className="p-4 flex justify-center">
                    <div className="relative w-full max-w-xl h-96 shadow-lg border rounded-lg overflow-hidden flex items-center justify-center border-grey-100 cursor-pointer"> 
                        <Image
                        src={artwork.image} 
                        alt={artwork.title} 
                        width={600} 
                        height={400} 
                        className="object-contain w-full h-full rounded-lg transition-opacity duration-300 hover:opacity-50"
                        loading="lazy"
                        />
                    <div className="absolute flex flex-col inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 transition-opacity duration-300 hover:opacity-100 z-10">
                        <h3 className="text-white text-2xl">{artwork.title}</h3>
                        <p className="text-white text-xl">{artwork.people?.[0].name || artwork.artistDisplayName}</p>
                    </div>
                </div>
                </div>
                ))}
        </Slider>
        </div>
        </>
    )}
        </div>
    )
}