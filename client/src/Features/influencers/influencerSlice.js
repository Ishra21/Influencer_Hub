import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import influencerService from "./influencerService";

const influencerSlice = createSlice({
    name : "influencer",
    initialState : {
        influencers : [],
        influencer : {},
        isLoading : false,
        isError : false,
        isSuccess : false,
        message : ""
    },
    reducers : {},
    extraReducers : builder => {
builder
.addCase(getInfluencers.pending, (state, action) =>{
    state.isLoading = true
    state.isError = false
    state.isSuccess = false
})
.addCase(getInfluencers.fulfilled, (state, action) =>{
    state.isLoading = false
    state.isError = false
    state.isSuccess = true
    state.influencers = action.payload
})
.addCase(getInfluencers.rejected, (state, action) =>{
    state.isLoading = false
    state.isError = true
    state.isSuccess = false
    state.message = action.payload
})
.addCase(getInfluencer.pending, (state, action) =>{
    state.isLoading = true
    state.isError = false
    state.isSuccess = false
})
.addCase(getInfluencer.fulfilled, (state, action) =>{
    state.isLoading = false
    state.isError = false
    state.isSuccess = true
    state.influencer = action.payload
})
.addCase(getInfluencer.rejected, (state, action) =>{
    state.isLoading = false
    state.isError = true
    state.isSuccess = false
    state.message = action.payload
})
    }
})

export default influencerSlice.reducer;



// Get All Influencers

export const getInfluencers = createAsyncThunk("FETCH/INFLUENCERS", async(_, thunkAPI) =>{


    try {
        return await influencerService.fetchInfluencers()


    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)   
    }

})


export const getInfluencer = createAsyncThunk("FETCH/INFLUENCER", async(id, thunkAPI) =>{
// console.log(id)

    try {
        // console.log(id)
        return await influencerService.fetchInfluencer(id)
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)   
    }

})
