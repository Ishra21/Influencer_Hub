import React from 'react';
import { Home, ArrowLeft, RefreshCw, Search, Map, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
            <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8">
                <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
                    <div className="space-y-8">
                        {/* Animation Section */}
                        <div className="relative h-40 md:h-48 flex items-center justify-center">
                            <div className="absolute w-40 h-40 bg-teal-50 rounded-full animate-pulse"></div>

                            <div className="relative z-10 flex items-center justify-center">
                                <div className="absolute animate-float">
                                    <Search
                                        size={48}
                                        className="text-teal-500"
                                        strokeWidth={1.5}
                                    />
                                </div>

                                <div className="absolute -left-12 -top-4 animate-float-delay-1">
                                    <Map
                                        size={28}
                                        className="text-slate-400"
                                        strokeWidth={1.5}
                                    />
                                </div>

                                <div className="absolute right-[-20px] top-6 animate-float-delay-2">
                                    <Compass
                                        size={24}
                                        className="text-slate-400"
                                        strokeWidth={1.5}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-7xl font-bold text-slate-800">
                                4<span className="text-teal-500">0</span>4
                            </h1>

                            <h2 className="text-2xl md:text-3xl font-semibold text-slate-700">
                                Page Not Found
                            </h2>

                            <p className="text-slate-600 max-w-lg mx-auto">
                                The page you're looking for doesn't exist or has been moved.
                                Don't worry, you can find your way back to our amazing content.
                            </p>
                        </div>

                        {/* Actions Section */}
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                            <Link to={"/"}
                                className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full md:w-auto"
                            >
                                <Home size={20} />
                                <span>Go Home</span>
                            </Link>

                            <button
                                className="flex items-center gap-2 border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full md:w-auto"
                                onClick={() => window.history.back()}
                            >
                                <ArrowLeft size={20} />
                                <span>Go Back</span>
                            </button>

                            <button
                                className="flex items-center gap-2 border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full md:w-auto"
                                onClick={() => window.location.reload()}
                            >
                                <RefreshCw size={20} />
                                <span>Reload</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound