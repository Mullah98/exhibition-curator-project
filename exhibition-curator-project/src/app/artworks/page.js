'use client'
import { useEffect, useState } from "react"
import SearchBar from "../ui/searchbar"
import { fetchImagesFromHarvard } from "../utils/apiFunctions"
import LoadingSpinner from "../ui/loading"
import Card from "../components/card"

export default function Artworks() {
    const [allArtworks, setAllArtworks] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAllArtworks = async() => {
            try {
                const response = await fetchImagesFromHarvard();
                if (Array.isArray(response)) {
                    const data = response?.filter(resp => resp.primaryimageurl !== "" | null)
                    setAllArtworks(data)
                }
            } catch(error) {
                console.log('Cant get all artworks', error);
            } finally {
                setLoading(false)
            }
        };
        getAllArtworks()
    }, [])


    return (
        <>
        <SearchBar searchTerm={search} setSearch={setSearch}/>
        <div className="flex justify-center">
        {loading ? (
            <LoadingSpinner />
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 p-8 max-w-screen-xl">
            {allArtworks.map(art => (
                <Card key={art.id} image={art.primaryimageurl} title={art.title} />
            ))}
            </div>
        )}
        </div>
        </>
    )
}