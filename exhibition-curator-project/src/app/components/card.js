import Image from "next/image"

export default function Card({ image, title }) {
    const props = {
        image: image,
        title: title,
    }
    return (
    <div className="border border-gray-300 rounded-lg overflow-hidden h-80 w-64 flex flex-col">
        <div className="relative flex-grow">
        {image ? (
            <Image 
            src={props.image} 
            alt={`Image for ${props.title}`} 
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"/>
        ) : (<p>No image</p>)}
        </div>
        <div className="border-t border-gray-300 text-center p-2">
            <h4>{props.title}</h4>
        </div>
    </div>
    )
}