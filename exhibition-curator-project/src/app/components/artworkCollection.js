import { useEffect, useState } from "react"
import { getCollections } from "../utils/getCollections";
import Image from "next/image";


export default function ArtworkCollection({ loading }) {
    const [allCollections, setAllCollections] = useState([])

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const collections = await getCollections();
                if (collections) {  
                    setAllCollections(collections);
                }
            } catch(error) {
                console.log(error);
                
            }
        };
        fetchCollections();
    }, [])

    // console.log('all collections:', allCollections.map(collection => collection.department));
    

    return (
        <div className="flex flex-col items-center w-full max-w-[800px] mb-10">
            {loading ? (
                <div>Loading...</div>
            ): (
            <>
                <h1 className="text-3xl mb-8">Explore a range of collections...</h1>
                <div className="grid grid-cols-3 w-full gap-6 ml-8 mr-8">
                {allCollections.map(collection => (
                    <div 
                    key={collection.id}
                    className="flex flex-col h-[420px] p-6 border border-gray-300 transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <Image 
                    src={collection.image} 
                    alt={collection.department} 
                    width={300} 
                    height={200} 
                    className="object-cover flex-grow" />

                    <div className="border-t border-gray-300 pt-2 flex-grow-0">
                    <h3 className="text-lg font-bold text-center text-gray-800 mb-0 relative group whitespace-normal">
                    <span className="absolute left-0 right-0 h-1 bg-black transform scale-x-0 transition-transform duration-300 hover:scale-x-100 origin-left group-hover:scale-x-100"></span>
                    {collection.department}
                    </h3>
                    </div>
                    
                    </div>
                ))}
                </div>
        </>
        )}
        </div>
    )
}
