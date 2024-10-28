'use client'
import Image from "next/image";
import { Skeleton } from "./skeleton";
import { useState, useEffect } from "react";

export default function Modal({handleShowModal, selectedArtwork}) {
    const [isLoading, setIsLoading] = useState(true)
    const [alreadyAdded, setAlreadyAdded] = useState(false)
    const isModalOpen = true

    useEffect(() => {
        if (selectedArtwork) {
            setIsLoading(false)
            checkForArtwork(selectedArtwork)
        }
    }, [selectedArtwork])

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
        return () => (document.body.style.overflow = 'auto')
    }, [isModalOpen])

    const checkForArtwork = (artwork) => {
        const storedItems = JSON.parse(localStorage.getItem('artworks')) || [];
        const artworkIdWithPrefix = artwork.id ? `harvard-${artwork.id}` : `met-${artwork.objectID}`;
        setAlreadyAdded(
            storedItems.some(item => item.uniqueId === artworkIdWithPrefix)
        );
    };
    
    const handleClick = (artwork) => {
        const existingCollection = JSON.parse(localStorage.getItem('artworks')) || [];
        if (alreadyAdded) return;
        
        const uniqueId = artwork.id ? `harvard-${artwork.id}` : `met-${artwork.objectID}`;
        existingCollection.push({
            ...artwork,
            uniqueId
        });
        
        localStorage.setItem('artworks', JSON.stringify(existingCollection));
        setAlreadyAdded(true);
    };    
    
    return (
        <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative w-[80%] h-[80%] flex bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
                <div className="w-1/2 h-full relative">
                    {isLoading ? (
                        <Skeleton className="h-full w-full bg-gray-300 animation-pulse" />
                    ) : (
                        <Image
                        src={selectedArtwork.primaryimageurl || selectedArtwork.primaryImage}
                        alt={`Image for ${selectedArtwork.id || selectedArtwork.objectID}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain"
                        priority />
                    )}
                </div>

                <div className="w-1/2 h-full flex flex-col p-4 overflow-y-auto">
                    <div className="flex justify-end mb-4">
                        <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={handleShowModal}>
                            Close
                        </button>
                    </div>
                    <div className="text-sm sm:text-base flex-grow flex flex-cols justify-between mt-2">
                        <div className="w-full max-w-3xl mx-auto">
                            <h1 className="text-2xl sm:text-4xl font-bold mb-4">{selectedArtwork.title}</h1>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center border-b border-gray-300 py-2">
                                    <strong className="mr-2">Object Number</strong>
                                    <p>{selectedArtwork.objectnumber || selectedArtwork.objectID || ''}</p>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-300 py-2">
                                    <strong className="mr-2">Classification</strong>
                                    <p>{selectedArtwork.classification || 'unknown'}</p>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-300 py-2">
                                    <strong className="mr-2">Department</strong>
                                    <p>{selectedArtwork.description || selectedArtwork.department || 'unknown'}</p>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-300 py-2">
                                    <strong className="mr-2">Culture</strong>
                                    <p>{selectedArtwork.culture || 'unknown'}</p>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-300 py-2">
                                    <strong className="mr-2">Description</strong>
                                    <p>{selectedArtwork.description || 'n/a'}</p>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-300 py-2">
                                    <strong className="mr-2">Medium</strong>
                                    <p className="truncate text-overflow">{selectedArtwork.medium || 'unknown'}</p>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-300 py-2">
                                    <strong className="mr-2">Period</strong>
                                    <p>{selectedArtwork.period || 'unknown'}</p>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-300 py-2">
                                    <strong className="mr-2">Dimension</strong>
                                    <p>{selectedArtwork.dimensions || 'unknown'}</p>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-300 py-2 overflow-x-auto max-h-16">
                                    <strong className="mr-2">Credit Line</strong>
                                    <p className="whitespace-nowrap">{selectedArtwork.creditline || selectedArtwork.creditLine || 'unknown'}</p>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-300 py-2">
                                    <strong className="mr-2">Century</strong>
                                    <p>{selectedArtwork.century || selectedArtwork.objectDate || 'unknown'}</p>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-300 py-2">
                                    <strong className="mr-2">Dated</strong>
                                    <p>{selectedArtwork.dated || selectedArtwork.accessionYear || 'unknown'}</p>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-300 py-2 overflow-x-auto max-h-16">
                                    <strong className="mr-2">Contact</strong>
                                    <p className="whitespace-nowrap">{selectedArtwork.contact || 'unknown'}</p>
                                </div>
                                <div className="flex justify-between items-center border-b border-gray-300 py-2 overflow-x-auto max-h-16">
                                    <strong className="mr-2">Provenance</strong>
                                    <p className="whitespace-nowrap">{selectedArtwork.provenance || 'unknown'}</p>
                                </div>
                            </div>
                            <div className="mt-12 text-center">
                            <button 
                            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
                            disabled={alreadyAdded}
                            onClick={() => handleClick(selectedArtwork)}>
                            {alreadyAdded ? 'Added to collection' : 'Add to collection'}
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
