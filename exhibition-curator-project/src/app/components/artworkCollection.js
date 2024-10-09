import { useEffect } from "react"

export default function ArtworkCollection() {

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const collections = await getCollections();
                if (collections) {
                    console.log(collections);
                }
            } catch(error) {
                console.log(error);
                
            }
        };
        fetchCollections();
    }, [])
    return (
        <div>
            <h1>Explore a range of collectionss</h1>
        </div>
    )
}


//division & department