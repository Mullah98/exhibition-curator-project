'use client'
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="flex items-center justify-center p-8 bg-gray-800 text-white">
            <button className="block md:hidden focus:outline-none" onClick={toggleMenu}>
                {isOpen ? 'X' : '☰'}
            </button>
            <ul className={`md:flex md:space-x-12 ${isOpen ? 'block' : 'hidden'} absolute md:static bg-gray-800 md:bg-transparent w-full md:w-auto top-14 md:top-auto text-center text-2xl z-20`}>
                <li className="py-2 hover:underline">
                    <Link href="/" className="block">Home</Link>
                </li>
                <li className="py-2 hover:underline">
                    <Link href="/harvard" className="block">Harvard Artworks</Link>
                </li>
                <li className="py-2 hover:underline">
                    <Link href="/met" className="block">MET Artworks</Link>
                </li>
                <li className="py-2 hover:underline">
                    <Link href="/exhibition" className="block">Exhibition</Link>
                </li>
            </ul>
        </nav>
    )
}