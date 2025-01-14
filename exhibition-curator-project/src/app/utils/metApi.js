const fetchMetIds = async () => {
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Auguste%20Renoir'
    try {
        const response = await fetch(url);
        const data = await response.json();        
        const objectIds = data.objectIDs.slice(0, 100);
        return objectIds
    } catch(error) {
        console.log('Unable to fetch objectIds from Met', error)
    }
}

const fetchPromises = async (ids, url) => {
    const promiseArray = ids.map(id => fetch(`${url}/${id}`));
    const promiseResults = await Promise.all(promiseArray);
    const result = await Promise.all(promiseResults.map(response => response.json()));
    return result
    .filter(record => record.primaryImage && record.primaryImage !== "" || null)
}

export const fetchImagesFromMet = async() => {
    const metUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';
    try {
        const ids = await fetchMetIds();
        if (!ids) return;
        const metImages = await fetchPromises(ids, metUrl)
        return metImages;
    } catch(error) {
        console.log('Unable to get images', error);
    }
}


export const searchImagesFromMet = async (query) => {
    let url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(query)}`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Bad req')
        }
        const data = await response.json();
        const objectIds = data.objectIDs.slice(0, 50)

        if (objectIds.length > 0) {
            const artworks = await fetchPromises(objectIds, 'https://collectionapi.metmuseum.org/public/collection/v1/objects')
            return artworks
        } else {
            return [];
        }
    } catch (error) {
        console.log('No response', error)
        return []
    }
}