'use client'

import { useEffect, useState } from "react"
import { fetchImagesFromMet, fetchImagesFromMetByDepartment, searchImagesFromMet } from "../utils/metApi"
import LoadingCard from "../ui/loadingcard"
import Card from "../ui/card"
import Modal from "../ui/modal"
import SearchBar2 from "../ui/searchbar2"

export default function MetArtworks() {
    const [allArtworks, setAllArtworks] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [selectedArtwork, setSelectedArtwork] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [sortOption, setSortOption] = useState('')

    const sortingOptions = [
        {label: 'Oldest to Newest', value: 'oldest'},
        {label: 'Newest to Oldest', value: 'newest'},
        {label: 'Title A-Z', value: 'title-a-z'},
        {label: 'Title Z-A', value: 'title-z-a'},
        {label: 'Artist A-Z', value: 'artist-a-z'},
        {label: 'Artist Z-A', value: 'artist-z-a'}
    ]

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

    useEffect(() => {
        const sortedArtworks = () => {
            const sorted = [...(searchResults.length > 0 ? searchResults : allArtworks)];
    
            if (sortOption === 'oldest') {
                sorted.sort((a, b) => a.accessionYear - b.accessionYear)
            } else if (sortOption === 'newest') {
                sorted.sort((a, b) => b.accessionYear - a.accessionYear)
            } else if (sortOption === 'title-a-z') {
                sorted.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOption === 'title-z-a') {
                sorted.sort((a, b) => b.title.localeCompare(a.title));
            } else if (sortOption === 'artist-a-z') {
                sorted.sort((a, b) => a.artistDisplayName.localeCompare(b.artistDisplayName))
            } else if (sortOption === 'artist-z-a') {
                sorted.sort((a, b) => b.artistDisplayName.localeCompare(a.artistDisplayName))
            }
            return sorted
        };
        
        const sorted = sortedArtworks();       
        setAllArtworks(sorted)
    }, [sortOption, searchResults])

    const handleShowModal = (artwork) => {
        setSelectedArtwork(artwork)
        setShowModal(!showModal)        
    }

    const handleFilter = async (query) => {
        setLoading(true)
        const filtered = await searchImagesFromMet(query)        
        setAllArtworks(filtered)
        setLoading(false)
    }

    const handleSort = (e) => {
        setSortOption(e.target.value)
    }
            
    return (
        <>
        <SearchBar2 searchTerm={search} setSearch={setSearch} handleFilter={handleFilter} setFilteredArtworks={setSearchResults} setLoading={setLoading} />
        <div className="flex flex-col sm:flex-row justify-center items-center p-2 text-lg">
            <span>
                Showing<span className="font-semibold mx-1">{allArtworks.length}</span>objects
            </span>
            <div className="mt-2 sm:mt-0 sm:ml-2">
                <select 
                className="w-34 sm:w-52 p-2 mb-1 text-center border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                value={sortOption}
                onChange={handleSort}>
                <option value="">Sort by</option>
                {sortingOptions.map((option, i) => (
                    <option key={i} value={option.value}>{option.label}</option>
                ))}
                </select>
            </div>
        </div>
        
        <div className="flex justify-center">
            {loading ? (
                <LoadingCard />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 p-8 max-w-screen-xl">
                {(searchResults.length > 0 ? searchResults : allArtworks).map(art => (
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