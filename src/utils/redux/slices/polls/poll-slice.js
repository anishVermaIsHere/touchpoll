import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPolls, fetchOnePoll, pollCreate, pollSubmit, pollEdit } from '../../../services/api/polls-api';


// state
const initialState = {
  loading: true,
  allPolls: [],
  editPoll: {},
  message: null,
  error: null
}

// async thunk for all polls
export const getPolls = createAsyncThunk(
  'getPolls',
  async () => {
    const response = await fetchPolls();
    return response.data;
  }
)

// fetch poll for vote
export const getUserPoll = createAsyncThunk(
  'getUserPoll',
  async (data) => {
    const response = await fetchOnePoll(data);
    return response.data;
  }
)

// submit poll
export const voteUserPoll = createAsyncThunk(
  'voteUserPoll',
  async (data) => {
    const response = await pollSubmit(data);
    return response.data;
  }
)

export const createPoll = createAsyncThunk(
  'createPoll',
  async (data) => {
    const response = await pollCreate(data);
    return response.data;
  }
)

export const editPoll = createAsyncThunk(
  'editPoll',
  async (data) => {
    const response = await pollEdit(data);
    return response.data;
  }
)

// slice
const pollSlice = createSlice({
  name: 'pollSlice',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(getPolls.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(getPolls.fulfilled, (state, action) => {
      const sortedData = [...action.payload.polls].sort((x, y) => {
        const date1 = y.created_date.substr(0, 10);
        const date2 = x.created_date.substr(0, 10);
        return new Date(date1) - new Date(date2) ? -1 : 1;
      });
      state.allPolls = sortedData;
      state.loading = false
    })
    builder.addCase(getPolls.rejected, (state, action) => {
      state.error = 'Server error';
      state.loading = false;
    })
    builder.addCase(createPoll.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(createPoll.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.loading = false;
    })
    builder.addCase(createPoll.rejected, (state, action) => {
      state.error = 'Server error';
      state.loading = false;
    })
    builder.addCase(editPoll.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(editPoll.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.loading = false;
    })
    builder.addCase(editPoll.rejected, (state, action) => {
      state.error = 'Server error';
      state.loading = false;
    })
    builder.addCase(getUserPoll.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(getUserPoll.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.loading = false;
    })
    builder.addCase(getUserPoll.rejected, (state, action) => {
      state.error = 'Poll error';
      state.loading = false;
    })
  },
})


export const { } = pollSlice.actions;
export default pollSlice.reducer;
