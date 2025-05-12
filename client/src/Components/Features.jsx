import React from 'react'
import { Search, Filter, Users, BarChart4 } from 'lucide-react';
const Features = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Platform</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We make it easy to discover, connect, and collaborate with influencers that match your brand's needs
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                        <div
                        
                            className="bg-white p-6 rounded-lg shadow-md text-center transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="flex justify-center">
                            <Search size={40} className="text-teal-600 mb-4" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Smart Search</h3>
                            <p className="text-gray-600">Find the perfect influencer for your campaign with our advanced search tools and filters.</p>
                        </div>
                    
                        <div
                        
                        className="bg-white p-6 rounded-lg shadow-md text-center transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                        <div className="flex justify-center">
                        <BarChart4 size={40} className="text-teal-600 mb-4" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Performance Analytics</h3>
                        <p className="text-gray-600">Track campaign performance with detailed analytics and engagement metrics.
                    </p>
                    </div>

                    <div
                        
                        className="bg-white p-6 rounded-lg shadow-md text-center transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                        <div className="flex justify-center">
                        <Users size={40} className="text-teal-600 mb-4" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Verified Profiles</h3>
                        <p className="text-gray-600">All influencers are verified with authentic audience metrics and performance history.</p>
                    </div>

                    <div
                        
                        className="bg-white p-6 rounded-lg shadow-md text-center transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                        <div className="flex justify-center">
                        <Filter size={40} className="text-teal-600 mb-4" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Precise Filtering</h3>
                        <p className="text-gray-600">Filter by location, niche, audience size, and engagement rates to find exact matches.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features