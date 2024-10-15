const harvard_API_KEY = '57c592c3-71a8-4c92-bda9-a4b0215968ec';

export const fetchImagesFromHarvard = async() => {
    const url = `https://api.harvardartmuseums.org/object?apikey=${harvard_API_KEY}&size=100&classification=Drawings`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const objectsWithImages = data.records.filter(record => record.imagecount > 0); 
        // console.log('Obj from api:', objectsWithImages);
        return objectsWithImages
    } catch (error) {
        console.log('No response', error);
    }
}

// export const fetchPromises = () => {
//     const objectIDs = [317877, 438003, 551786, 436492, 472562] 
  
//     return Promise.all(
//       objectIDs.map(id =>
//         fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
//           .then(response => response.json())
//       )
//     );
//   };
