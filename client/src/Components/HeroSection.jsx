import { Search } from 'lucide-react'
import React from 'react'

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-r from-teal-900 to-teal-700 text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Connect with the Perfect Influencer for Your Brand
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-teal-100">
                        Discover and collaborate with top influencers that align with your brand values and target audience
                    </p>

                    {/* <div className="bg-white rounded-full shadow-lg flex items-center p-1 md:p-2 max-w-xl mx-auto">
                        <div className="pl-4 text-gray-500">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for influencers..."
                            className="w-full py-2 px-4 bg-transparent text-gray-800 focus:outline-none"
                        />
                        <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-full transition-colors">
                            Search
                        </button>
                    </div> */}
{/* 
                    <div className="mt-6 text-teal-100">
                        <p>Popular: Fashion, Beauty, Fitness, Travel, Food, Technology</p>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default HeroSection