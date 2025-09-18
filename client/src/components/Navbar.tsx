
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export function Navbar() {
    
    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <div className="flex items-center justify-center gap-18 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white">
                
                <Link to='/' className="text-xl sm:text-2xl font-extrabold whitespace-nowrap bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 text-transparent bg-clip-text flex items-center gap-1 sm:gap-2">
                    <span className="text-2xl sm:text-3xl"></span>
                    Documind
                </Link>

                <div className="hidden sm:flex items-center gap-8">
                    <a href="#features" className="text-sm text-black hover:text-purple-300 transition-colors">
                        Features
                    </a>
                    <a href="#pricing" className="text-sm text-black hover:text-purple-300 transition-colors">
                        Pricing
                    </a>
                </div>
                <Link to='/dashboard'>
                    <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm"
                >
                    
                    Dashboard
                </Button>
                </Link>
                

                
            </div>
        </div>
    );
}