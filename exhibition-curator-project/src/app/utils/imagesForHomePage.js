const harvard_apiKey = '57c592c3-71a8-4c92-bda9-a4b0215968ec';


const fetchImagesFromHarvard = async(url) => {
    const response = await fetch(url);
    const result = response.json();
    return result.records
    .filter(record => record.primaryimageurl !== null)
    .map(record => ({...record, images: record.primaryimageurl}))
}

const fetchImagesFromMet = async(ids, url) => {
    const promiseArray = ids.map(id => fetch(`${url}/${id}`));
    const results = await Promise.all(promiseArray);
    return results
    .filter(record => record.primaryImage !== null)
    .map(record => ({...record, id: record.objectID, images: primaryImage})) 
}

export const getImagesForHomepage = async() => {
    const ids = [317877, 438003, 436492];
    const harvardUrl = `https://api.harvardartmuseums.org/object?apikey=${harvard_apiKey}&size=5&classification=Prints`;
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