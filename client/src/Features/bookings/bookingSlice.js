import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

const bookingSlice = createSlice({
    name : "booking",
    initialState : {
        bookings : [],
        userBookings : [],
        useBooking : {},
        bookingsLoading : false,
        bookingsError : false,
        bookingSuccess : false,
        bookingMessage : ""
    },
    reducers : {},
    extraReducers : builder => {
        builder
        .addCase(getAllUsersBookings.pending, (state,action) =>{
            state.bookingsError = false
            state.bookingsLoading = true
            state.bookingSuccess = false
        })
        .addCase(getAllUsersBookings.fulfilled, (state,action) =>{
            state.bookingsError = false
            state.bookingsLoading = false
            state.bookingSuccess = true
            state.bookings = action.payload
        })
        .addCase(getAllUsersBookings.rejected, (state,action) =>{
            state.bookingsError = true
            state.bookingsLoading = false
            state.bookingSuccess = false
            state.bookingMessage = action.payload
        })
        .addCase(getUserBookings.pending, (state,action) =>{
            state.bookingsError = false
            state.bookingsLoading = true
            state.bookingSuccess = false
        })
        .addCase(getUserBookings.fulfilled, (state,action) =>{
            state.bookingsError = false
            state.bookingsLoading = false
            state.bookingSuccess = true
            state.userBookings = action.payload
        })
        .addCase(getUserBookings.rejected, (state,action) =>{
            state.bookingsError = true
            state.bookingsLoading = false
            state.bookingSuccess = false
            state.bookingMessage = action.payload
        })
        .addCase(addInfluencerBooking.pending, (state,action) =>{
            state.bookingsError = false
            state.bookingsLoading = true
            state.bookingSuccess = false
        })
        .addCase(addInfluencerBooking.fulfilled, (state,action) =>{
            state.bookingsError = false
            state.bookingsLoading = false
            state.bookingSuccess = true
            state.userBookings = [action.payload, ...state.userBookings]
            
        })
        .addCase(addInfluencerBooking.rejected, (state,action) =>{
            state.bookingsError = true
            state.bookingsLoading = false
            state.bookingSuccess = false
            state.bookingMessage = action.payload
        })
        .addCase(getUserBooking.pending, (state,action) =>{
            state.bookingsError = false
            state.bookingsLoading = true
            state.bookingSuccess = false
        })
        .addCase(getUserBooking.fulfilled, (state,action) =>{
            state.bookingsError = false
            state.bookingsLoading = false
            state.bookingSuccess = true
            state.userBooking = action.payload
        })
        .addCase(getUserBooking.rejected, (state,action) =>{
            state.bookingsError = true
            state.bookingsLoading = false
            state.bookingSuccess = false
            state.bookingMessage = action.payload
        })
        .addCase(updateTheBooking.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
          })
          .addCase(updateTheBooking.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.bookings = state.bookings.map(item => item._id === action.payload._id ? action.payload : item)
            state.isError = false;
          })
          .addCase(updateTheBooking.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
          })
    }
})

export default bookingSlice.reducer;



// Get bookings

export const getAllUsersBookings = createAsyncThunk("FETCH/ALL_USERS_BOOKINGS", async(_, thunkAPI) =>{
let token = thunkAPI.getState().auth.user.token;

    try {
        return await bookingService.fetchAllUsersBookings(token)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)   
    }

})
// Update Booking
export const updateTheBooking = createAsyncThunk("UPDATE/BOOKING", async (updateStatus, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await bookingService.updateBooking(updateStatus, token)
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  })
// Get All user bookings
export const getUserBookings = createAsyncThunk("BOOKING/FETCH", async(_, thunkAPI) =>{      
    let token = thunkAPI.getState().auth.user.token;
// console.log(id)

    try {
        return await bookingService.fetchUserBookings(token)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)   
    }

}
)   

// Get Single user bookings
export const getUserBooking = createAsyncThunk("BOOKING/FETCH:id", async(id, thunkAPI) =>{      
    let token = thunkAPI.getState().auth.user.token;
    try {
        return await bookingService.fetchUserBooking(id,token)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)   
    }

}
)   


// Get Add bookings
export const addInfluencerBooking = createAsyncThunk("ADD/BOOKING", async(id, thunkAPI) =>{      
    let token = thunkAPI.getState().auth.user.token;
    try {
        return await bookingService.requestBooking(id, token)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)   
    }

}
)   