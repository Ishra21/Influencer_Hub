import React, { useEffect } from 'react'
import { MapPin, Users, TrendingUp, Award, Instagram } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfluencers } from '../Features/influencers/influencerSlice';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';

const TopInfluencer = () => {

    const { influencers, isLoading, isError, message } = useSelector(state => state.influencer)

    const dispatch = useDispatch()


    useEffect(() => {
        // console.log("Influencers List")
        dispatch(getInfluencers())
    }, [dispatch])


    if (isError && message) {
        toast.error(message, { position: "top-center" })
    }

    if (isLoading) {
        <Loader />
    }

    if(!influencers || influencers.length === 0) {
        return (
        <p className='text-center text-2xl my-10 text-gray-400'>No Influencer found</p>
        )
    }


    return (
        <>
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Top Influencers</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Connect with our featured influencers who have proven success in engaging audiences and driving results for brands.
                        </p>
                    </div>



                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                            <Award className="text-yellow-500 mr-2" size={20} />
                            All Influencers
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                            {
                                influencers.map((influencer) => (
                                    <div key={influencer._id}
                                        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                                    >
                                        <div className="relative h-60 bg-gray-200">
                                            <img src={influencer.profilePic}
                                                className="w-full h-full object-cover"
                                            />
                                            {/* <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                Featured
                                            </div> */}
                                        </div>

                                        <div className="p-5">
                                            <h3 className="font-bold text-xl mb-2 text-gray-800">{influencer.name}</h3>

                                            <div className="flex items-center text-gray-600 mb-2">
                                                <MapPin size={16} className="mr-1" />
                                                <span>{influencer.location}</span>
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                    {influencer.niche}
                                                </span>
                                            </div>

                                            <div className="flex justify-between text-sm">
                                                <div className="flex items-center">
                                                    <Users size={16} className="text-gray-500 mr-1" />
                                                    <span className="font-medium">{influencer.followers}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Instagram size={16} className="text-gray-500 mr-1" />
                                                    <span className="font-medium">{influencer.instagram_handle}</span>
                                                </div>
                                            </div>

                                            <Link to={`/influencer/${influencer._id}`}>
                                                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md mt-4 transition-colors">
                                                    View Profile
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                    {/* All Other Influencers */}
                    {/* <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">All Influencers</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                            <div

                                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="relative h-60 bg-gray-200">
                                    <img
                                        src='#image'
                                        alt='Image'
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-5">
                                    <h3 className="font-bold text-xl mb-2 text-gray-800">Name</h3>

                                    <div className="flex items-center text-gray-600 mb-2">
                                        <MapPin size={16} className="mr-1" />
                                        <span>Location</span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            Niche
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <div className="flex items-center">
                                            <Users size={16} className="text-gray-500 mr-1" />
                                            <span className="font-medium">Followers</span>
                                        </div>
                                        <div className="flex items-center">
                                            <TrendingUp size={16} className="text-gray-500 mr-1" />
                                            <span className="font-medium">% Engagement</span>
                                        </div>
                                    </div>

                                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md mt-4 transition-colors">
                                        View Profile
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div> */}

                </div>
            </section>


        </>
    )
}

export default TopInfluencer