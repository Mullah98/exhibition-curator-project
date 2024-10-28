const harvard_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const fetchImagesFromHarvard = async() => {
    const url = `https://api.harvardartmuseums.org/object?apikey=${harvard_API_KEY}&size=150&classification=Drawings`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const objectsWithImages = data.records.filter(record => record.imagecount > 0); 
        return objectsWithImages
    } catch (error) {
        console.log('No response', error);
    }
}

export const fetchImagesFromHarvardByDepartment = async (classification, culture, century, technique, medium) => {
    let url = `https://api.harvardartmuseums.org/object?apikey=${harvard_API_KEY}`

    if (classification) {
        url += (`&classification=${encodeURIComponent(classification)}`)
    }

    if (culture) {
        url += (`&culture=${culture}`)
    }

    if (century) {
        url += (`&century=${encodeURIComponent(century)}`)
    }

    if (technique) {
        url += (`&technique=${encodeURIComponent(technique)}`)
    }

    if (medium) {
        url += (`&medium=${encodeURIComponent(medium)}`)
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Bad request')
        }
        const data = await response.json();
        const artworks = data.records.filter(record => record.imagecount > 0 && record.primaryimageurl)
        return artworks
    } catch (error) {
        console.log('No response', error);
        
    }
}

export const SearchImagesFromHarvard = async(query) => {
    let url = `https://api.harvardartmuseums.org/object?apikey=${harvard_API_KEY}&q=${query}`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Bad req')
        }
        const data = await response.json();
        const artworks = data.records
        .filter(record => record.primaryimageurl && record.primaryimageurl !== "" | null)
        return artworks
    } catch (error) {
        console.log('No response', error)
        return []
    }
}