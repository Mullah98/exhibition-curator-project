import { Skeleton } from "./skeleton";

export default function LoadingCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 max-w-screen-xl">
        {Array.from({ length: 8 }).map((_,index) => (
            <div key={index} className="rounded-lg overflow-hidden h-96 w-72 gap-8 p-8 max-w-screen-xl">
                <Skeleton className="h-72 w-full" />
                <div className="border-t border-gray-300 text-center p-2 w-full">
                <Skeleton className="h-4 w-3/4 mx-auto" />
                </div>
            </div> 
        ))}
    </div>
  )
}
