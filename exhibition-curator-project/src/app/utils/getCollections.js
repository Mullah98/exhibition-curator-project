const fetchCollectionsFromHarvard = async (ids, api) => {
    const harvardUrl = 'https://api.harvardartmuseums.org/object';
    const promiseArray = ids.map(id => fetch(`${harvardUrl}/${id}?apikey=${api}`));
    const promiseResults = await Promise.all(promiseArray);
    const result = await Promise.all(promiseResults.map(response => response.json()));
    return result
    .filter(record => record.primaryimageurl && record.primaryimageurl !== "" | null)
    .map(record => ({id: record.id, image: record.primaryimageurl, department: record.department}))
}

const fetchCollectionsFromMet = async (ids, url) => {
    const promiseArray = ids.map(id => fetch(`${url}/${id}`));
    const promiseResults = await Promise.all(promiseArray);
    const result = await Promise.all(promiseResults.map(response => response.json()));
    return result
    .filter(record => record.primaryImageSmall && record.primaryImageSmall !== "" | null)
    .map(record => ({id: record.objectID, image: record.primaryImage || record.primaryImageSmall, department: record.department}))
}

export const getCollections = async () => {
    const harvardIds = [202279, 311236, 6877, 230326];
    const metIds = [467828, 459618, 35928, 449005, 471988]; 
    const harvard_API_KEY = '57c592c3-71a8-4c92-bda9-a4b0215968ec';
    const metUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';
    try {
        const [harvardCollection, metCollection] = await Promise.all([
            fetchCollectionsFromHarvard(harvardIds, harvard_API_KEY),
            fetchCollectionsFromMet(metIds, metUrl),
        ]);         
        return [...harvardCollection, ...metCollection]
    } catch(error) {
        console.log(error);
        
    }
}