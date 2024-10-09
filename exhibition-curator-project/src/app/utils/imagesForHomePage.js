const harvard_apiKey = '57c592c3-71a8-4c92-bda9-a4b0215968ec';


const fetchImagesFromHarvard = async(url) => {
    const response = await fetch(url);
    const result = await response.json();
    return result.records
    .filter(record => record.primaryimageurl && record.primaryimageurl !== "" | null)
    .map(record => ({...record, image: record.primaryimageurl}))
}

const fetchImagesFromMet = async (ids, url) => {
    const promiseArray = ids.map(id => fetch(`${url}/${id}`));
    const promiseResults = await Promise.all(promiseArray);
    const result = await Promise.all(promiseResults.map(response => response.json()));
    return result
    .filter(record => record.primaryImageSmall && record.primaryImageSmall !== "" | null)
    .map(record => ({...record, id: record.objectID, image: record.primaryImageSmall})) 
}

export const getImagesForHomepage = async() => {
    const ids = [317877, 438003, 436492];
    const harvardUrl = `https://api.harvardartmuseums.org/object?apikey=${harvard_apiKey}&size=6&classification=Paintings`;
    const metUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';
    try {
        const [harvardImages, metImages] = await Promise.all([
            fetchImagesFromHarvard(harvardUrl),
            fetchImagesFromMet(ids, metUrl),
        ]);        
        return [...harvardImages, ...metImages];
    } catch(error) {
        console.log('Unable to get images', error);
    }
}

export const getSingleImage = async() => {
    const harvardUrl = `https://api.harvardartmuseums.org/object/299940?apikey=${harvard_apiKey}`;
    const response = await fetch(harvardUrl);
    const result = await response.json();
    return result
}