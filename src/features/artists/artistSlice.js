import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const url = process.env.REACT_APP_BASE_URL;

const initialState = {
  allArtists: [],
  isLoading:false,
};

export const getAllArtists = createAsyncThunk('artists/getAllArtists', async (thunkAPI) => {
  try {
    // console.log(name);
    // console.log(thunkAPI);
    // console.log(thunkAPI.getState());
    // thunkAPI.dispatch(openModal());
    const res = await axios.get(`${url}api/artist/get`)
        return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
}
);






const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllArtists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllArtists.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.allArtists = action.payload;
      })
      .addCase(getAllArtists.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })
  },
});

// console.log(cartSlice);
// export const { } = artistsSlice.actions;

export default artistsSlice.reducer;
