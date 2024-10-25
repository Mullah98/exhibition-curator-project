'use client'
import { useEffect, useState } from "react";
import ExhibitionSwiper from "../components/exhibitionSwiper";

export default function Exhibition() { 
        const [artworkCollection, setArtworkCollection] = useState([])   

        useEffect(() => {
            const collection = JSON.parse(localStorage.getItem('artworks')) || [];
            setArtworkCollection(collection)
        }, [])

        console.log(artworkCollection);
        

        // useEffect(() => {
        //     const timer = setTimeout(() => {
        //         localStorage.clear()
        //         window.location.reload();
        //     }, 5000)

        //     return () => clearTimeout(timer)
        // })

    
    return (
        <div className="flex justify-center mt-14">
        <p>Number of arts: {artworkCollection.length}</p>
            <ExhibitionSwiper artworks={artworkCollection}/>
        </div>
    )
    
}