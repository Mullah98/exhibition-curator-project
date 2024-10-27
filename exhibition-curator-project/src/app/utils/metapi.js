
// export const fetchPromises = () => {
//     const objectIDs = [317877, 438003, 551786, 436492, 472562] 
  
//     return Promise.all(
//       objectIDs.map(id =>
//         fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
//           .then(response => response.json())
//       )
//     );
//   };


// export const fetchImagesFromMET = async() => {
//     const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects`;
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         const objectsWithImages = data.records.filter(record => record.imagecount > 0); 
//         return objectsWithImages
//     } catch (error) {
//         console.log('No response', error);
//     }
// }

const fetchImagesFromMet = async (ids, url) => {
    const promiseArray = ids.map(id => fetch(`${url}/${id}`));
    const promiseResults = await Promise.all(promiseArray);
    const result = await Promise.all(promiseResults.map(response => response.json()));
    return result
    .filter(record => record.primaryImageSmall && record.primaryImageSmall !== "" | null)
    .map(record => ({...record, id: record.objectID, image: record.primaryImageSmall})) 
}

export const getImagesForMetArtworks = async() => {
    const ids = [317877, 438003, 436492];
    const metUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';
    try {
        const metImages = await Promise.all([
            fetchImagesFromMet(ids, metUrl),
        ]);
        console.log('from api', metImages);
                
        return metImages;
    } catch(error) {
        console.log('Unable to get images', error);
    }
}
