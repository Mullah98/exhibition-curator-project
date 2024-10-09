const harvard_API_KEY = '57c592c3-71a8-4c92-bda9-a4b0215968ec';

const fetchImagesFromHarvard = async (url) => {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    return result
    
}

const fetchImagesFromMet = async (url) => {
    const response = await fetch(url)
    const result = await response.json();
    console.log(result);
    return result;
}

const getCollections = async () => {
    const harvardUrl = `https://api.harvardartmuseums.org/object?apikey=${harvard_API_KEY}&size=6&classification=Paintings`
    const metUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';
    try {
        const [harvardImages, metImages] = await Promise.all([
            fetchImagesFromHarvard(harvardUrl),
            fetchImagesFromMet(metUrl),
        ]);        
        return [...harvardImages, ...metImages];
    } catch(error) {
        console.log('Unable to get images', error);
    }
}