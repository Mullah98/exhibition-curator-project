import GalleryOverview from "./components/galleryOverview";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
    <h1 className="m-16 text-7xl font-medium font-serif transition-opacity duration-700 transform translate-y-4 opacity-0 animate-fade-in">
    Welcome to Exhibit Ease
    </h1>
    <GalleryOverview />
    </div>
  );
}
