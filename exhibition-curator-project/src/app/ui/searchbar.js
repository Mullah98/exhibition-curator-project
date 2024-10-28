'use client'
import { useState } from "react"
import { SearchImagesFromHarvard } from "../utils/harvardApi"

export default function SearchBar({search, setSearch, handleFilter, setFilteredArtworks}) {
    const classification = ['Armor', 'Books', 'Costume', 'Drawings', 'Frames', 'Gems', 'Jewelry', 'Manuscripts', 'Mosaics', 'Paintings', 'Photographs', 'Prints', 'Sculpture', 'Textile Arts', 'Tools and Equipment']
    const culture = ['African', 'American', 'Arab', 'British', 'Chinese', 'Dutch', 'Egyptian', 'French', 'German', 'Greek', 'Indian', 'Indigenous', 'Italian', 'Japanese', 'Korean', 'Mexican', 'Persian', 'Russian', 'Spanish']
    const century = ['13th century', '14th century', '15th century', '16th century', '17th century', '18th century', '19th century', '20th century', '21st century']
    const technique = ['20 x 24 Polaroid print', '3.5 x 4.5 Polaroid print', 'Autochrome', 'Brushwork', 'Carved', 'Collage', 'Drypoint', 'Engraved', 'Halftone print', 'Hammered', 'Ikat', 'Illuminated', 'Laser print', 'Marbled', 'Metal cut', 'Molded', 'Negative print', 'Oil gliding', 'Painted', 'Photocopy', 'Photogram', 'Polychromed', 'Positive Vandyke print', 'Rubbing', 'Salted paper print', 'Screen print', 'Screen print and collage', 'Screen print and photograph', 'Transparency', 'Velvet', 'Water gliding', 'Wood engraving', 'Xerograph', 'Zincograph']
    const medium = ['Acrylic paint', 'Amber', 'Bone', 'Carbon paper transfer', 'Cardboard', 'Ceramic', 'Chalk', 'Charcoal', 'Chocolate', 'Clay', 'Colored pencil', 'Crayon', 'Earth', 'Fiberglass', 'Glass', 'Graphite', 'Ink', 'Ink and color', 'Ink and gold', 'Leather', 'Metal', 'Mixed media', 'Oil', 'Oil pastel', 'Paper', 'Pastel', 'Rubber', 'Shell', 'Stone', 'Tape', 'Textile materials', 'Toner', 'Vanish', 'Watercolor']

    
    const [dropdown1, setDropdown1] = useState('');
    const [dropdown2, setDropdown2] = useState('');
    const [dropdown3, setDropdown3] = useState('');
    const [dropdown4, setDropdown4] = useState('');
    const [dropdown5, setDropdown5] = useState('');
    const [clickFilterBtn, setClickFilterBtn] = useState(false)

    const handleChange = async (e) => {
        setSearch(e.target.value)

        if (e.target.value) {
            const results = await SearchImagesFromHarvard(e.target.value)
            setFilteredArtworks(results)
        } else {
            setFilteredArtworks([])
            return;
        }
    }

    const applyFilter = () => {
        handleFilter(dropdown1, dropdown2, dropdown3, dropdown4, dropdown5)
    }

    const handleClearButton = () => {
        setDropdown1('')
        setDropdown2('')
        setDropdown3('')
        setDropdown4('')
        setDropdown5('')
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
                            <option value="">Classification</option>
                            {classification.map((value, i) => (
                                <option key={i} value={value}>{value}</option>
                            ))}
                        </select>
    
                        <select 
                            value={dropdown2} 
                            onChange={(e) => setDropdown2(e.target.value)} 
                            className="w-34 sm:w-52 p-2 mb-1 text-center border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400  cursor-pointer">
                            <option value="">Culture</option>
                            {culture.map((value, i) => (
                                <option key={i} value={value}>{value}</option>
                            ))}
                        </select>
    
                        <select 
                            value={dropdown3} 
                            onChange={(e) => setDropdown3(e.target.value)} 
                            className="w-34 sm:w-52 p-2 text-center mb-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400  cursor-pointer">
                            <option value="">Century</option>
                            {century.map((value, i) => (
                                <option key={i} value={value}>{value}</option>
                            ))}
                        </select>
    
                        <select 
                            value={dropdown4} 
                            onChange={(e) => setDropdown4(e.target.value)} 
                            className="w-34 sm:w-52 p-2 text-center mb-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400  cursor-pointer">
                            <option value="">Technique</option>
                            {technique.map((value, i) => (
                                <option key={i} value={value}>{value}</option>
                            ))}
                        </select>
    
                        <select 
                            value={dropdown5} 
                            onChange={(e) => setDropdown5(e.target.value)} 
                            className="w-34 sm:w-52 p-2 text-center mb-1 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400  cursor-pointer">
                            <option value="">Medium</option>
                            {medium.map((value, i) => (
                                <option key={i} value={value}>{value}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
    
}