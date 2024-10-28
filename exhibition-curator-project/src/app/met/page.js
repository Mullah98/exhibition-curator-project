'use client'

import { useEffect, useState } from "react"
import { fetchImagesFromMet } from "../utils/metApi"
import LoadingCard from "../ui/loadingcard"
import Card from "../ui/card"
import Modal from "../ui/modal"

export default function MetArtworks() {
    const [allArtworks, setAllArtworks] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [selectedArtwork, setSelectedArtwork] = useState([])

    useEffect(() => {
        const getAllArtworks = async() => {
            try {
                const response = await fetchImagesFromMet();
                if (Array.isArray(response)) {
                    const data = response?.filter(resp => resp.primaryImage && resp.primaryImage !== "" || null)
                    .map(record => ({...record, id: record.objectID}))
                    setAllArtworks(data)
                    setLoading(false)
                }
            } catch (error) {
                console.log('Cannot get all artworks from MET museum')
            }
        };
        getAllArtworks();
    }, [])

    const handleShowModal = (artwork) => {
        setSelectedArtwork(artwork)
        setShowModal(!showModal)        
    }

    // console.log(allArtworks);
    

    return (
        <>
        <div className="flex justify-center align-center p-2 text-lg">
        Showing <span className="font-semibold mx-1">{allArtworks.length}</span> objects
        </div>
        <div className="flex justify-center">
            {loading ? (
                <LoadingCard />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 p-8 max-w-screen-xl">
                {allArtworks.map(art => (
                    <Card key={art.objectID} image={art.primaryImage} title={art.title} handleShowModal={() => handleShowModal(art)} />
                ))}
                </div>
            )}
            {showModal &&
            <Modal handleShowModal={handleShowModal} selectedArtwork={selectedArtwork} />
            }
        </div>
        </>
    )
}