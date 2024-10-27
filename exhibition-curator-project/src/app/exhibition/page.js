'use client'
import { useEffect, useState } from "react";
import ExhibitionSwiper from "../components/exhibitionSwiper";
import { MdOutlineLightMode } from "react-icons/md";

export default function Exhibition() { 
        const [artworkCollection, setArtworkCollection] = useState([])
        const [timer, setTimer] = useState(1800)
        const [darkMode, setDarkMode] = useState(true);

        useEffect(() => {
            const collection = JSON.parse(localStorage.getItem('artworks')) || [];
            setArtworkCollection(collection)
        }, [])

        useEffect(() => {
            const interval = setInterval(() => {
                setTimer(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(interval);
                        localStorage.clear()
                        window.location.reload(); 
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
    
            return () => clearInterval(interval); 
        }, []);
        
        const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        };
    
        const deleteArtwork = (artwork) => {
            const confirmOption = window.confirm('Are you sure you want to remove the artwork?')

            if (confirmOption) {
            const updatedCollection = artworkCollection.filter(art => art.id !== artwork.id);
            setArtworkCollection(updatedCollection)
            localStorage.setItem('artworks', JSON.stringify(updatedCollection))
            }
        }

        const toggleDarkMode = () => {
            setDarkMode(!darkMode)
        }
    
    return (
        <div className={`flex flex-col items-center justify-center py-3 ${darkMode ? 'dark-mode' : 'bg-gray-200'}`}>
        {artworkCollection.length > 0 && (
            <>
            <h1 className="text-2xl">
            Warning: {formatTime(timer)} minutes left in this session
            </h1>
            <h2 className={`text-xl ${timer <= 60 ? 'text-red-600 animate-pulse' : 'text-gray-700'}`}>
            All selected artworks will be removed when the session ends
            </h2>
            </>
        )}
            <button className="mt-3" onClick={toggleDarkMode}><MdOutlineLightMode className="text-4xl hover:text-yellow-500"/></button>
            <ExhibitionSwiper artworks={artworkCollection} onDelete={deleteArtwork} darkMode={darkMode} />
        </div>
    )
    
}