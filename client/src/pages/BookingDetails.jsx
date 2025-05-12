import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, CreditCard } from 'lucide-react';

const BookingDetails = () => {

  const bookings = {
    1: {
      title: "Hotel Booking",
      date: "2024-03-20",
      status: "Confirmed",
      location: "Grand Hotel, New York",
      time: "Check-in: 3:00 PM",
      price: "$250.00",
      details: "Deluxe Room - 1 King Bed, Ocean View"
    },
    2: {
      title: "Flight Booking",
      date: "2024-03-21",
      status: "Pending",
      location: "JFK → LAX",
      time: "Departure: 10:30 AM",
      price: "$350.00",
      details: "Economy Class - Flight AA123"
    },
    3: {
      title: "Car Rental",
      date: "2024-03-22",
      status: "Completed",
      location: "LAX Airport",
      time: "Pickup: 12:00 PM",
      price: "$75.00",
      details: "Compact Car - Toyota Corolla or Similar"
    }
  }


const BookingDetails = () => {
  const { id } = useParams();
  const booking = bookings[Number(id)];

  if (!booking) {
    return <div>Booking not found</div>;
  }
}
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to="/"
        className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Profile
      </Link>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-2xl font-bold text-slate-800">{bookings.title}</h1>
          <p className="text-slate-600 mt-1">Booking Details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-teal-500" />
              <div>
                <p className="text-sm text-slate-600">Date</p>
                <p className="text-slate-800">{bookings.date}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-teal-500" />
              <div>
                <p className="text-sm text-slate-600">Location</p>
                <p className="text-slate-800">{bookings.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-teal-500" />
              <div>
                <p className="text-sm text-slate-600">Time</p>
                <p className="text-slate-800">{bookings.time}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <CreditCard className="w-5 h-5 text-teal-500" />
              <div>
                <p className="text-sm text-slate-600">Price</p>
                <p className="text-slate-800">{bookings.price}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-6">
            <h3 className="font-semibold text-slate-800 mb-2">Additional Details</h3>
            <p className="text-slate-600">{bookings.details}</p>
            <div className="mt-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                ${bookings.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                  bookings.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'}`}
              >
                {bookings.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingDetails