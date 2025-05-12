import React, { useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import Loader from './Loader';

const SearchSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle search function
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);  // Reset error

        try {
            const response = await axios.get(`/api/influencer/search?query=${searchTerm}`);
            setResults(response.data);  // Store the search results
        } catch (err) {
            setError('No influencers found');
        } finally {
            setLoading(false);
        }
    };

    // Real-time search functionality as the user types
    const handleChange = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term.length > 2) {  // Start searching after at least 3 characters
            setLoading(true);
            setError(null);  // Reset error
            try {
                const response = await axios.get(`/api/influencer/search?query=${term}`);
                setResults(response.data);  // Store the search results
            } catch (err) {
                setResults([]);  // Clear results if no matches found
            } finally {
                setLoading(false);
            }
        } else {
            setResults([]);  // Clear results if search term is too short
        }
    };

    return (
        <section className="py-8 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Search Influencer by Name</h2>
                </div>

                {/* Search form */}
                <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Enter influencer's name"
                            value={searchTerm}
                            onChange={handleChange}  // Real-time search
                            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <button
                            type="submit"
                            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 flex items-center"
                        >
                            <Search size={18} className="mr-2" />
                            Search
                        </button>
                    </div>
                </form>

                {/* Loading or error message */}
                {loading && <Loader/>}
                {error && <p className="text-red-500">{error}</p>}

                {/* Display search results */}
                <ul className="mt-4">
                    {results.length > 0 ? (
                        results.map((influencer) => (
                            <li key={influencer._id} className="bg-white p-4 mb-4 rounded-xl shadow-md flex items-center gap-4">
                                {/* Influencer profile image */}
                                <img
                                    src={influencer.profilePic}
                                    alt={influencer.name}
                                    className="w-20 h-20 rounded-full object-cover border-2 border-teal-500"
                                />

                                {/* Influencer details */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{influencer.name}</h3>
                                    <p className="text-gray-600">
                                        <span className="font-medium text-teal-600">@{influencer.instagram_handle}</span>
                                    </p>
                                    <p className="text-sm text-gray-500">📍 {influencer.location}</p>
                                    <p className="text-sm text-gray-500">🎯 Niche: {influencer.niche}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No influencers found</p>
                    )}
                </ul>
            </div>
        </section>
    );
};

export default SearchSection;
