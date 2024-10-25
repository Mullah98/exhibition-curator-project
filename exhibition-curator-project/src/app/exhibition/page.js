'use client'
import { useEffect, useState } from "react";

export default function Exhibition() { 
        const [stored, setStored] = useState([])   

        useEffect(() => {
            const collection = JSON.parse(localStorage.getItem('artworks')) || [];
            setStored(collection)
        }, [])

        // useEffect(() => {
        //     const timer = setTimeout(() => {
        //         localStorage.clear()
        //         window.location.reload();
        //     }, 5000)

        //     return () => clearTimeout(timer)
        // })

    
    return (
        <div className="flex justify-center">
        <h1 className="text-3xl">Total number of items: {stored.length}</h1>
        {stored.map((item) => (
            <div key={item.id}>
            <h3>{item.id}</h3>
            <h4>{item.title}</h4>
            </div>
        ))}
        </div>
    )
    
}