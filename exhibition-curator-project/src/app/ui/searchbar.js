'use client'

import { useState } from "react"

export default function SearchBar({search, setSearch, handleFilter}) {
    const classifications = ['Drawings', 'Prints', 'Photographs', 'Paintings']
    const culture = ['British', 'American', 'Italian', 'Spanish', 'German', 'Japanese', 'Arabian', 'Greek', 'Chinese', 'Korean']
    const century = ['16th century', '17th century', '18th century', '19th century', '20th century']

    const [dropdown1, setDropdown1] = useState('');
    const [dropdown2, setDropdown2] = useState('');
    const [dropdown3, setDropdown3] = useState('');
    const [dropdown4, setDropdown4] = useState('');
    const [dropdown5, setDropdown5] = useState('');
    const [clickFilterBtn, setClickFilterBtn] = useState(false)

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const applyFilter = () => {
        handleFilter(dropdown1, dropdown2, dropdown3)
    }

    return (
        <div className="flex flex-col items-center w-full mx-auto pt-12">
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
            filter</button>

            {clickFilterBtn && (
            <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-6 sm:gap-4">
                <select 
                value={dropdown1} 
                onChange={(e) => setDropdown1(e.target.value)} 
                className="w-64 p-2 mb-1 sm:mb-0 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Classification</option>
                {classifications.map((value, i) => (
                    <option key={i} value={value}>{value}</option>
                ))}
                </select>

                <select 
                value={dropdown2} 
                onChange={(e) => setDropdown2(e.target.value)} 
                className="w-64 p-2 mb-1 sm:mb-0 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Culture</option>
                {culture.map((value, i) => (
                    <option key={i} value={value}>{value}</option>
                ))}
                </select>

                <select 
                value={dropdown3} 
                onChange={(e) => setDropdown3(e.target.value)} 
                className="w-64 p-2 mb-1 sm:mb-0 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Century</option>
                {century.map((value, i) => (
                    <option key={i} value={value}>{value}</option>
                ))}
                </select>

                <select 
                value={dropdown4} 
                onChange={(e) => setDropdown4(e.target.value)} 
                className="w-full p-2 mb-1 sm:mb-0 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                </select>

                <select 
                value={dropdown5} 
                onChange={(e) => setDropdown5(e.target.value)} 
                className="w-full p-2 mb-1 sm:mb-0 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                </select>

                <button className="rounded bg-gray-500" onClick={applyFilter}>Apply filter</button>
            </div>
            )}

        </div>
    )
}