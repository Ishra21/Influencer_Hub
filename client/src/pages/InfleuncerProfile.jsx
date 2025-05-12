import React, { useEffect, useState } from 'react';
import {
    MapPin, Users, Instagram, ArrowLeft
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import { Link, useParams } from 'react-router-dom';
import { getInfluencer } from '../Features/influencers/influencerSlice';
import CommenSection from '../Components/admin/CommentSection';
import {
    addInfluencerBooking,
    getUserBooking,
    getUserBookings
} from '../Features/bookings/bookingSlice';

const InfluencerProfile = () => {
    const { influencer, isLoading, isSuccess, isError, message } = useSelector(state => state.influencer);
    const { userBookings, bookingsLoading, bookingsError, bookingMessage } = useSelector(state => state.booking);

    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getInfluencer(id));
        dispatch(getUserBookings()); // Ensure all user bookings are fetched first
    }, [dispatch, id]);

    useEffect(() => {
        if (userBookings.length > 0) {
            const booking = userBookings.find(b => b.influencer._id === id);
            if (booking) {
                setIsAlreadyBooked(true);
                dispatch(getUserBooking(booking._id));
            }
        }

        if ((isError && message) || (bookingsError && bookingMessage)) {
            toast.error(message || bookingMessage);
        }
    }, [userBookings, isError, message, bookingsError, bookingMessage, id, dispatch]);

    if (isLoading || bookingsLoading) {
        return <Loader />;
    }

    const handleBooking = (influencerId) => {
        if (isAlreadyBooked) {
            toast.info("Already booked");
            return;
        }
        dispatch(addInfluencerBooking(influencerId));
        setIsClicked(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto bg-white shadow-sm">
                <div className="relative h-48">
                    <img
                        src={influencer?.coverImage || 'https://images.pexels.com/photos/7130538/pexels-photo-7130538.jpeg'}
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                </div>

                <div className="relative px-6 pb-8">
                    <div className="absolute -top-16 left-6">
                        <div className="relative">
                            <img
                                src={influencer?.profilePic}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                            />
                            <div className="absolute bottom-0 right-0 bg-emerald-500 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                                <span className="text-white text-xs">✓</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-20">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{influencer?.name}</h1>
                                <div className="flex items-center text-gray-600 mt-1">
                                    <MapPin size={16} className="mr-1" />
                                    <span>{influencer?.location}</span>
                                </div>
                            </div>
                            <span className="bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
                                {influencer?.niche}
                            </span>
                        </div>

                        <div className="flex space-x-6 mb-6">
                            <div className="flex items-center">
                                <Users size={18} className="mr-2 text-indigo-600" />
                                <div>
                                    <div className="font-semibold">{influencer?.followers}</div>
                                    <div className="text-xs text-gray-500">Followers</div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Instagram size={18} className="mr-2 text-rose-500" />
                                <div>
                                    <div className="font-semibold">@{influencer?.instagram_handle}</div>
                                    <div className="text-xs text-gray-500">Instagram</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h2>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <span>Booking Amount : INR {influencer?.rate}/event</span>
                                </div>
                                <div>
                                    <p>Bio : Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                                </div>
                                <div className="flex items-center">
                                    <span>Active : {influencer?.isActive ? "true" : "false"}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={isAlreadyBooked}
                            onClick={() => handleBooking(influencer._id)}
                            className={`w-full py-4 px-6 rounded-lg font-bold text-white disabled:bg-gray-400 transition-all duration-300 transform ${isClicked
                                ? 'bg-teal-700 scale-95'
                                : isHovered
                                    ? 'bg-teal-600 shadow-lg'
                                    : 'bg-teal-500 shadow-md'
                                }`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {isAlreadyBooked ? "Already Booked" : "Request Booking"}
                        </button>

<Link to={"/"}>
<button className='flex my-4 items-center gap-2 border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full md:w-auto'>Back</button>
</Link>
                        {/* <button
                            className="flex my-4 items-center gap-2 border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full md:w-auto"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft size={20} />
                            <span>Go Back</span>
                        </button> */}
                    </div>
                </div>

                {
                    (!influencer?.isActive && !isAlreadyBooked)
                        ? (
                            <div className='flex justify-center items-center h-96'>
                                <h1 className='text-2xl font-bold text-slate-800'>
                                    Booking is not available
                                </h1>
                            </div>
                        )
                        : <CommenSection influencerId={influencer._id} />
                }
            </div>
        </div>
    );
};

export default InfluencerProfile;
