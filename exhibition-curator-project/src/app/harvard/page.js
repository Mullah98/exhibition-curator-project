'use client'
import { useEffect, useState } from "react"
import SearchBar from "../ui/searchbar"
import { fetchImagesFromHarvard, fetchImagesFromHarvardByDepartment } from "../utils/harvardApi"
import Card from "../ui/card"
import LoadingCard from "../ui/loadingcard"
import Modal from "../ui/modal"

export default function HarvardArtworks() {
    const [allArtworks, setAllArtworks] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [selectedArtwork, setSelectedArtwork] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [sortOption, setSortOption] = useState('')

    const sortingOptions = [
        { label: 'Title A-Z', value: 'title-a-z' },
        { label: 'Title Z-A', value: 'title-z-a' },
        { label: 'Oldest', value: 'oldest' },
        { label: 'Newest', value: 'newest' },
        { label: 'Artist A-Z', value: 'artist-a-z' },
        { label: 'Artist Z-A', value: 'artist-z-a' },
    ];


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
                console.log('Cannot get all artworks from Harvard museum', error);
            }
        };
        getAllArtworks()
    }, [])

    useEffect(() => {
        const sortedArtworks = () => {
            const sorted = [...(searchResults.length > 0 ? searchResults : allArtworks)];

            if (sortOption === 'oldest') {
                sorted.sort((a, b) => a.accessionyear - b.accessionyear);
            } else if (sortOption === 'newest') {
                sorted.sort((a, b) => b.accessionyear - a.accessionyear);
            } else if (sortOption === 'title-a-z') {
                sorted.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sortOption === 'title-z-a') {
                sorted.sort((a, b) => b.title.localeCompare(a.title));
            } else if (sortOption === 'artist-a-z') {
                sorted.sort((a, b) => {
                    const artistA = (a.people && a.people[0]?.displayname) || "";
                    const artistB = (b.people && b.people[0]?.displayname) || "";
                    return artistA.localeCompare(artistB);
                });
            } else if (sortOption === 'artist-z-a') {
                sorted.sort((a, b) => {
                    const artistA = (a.people && a.people[0]?.displayname) || "";
                    const artistB = (b.people && b.people[0]?.displayname) || "";
                    return artistB.localeCompare(artistA);
                });
            }

            return sorted;
        };
        
        const sorted = sortedArtworks();       
        setAllArtworks(sorted);
    }, [sortOption, searchResults]);
    const handleFilter = async (classification, culture, century, technique, medium) =>{
        const filtered = await fetchImagesFromHarvardByDepartment(classification, culture, century, technique, medium)
        setAllArtworks(filtered)
    }

    const handleSort = (e) => {
        setSortOption(e.target.value)
    }

    return (
        <>
        <SearchBar searchTerm={search} setSearch={setSearch} handleFilter={handleFilter} setFilteredArtworks={setSearchResults} />
        <div className="flex flex-col sm:flex-row justify-center items-center p-2 text-lg">
                <span>
                    Showing <span className="font-semibold mx-1">{allArtworks.length}</span> objects
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