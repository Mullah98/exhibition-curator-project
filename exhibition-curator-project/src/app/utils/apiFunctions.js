const harvard_API_KEY = '57c592c3-71a8-4c92-bda9-a4b0215968ec';

export const fetchImagesFromHarvard = async() => {
    const url = `https://api.harvardartmuseums.org/object?apikey=${harvard_API_KEY}&size=150&classification=Drawings`;
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

export const fetchImagesFromHarvardByDepartment = async (classification, culture, century) => {
    let url = `https://api.harvardartmuseums.org/object?apikey=${harvard_API_KEY}&size=150&classification=${classification}`

    if (culture) {
        url += (`&culture=${culture}`)
    }

    if (century) {
        url += (`&century=${encodeURIComponent(century)}`)
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new error('Bad req')
        }
        const data = await response.json();
        const artworks = data.records.filter(record => record.imagecount > 0 && record.primaryimageurl)
        // console.log(url);
        
        return artworks
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
