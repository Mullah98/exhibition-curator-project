import { OrbitProgress } from "react-loading-indicators";

export default function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center h-screen">
            <OrbitProgress 
            variant="split-disc" 
            color="#002242" 
            size="medium" 
            text="" 
            textColor="" />
        </div>
    )
}