import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

const adminSlice = createSlice({
    name : "admin",
    initialState : {
        users : [],
        comments : [],
        influencers : [], 
        edit : {influencer : {}, isEdit : false},
        isLoading :  false,
        isError : false,
        isSuccess : false,
        message : ""
    },
    reducers : {
        edit : (state,action) =>{
            return {
                ...state,
                edit : {influencer :action.payload, isEdit : true},
    
}
        }
    },
    extraReducers : builder => {
builder
.addCase(getAllUsersForAdmin.pending, (state, action) =>{
    state.isLoading = true
    state.isError = false
    state.isSuccess = false
})
.addCase(getAllUsersForAdmin.fulfilled, (state, action) =>{
    state.isLoading = false
    state.isError = false
    state.isSuccess = true
    state.users = action.payload
})
.addCase(getAllUsersForAdmin.rejected, (state, action) =>{
    state.isLoading = false
    state.isError = true
    state.isSuccess = false
    state.message = action.payload
})
.addCase(getAllCommentsForAdmin.pending, (state, action) =>{
    state.isLoading = true
    state.isError = false
    state.isSuccess = false
})
.addCase(getAllCommentsForAdmin.fulfilled, (state, action) =>{
    state.isLoading = false
    state.isError = false
    state.isSuccess = true
    state.comments = action.payload
})
.addCase(getAllCommentsForAdmin.rejected, (state, action) =>{
    state.isLoading = false
    state.isError = true
    state.isSuccess = false
    state.message = action.payload
})
.addCase(createInfluencer.pending, (state) => {
    state.isLoading = true
    state.isError = false
    state.isSuccess = false
})
.addCase(createInfluencer.fulfilled, (state, action) => {
    state.isLoading = false
    state.isError = false
    state.isSuccess = true
    state.influencers = action.payload
    
})
.addCase(createInfluencer.rejected, (state, action) => {
    state.isLoading = false
    state.isError = true
    state.isSuccess = false
    state.message = action.payload
})
.addCase(updateTheInfluencer.pending, (state) => {
    state.isLoading = true
    state.isError = false
    state.isSuccess = false
})
.addCase(updateTheInfluencer.fulfilled, (state, action) => {
    state.isLoading = false
    state.isError = false
    state.isSuccess = true
    state.influencers = state.influencers.map(item => item._id === action.payload._id ? action.payload : item)
    state.edit = {influencer : {}, isEdit : false}
})
.addCase(updateTheInfluencer.rejected, (state, action) => {
    state.isLoading = false
    state.isError = true
    state.isSuccess = false
    state.message = action.payload
})
.addCase(removeInfluencer.pending, (state) => {
    state.isLoading = true
    state.isError = false
    state.isSuccess = false
})
.addCase(removeInfluencer.fulfilled, (state, action) => {
    state.isLoading = false
    state.isError = false
    state.isSuccess = true
    state.influencers = state.influencers.filter((item) => item._id !== action.payload.id)
})
.addCase(removeInfluencer.rejected, (state, action) => {
    state.isLoading = false
    state.isError = true
    state.isSuccess = false
    state.message = action.payload
})
.addCase(replyToCommentByAdmin.pending, (state) => {
    state.isLoading = true
    state.isError = false
    state.isSuccess = false
})
.addCase(replyToCommentByAdmin.fulfilled, (state, action) => {
    state.isLoading = false
    state.isError = false
    state.isSuccess = true
    state.comments = [...state.comments, action.payload]
    // state.comments = state.comments.map(comment =>
    //     comment._id === action.payload._id ? action.payload : comment
    // )
})
.addCase(replyToCommentByAdmin.rejected, (state, action) => {
    state.isLoading = false
    state.isError = true
    state.isSuccess = false
    state.message = action.payload
})
    }
})

export const {edit} = adminSlice.actions;

export default adminSlice.reducer;


// Get all usets
export const getAllUsersForAdmin = createAsyncThunk("FETCH/ALL_USERS_BOOKINGS", async(_, thunkAPI) =>{
    let token = thunkAPI.getState().auth.user.token;
    
        try {
            return await adminService.fetchAllUsersForAdmin(token)
        } catch (error) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)   
        }
    
    })
    
    
    export const getAllCommentsForAdmin = createAsyncThunk("FETCH/ALL_COMMENTS", async(_, thunkAPI) =>{
        let token = thunkAPI.getState().auth.user.token;
        
            try {
                return await adminService.fetchAllCommentsForAdmin(token)
            } catch (error) {
                const message = error.response.data.message
                return thunkAPI.rejectWithValue(message)   
            }
        
        })
        

        // Add Influencer
        export const createInfluencer = createAsyncThunk("ADD/INFLUENCER", async(formData, thunkAPI) =>{
            let token = thunkAPI.getState().auth.user.token;
        
            try {
                return await adminService.addInfluencer(formData,token)
                // console.log(formData)
            } catch (error) {
                const message = error.response.data.message
                return thunkAPI.rejectWithValue(message)   
            }
        })


         // update Influencer
        export const updateTheInfluencer = createAsyncThunk("UPDATE/INFLUENCER", async(formData, thunkAPI) =>{
            let token = thunkAPI.getState().auth.user.token;
        
            try {
                return await adminService.updateInfluencer(formData,token)
                // console.log(formData)
            } catch (error) {
                const message = error.response.data.message
                return thunkAPI.rejectWithValue(message)   
            }
        })

          // delete Influencer
        export const removeInfluencer = createAsyncThunk("REMOVE/INFLUENCER", async(id, thunkAPI) =>{
            let token = thunkAPI.getState().auth.user.token;
        
            try {
                return await adminService.deleteInfluencer(id,token)
                // console.log(formData)
            } catch (error) {
                const message = error.response.data.message
                return thunkAPI.rejectWithValue(message)   
            }
        })



        // reply to comment by admin

        export const replyToCommentByAdmin = createAsyncThunk("REPLY/COMMENT", async(formData, thunkAPI) =>{
            let token = thunkAPI.getState().auth.user.token;
        
            try {
                return await adminService.replyToCommentByAdmin(formData,token)
                // console.log(formData)
            } catch (error) {
                const message = error.response.data.message
                return thunkAPI.rejectWithValue(message)   
            }
        })
//