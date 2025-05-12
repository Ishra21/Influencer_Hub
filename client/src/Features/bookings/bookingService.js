    import axios from "axios"
import { BASE_URL } from "../../config"

    const fetchAllUsersBookings  = async (token)=>{

    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

        const response = await axios.get(`${BASE_URL}/api/admin/bookings`, options)
        // console.log(response.data)
        return response.data;   
    }

    const updateBooking = async (updateStatus, token) => {
        const options = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.put(`${BASE_URL}/api/admin/bookings/${updateStatus._id}`, { status: updateStatus.value }, options)
        return response.data
      }
    const fetchUserBookings = async (token) => {
        const options = {
            headers: {
                authorization: `Bearer ${token}`
            }
        };
            const response = await axios.get(`${BASE_URL}/api/booking`, options);
        // console.log("response from API:", response.data); // Add this
        return response.data;
    };

    const fetchUserBooking = async (id, token) => {
        const options = {
            headers: {
                authorization: `Bearer ${token}`
            }
        };
            const response = await axios.get(`${BASE_URL}/api/booking/` + id , options);
        // console.log("response from API:", response.data); // Add this
        return response.data;
    };

    const requestBooking = async (id,token) => {


        const options = {
            headers: {
                authorization: `Bearer ${token}`
            }
        };
        const response = await axios.post(`${BASE_URL}/api/booking/` + id, {} , options);
    //    console.log(response.data)
        return response.data;
    }

    

    const bookingService = {fetchAllUsersBookings, fetchUserBookings, updateBooking, requestBooking, fetchUserBooking}

    export default bookingService;