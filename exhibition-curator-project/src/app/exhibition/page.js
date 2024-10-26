'use client'
import { useEffect, useState } from "react";
import ExhibitionSwiper from "../components/exhibitionSwiper";

export default function Exhibition() { 
        const [artworkCollection, setArtworkCollection] = useState([])   

        useEffect(() => {
            const collection = JSON.parse(localStorage.getItem('artworks')) || [];
            setArtworkCollection(collection)
        }, [])

        

        // useEffect(() => {
        //     const timer = setTimeout(() => {
        //         localStorage.clear()
        //         window.location.reload();
        //     }, 5000)

        //     return () => clearTimeout(timer)
        // })

        const deleteArtwork = (artwork) => {
            const confirmOption = window.confirm('Are you sure you want to remove the artwork?')

            if (confirmOption) {
            const updatedCollection = artworkCollection.filter(art => art.id !== artwork.id);
            setArtworkCollection(updatedCollection)
            localStorage.setItem('artworks', JSON.stringify(updatedCollection))
            }
        }
    
    return (
        <div className="flex justify-center mt-14">
            <ExhibitionSwiper artworks={artworkCollection} onDelete={deleteArtwork} />
        </div>
    )
    
}