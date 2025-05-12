import React, { useEffect } from 'react';
import { User, Mail, CalendarDays } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import { getUserBookings } from '../Features/bookings/bookingSlice';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user, isLoading, isError, message } = useSelector((state) => state.auth);
    const { userBookings, bookingsLoading, bookingsError, bookingMessage } = useSelector((state) => state.booking);


    // console.log(userBookings)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        dispatch(getUserBookings());


        if (isError && message || bookingsError && bookingMessage) {
            toast.error(message, { position: "top-center" });
        }


    }, [user,isError, message, bookingsError, bookingMessage]);

    if (isLoading || bookingsLoading) {
        return <Loader />;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
                {/* Profile Header */}
                <div className="flex items-center space-x-4 pb-6 border-b border-slate-200">
                    <div className="bg-teal-100 p-4 rounded-full">
                        <User className="w-8 h-8 text-teal-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">{user?.name}</h1>
                        <p className="text-slate-600">Profile Overview</p>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-teal-500" />
                        <span className="text-slate-700">{user?.email}</span>
                    </div>
                </div>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Overview</h2>
                                <div className="space-y-4 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Member since</span>
                                        <span className="text-gray-900">
                                            {user?.memberSince ? new Date(user.memberSince).toLocaleDateString('en-IN') : 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Total bookings</span>
                                        <span className="text-gray-900">{userBookings.length}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-500">Upcoming bookings</span>
                                        <span className="text-gray-900">
                                            {userBookings?.filter(b => b.status === 'upcoming').length}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bookings Section */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900">Your Bookings</h2>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {userBookings.length === 0 ? (
                                        <div className="p-6 text-gray-500 text-center">No bookings found.</div>
                                    ) : (
                                        userBookings.map((booking) => (
                                            <Link
                                                key={booking._id}
                                                to={`/influencer/${booking?.influencer?._id}`}
                                                className="block p-6 hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-4">
                                                        <CalendarDays className="h-6 w-6 text-gray-400" />
                                                        <div>
                                                            <h3 className="text-lg font-medium text-gray-900">
                                                                {booking?.influencer?.name || 'Unknown Influencer'}
                                                            </h3>
                                                            <p className="text-sm text-gray-500">
                                                                Booked At: {new Date(booking.createdAt).toLocaleDateString('en-IN')}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                        <span
                                                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                                booking.status === 'upcoming'
                                                                    ? 'bg-blue-100 text-blue-800'
                                                                    : 'bg-gray-100 text-gray-800'
                                                            }`}
                                                        >
                                                            {booking.status}
                                                        </span>
                                                        <span className="text-gray-400 hover:text-gray-600">→</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Profile;
