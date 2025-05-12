import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentService from "./CommentService";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    commentLoading: false,
    commentSuccess: false,
    commentEror: false,
    commentMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.commentLoading = true;
        state.commentSuccess = false;
        state.commentEror = false;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.commentLoading = false;
        state.commentSuccess = true;
        state.comments = action.payload;
        state.commentEror = false;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.commentLoading = false;
        state.commentEror = true;
        state.commentMessage = action.payload;
        state.commentSuccess = false;
      })
      .addCase(addComments.pending, (state) => {
        state.commentLoading = true;
        state.commentSuccess = false;
        state.commentEror = false;
      })
      .addCase(addComments.fulfilled, (state, action) => {
        state.commentLoading = false;
        state.commentSuccess = true;
        state.comments = [action.payload, ...state.comments];
        state.commentEror = false;
      })
      .addCase(addComments.rejected, (state, action) => {
        state.commentLoading = false;
        state.commentEror = true;
        state.commentMessage = action.payload;
        state.commentSuccess = false;
      });
  },
});

export default commentSlice.reducer;

export const getComments = createAsyncThunk("FETCH/COMMENTS", async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;
  try {
    return await commentService.fetchComments(id, token);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const addComments = createAsyncThunk("ADD/COMMENT", async (formData, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;
  try {
    return await commentService.createComment(formData, token);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});
