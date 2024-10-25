'use client'
import { useEffect, useState } from "react";

export default function Exhibition() { 
        const [stored, setStored] = useState([])   

        useEffect(() => {
            const collection = JSON.parse(localStorage.getItem('artworks')) || [];
            setStored(collection)
        }, [])


    
    return (
        <>
        {stored.map((item) => (
            <div key={item.id}>
            <h3>{item.id}</h3>
            <h4>{item.title}</h4>
            </div>
        ))}
        </>
    )
    
}