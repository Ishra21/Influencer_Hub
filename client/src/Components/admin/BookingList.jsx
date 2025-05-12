import React, { useEffect } from 'react';
import { getAllUsersBookings, updateTheBooking } from '../../Features/bookings/bookingSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loader';
import { toast } from 'react-toastify';

const BookingList = () => {

    const { bookings, bookingsLoading, bookingsError, bookingMessage } = useSelector(state => state.booking)

    const dispatch = useDispatch()

    useEffect(() => {
        // console.log("Influencers List")
        dispatch(getAllUsersBookings())
    }, [])


    if (bookingsError && bookingMessage) {
        toast.error(bookingMessage, { position: "top-center" })
    }

    if (bookingsLoading) {
        return <Loader />
    }

    const getStatusStyles = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'accepted':
                return 'bg-blue-100 text-blue-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const updateBookingStatus = (id, value) => {
// Correct usage example
dispatch(updateTheBooking({ _id: id, value}));

    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Booking List</h2>
            <h2 className='text-xl mb-4'>Total Booking : {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 text-left">User</th>
                            <th className="p-2 text-left">Influencer</th>
                            <th className="p-2 text-left">Date</th>
                            <th className="p-2 text-left">Status</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings?.map((booking) => (
                            <tr key={booking._id} className="border-t">
                                {/* <td className="p-2">{booking.user.name}</td>
                                <td className="p-2">{booking.infleuncer.name}</td> */}
                                <td className="p-2">{booking?.user?.name}</td>
                                <td className="p-2">{booking?.influencer?.name}</td>
                                <td className="p-2">{new Date(booking.createdAt).toLocaleDateString()}</td>

                                <td className="p-2">
                                    <span className={`px-2 py-1 rounded text-sm ${getStatusStyles(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="p-2">
                                    <select
                                        defaultValue={booking.status}
                                        onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                                        className="text-sm border px-2 py-1 rounded"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingList;
