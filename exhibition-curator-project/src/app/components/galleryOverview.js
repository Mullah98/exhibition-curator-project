'use client';
import HomeCardSlider from "./homeCardSlider";
import ArtworkCollection from "./artworkCollection";
import LoadingSpinner from "../ui/loading";
import SingleArtwork from "./singleArtwork";

export default function GalleryOverview({ title }) {
    return (
        <div className="flex flex-col items-center max-w-full lg:max-w-[1200px] mx-auto">
          <h1 className="text-7xl mt-6 font-medium font-serif transition-all duration-700 animate-fade-in">
            {title}
          </h1>
          <div className="relative align-center mt-10">
                <SingleArtwork />
            </div>
            <div className="mt-16 text-center">
                <HomeCardSlider />
            </div>
            <div className="mt-16 text-center">
                <ArtworkCollection />
            </div>
        </div>
    );
}
