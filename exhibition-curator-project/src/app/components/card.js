import Image from "next/image"

export default function Card({ image, title }) {
    const props = {
        image: image,
        title: title,
    }
    return (
    <div className="rounded-lg overflow-hidden h-96 w-72 flex flex-col cursor-pointer transform transition duration-500 hover:border-2 border-gray-700 hover:-translate-y-2">
        <div className="relative flex-grow border-b-1 border-gray-700">
        {image ? (
            <Image 
            src={props.image} 
            alt={`Image for ${props.title}`} 
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg transition-transform duration-500 transform hover:scale-95" />
        ) : (<p>No image</p>)}
        </div>
        <div className="bg-gray-100 border-t border-gray-300 text-center p-2">
            <h4 className="text-base font-bold break-words">{props.title}</h4>
        </div>
    </div>
    )
}