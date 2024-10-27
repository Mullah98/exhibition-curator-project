'use client'
import { useState } from "react";
import GalleryOverview from "./components/galleryOverview";

export default function Home() {
  const [isEntered, setIsEntered] = useState(false);

  const handleEnterClick = () => {
    setIsEntered(true);
  };

  return (
    <div className="flex flex-col items-center justify-start">
      {!isEntered && (
        <div className="flex flex-col items-center justify-center min-h-screen text-center pb-12">
          <h1 className="text-4xl sm:text-8xl font-medium font-serif transition-opacity duration-700 transform translate-y-4 opacity-100 animate-fade-in">
            Welcome to Exhibit Ease
          </h1>
          <button
            onClick={handleEnterClick}
            className="mt-4 px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-400">
            Enter
          </button>
        </div>
      )}
      {isEntered && <GalleryOverview title="Exhibit Ease" />}
    </div>
  );
}
