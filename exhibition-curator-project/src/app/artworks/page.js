'use client'
import { useEffect, useState } from "react"
import SearchBar from "../ui/searchbar"
import { fetchImagesFromHarvard } from "../utils/apiFunctions"
import LoadingSpinner from "../ui/loading"

export default function Artworks() {
    const [allArtworks, setAllArtworks] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAllArtworks = async() => {
            const response = await fetchImagesFromHarvard();
            if (Array.isArray(response)) {
                setAllArtworks(response)
                setLoading(false)
            }
        }
        getAllArtworks()
    }, [])

    console.log(allArtworks);
    // console.log(search);
    

    return (
        <>
        <SearchBar searchTerm={search} setSearch={setSearch}/>
        {allArtworks ? (
            <div>
            {allArtworks.map(art => (
                <div key={art.id}>{art.title}</div>
            ))}
            </div>
        ) : <div><LoadingSpinner /></div>}
        </>
    )
}