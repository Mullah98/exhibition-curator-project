'use client'
import { useState } from "react"
import { searchImagesFromMet } from "../utils/metApi";

export default function SearchBar2({search, setSearch, handleFilter, setFilteredArtworks, setLoading}) {
    const material = ['Acrylic', 'Albums', 'Beads', 'Books', 'Bronze', 'Canvas', 'Ceramics', 'Chalk', 'Charcoal', 'Clay', 'Costume', 'Cups', 'Drawings', 'Engraving', 'Figures', 'Gold', 'Glazing', 'Illuminated manuscripts', 'Ink', 'Limestone', 'Oil', 'Oil paintings', 'Paintings', 'Prints', 'Textiles', 'Watercolors', 'Wood']
    const department = ['The American Wing', 'Arms and Armor', 'Asian Art', 'Drawings and Prints', 'Egyptian Art', 'European Paintings', 'Islamic Art', 'Medieval Art', 'Musical Instruments', 'Photographs', 'Robert Lehman Collection']
    const culture = ['African', 'American', 'Arab', 'British', 'Chinese', 'Dutch', 'Egyptian', 'French', 'German', 'Greek', 'Indian', 'Indigenous', 'Italian', 'Japanese', 'Korean', 'Mexican', 'Persian', 'Russian', 'Spanish']
    const [dropdown1, setDropdown1] = useState('');
    const [clickFilterBtn, setClickFilterBtn] = useState(false)

    const handleChange = async (e) => {
        setSearch(e.target.value)

        if (e.target.value && e.target.value.length >= 3) {
            setLoading(true)
            const results = await searchImagesFromMet(e.target.value)
            console.log(results);
            setFilteredArtworks(results)
            setLoading(false)
        } else {
            setFilteredArtworks([])
            return;
        }
    }

    const applyFilter = () => {
        handleFilter(dropdown1)
    }

    const handleClearButton = () => {
        setDropdown1('')
    }
  
    return (
        <div className="flex flex-col items-center w-full pt-12 pb-8">
            <input 
                type="text" 
                placeholder="search..." 
                value={search} 
                onChange={handleChange} 
                className="w-3/4 sm:w-2/4 p-2 mb-4 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
            </input>

            <button 
                onClick={() => setClickFilterBtn(prev => !prev)}
                className="bg-gray-100 hover:bg-gray-200 p-2 my-4 font-semibold rounded transition-colors duration-300">
                filter
            </button>
    
            {clickFilterBtn && (
                <div className={`w-full sm:w-auto flex flex-col gap-4 ${clickFilterBtn ? 'slide-down' : 'slide-up'}`}>

                    <div className="flex flex-wrap gap-2 justify-center p-2">
                        <button className="w-40 p-2 text-white whitespace-nowrap rounded bg-gray-500 hover:text-black hover:bg-gray-300" onClick={handleClearButton}>Clear</button>
                        <button className="w-40 p-2 text-white whitespace-nowrap rounded bg-gray-500 hover:text-black hover:bg-gray-300" onClick={applyFilter}>Apply filter</button>
                    </div>
    
                    <div className="flex flex-wrap gap-2 justify-center">
                        <select 
                            value={dropdown1} 
                            onChange={(e) => setDropdown1(e.target.value)} 
                            className="w-34 sm:w-52 p-2 mb-1 text-center border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
                            <option value="">Material</option>
                            {material.map((value, i) => (
                                <option key={i} value={value}>{value}</option>
                            ))}
                        </select>
                        <select 
                            value={dropdown1} 
                            onChange={(e) => setDropdown1(e.target.value)} 
                            className="w-34 sm:w-52 p-2 mb-1 text-center border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
                            <option value="">Culture</option>
                            {culture.map((value, i) => (
                                <option key={i} value={value}>{value}</option>
                            ))}
                        </select>
                        <select 
                            value={dropdown1} 
                            onChange={(e) => setDropdown1(e.target.value)} 
                            className="w-34 sm:w-52 p-2 mb-1 text-center border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
                            <option value="">Department</option>
                            {department.map((value, i) => (
                                <option key={i} value={value}>{value}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
    
}