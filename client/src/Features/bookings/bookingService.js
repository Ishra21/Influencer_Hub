    import axios from "axios"

    const fetchAllUsersBookings  = async (token)=>{

    const options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

        const response = await axios.get("/api/admin/bookings", options)
        // console.log(response.data)
        return response.data;   
    }

    const updateBooking = async (updateStatus, token) => {
        const options = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.put(`/api/admin/bookings/${updateStatus._id}`, { status: updateStatus.value }, options)
        return response.data
      }
    const fetchUserBookings = async (token) => {
        const options = {
            headers: {
                authorization: `Bearer ${token}`
            }
        };
            const response = await axios.get(`/api/booking`, options);
        // console.log("response from API:", response.data); // Add this
        return response.data;
    };

    const fetchUserBooking = async (id, token) => {
        const options = {
            headers: {
                authorization: `Bearer ${token}`
            }
        };
            const response = await axios.get(`/api/booking/` + id , options);
        // console.log("response from API:", response.data); // Add this
        return response.data;
    };

    const requestBooking = async (id,token) => {


        const options = {
            headers: {
                authorization: `Bearer ${token}`
            }
        };
        const response = await axios.post(`/api/booking/` + id, {} , options);
    //    console.log(response.data)
        return response.data;
    }

    

    const bookingService = {fetchAllUsersBookings, fetchUserBookings, updateBooking, requestBooking, fetchUserBooking}

    export default bookingService;