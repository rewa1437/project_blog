import Navbar from "@/app/components/Navbar";
export default function manage() {
    return (
        <div >
             <Navbar />
            <div className="h-screen flex justify-center items-center bg-gray-50">
                <p className="text-[100px] font-bold text-center text-gray-800">Coming Soon</p>
            </div>
            <footer className="text-center p-4 mt-8 text-gray-500 text-sm">
                © 2025, Microfinance
            </footer>
        </div>
    );
}