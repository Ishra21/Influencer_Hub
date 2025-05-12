import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
            <div className="relative">
                {/* Pulse background */}
                <div className="absolute inset-0 rounded-full bg-teal-100/50 animate-ping"></div>

                {/* Main loader container */}
                <div className="relative bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center space-y-4">
                    {/* Spinning icon */}
                    <Loader2
                        className="w-12 h-12 text-teal-500 animate-spin"
                        strokeWidth={1.5}
                    />

                    {/* Loading text */}
                    <div className="space-y-2 text-center">
                        <h2 className="text-xl font-semibold text-slate-800">
                            Loading
                        </h2>
                        <p className="text-sm text-slate-600">
                            Please wait while we prepare your content
                        </p>
                    </div>

                    {/* Loading bar */}
                    <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-teal-500 rounded-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader