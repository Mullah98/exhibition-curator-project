import GalleryOverview from "./components/galleryOverview";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen">
    <h1 className="m-16 text-6xl font-medium font-serif">Welcome to Exhibit Ease</h1>
      <GalleryOverview />
    </div>
  );
}
