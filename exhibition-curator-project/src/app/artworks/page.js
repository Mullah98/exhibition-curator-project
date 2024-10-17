'use client'
import { useEffect, useState } from "react"
import SearchBar from "../ui/searchbar"
import { fetchImagesFromHarvard } from "../utils/apiFunctions"
// import LoadingSpinner from "../ui/loading"
import Card from "../ui/card"
import LoadingCard from "../ui/loadingcard"
import Modal from "../ui/modal"

export default function Artworks() {
    const [allArtworks, setAllArtworks] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [selectedArtwork, setSelectedArtwork] = useState([])

    useEffect(() => {
        const getAllArtworks = async() => {
            try {
                const response = await fetchImagesFromHarvard();
                if (Array.isArray(response)) {
                    const data = response?.filter(resp => resp.primaryimageurl && resp.primaryimageurl !== "" || null)
                    setAllArtworks(data)
                    setLoading(false)
                }
            } catch(error) {
                console.log('Cant get all artworks', error);
            }
        };
        getAllArtworks()
    }, [])

    const handleShowModal = (artwork) => {
        setSelectedArtwork(artwork)
        setShowModal(!showModal)        
    }    
    
    return (
        <>
        <SearchBar searchTerm={search} setSearch={setSearch}/>
        <div className="flex justify-center">
        {loading ? (
            <LoadingCard />
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 p-8 max-w-screen-xl">
            {allArtworks.map(art => (
                <Card key={art.id} image={art.primaryimageurl} title={art.title} handleShowModal={() => handleShowModal(art)} />
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