'use client'
import { useEffect, useState } from "react"
import SearchBar from "../ui/searchbar"
import { fetchImagesFromHarvard, fetchImagesFromHarvardByDepartment } from "../utils/apiFunctions"
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
                console.log('Cannot get all artworks', error);
            }
        };
        getAllArtworks()
    }, [])

    const handleShowModal = (artwork) => {
        setSelectedArtwork(artwork)
        setShowModal(!showModal)        
    }

    const handleFilter = async (classification, culture, century, technique, medium) =>{
        const filtered = await fetchImagesFromHarvardByDepartment(classification, culture, century, technique, medium)
        setAllArtworks(filtered)
    }

    console.log('Artworks:', allArtworks);    
    // console.log('Division', allArtworks.map(art => art.division));
    // console.log('Medium', allArtworks.map(art => art.medium));
    
    
    
    return (
        <>
        <SearchBar searchTerm={search} setSearch={setSearch} handleFilter={handleFilter} />
        <div className="flex justify-center align-center p-4">Showing {allArtworks.length} objects</div>
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