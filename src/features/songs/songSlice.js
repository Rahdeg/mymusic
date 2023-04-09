import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const url = process.env.REACT_APP_BASE_URL;

const initialState = {
  allSongs: [],
  isLoading:false,
  filterTerm:"all",
  artistFilter:null,
  languageFilter:null,
  albumFilter:null,
};

export const getAllSongs = createAsyncThunk('songs/getAllSongs', async (thunkAPI) => {
  try {
    // console.log(name);
    // console.log(thunkAPI);
    // console.log(thunkAPI.getState());
    // thunkAPI.dispatch(openModal());
    const res = await axios.get(`${url}api/song/get`)
    return res.data;

  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
}
);




// export const userValidator = createAsyncThunk('user/uservalidator', async (token, thunkAPI) => {
//     try {
//       // console.log(name);
//       // console.log(thunkAPI);
//       // console.log(thunkAPI.getState());
//       // thunkAPI.dispatch(openModal());
//       const res = await axios.get(`${url}api/users/login`,{
//         headers:{
//             Authorization:'Bearer ' + token,
//         }
//     })
//     return res.data;

//     } catch (error) {
//       return thunkAPI.rejectWithValue('something went wrong');
//     }
//   }
// );

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    namedFilter: (state,{payload}) => {
      state.filterTerm = payload;
    },
    nullFilter: (state) => {
      state.filterTerm = "Categories";
    },
    nullArtistFilter: (state) => {
      state.artistFilter = "Artist";
    },
    namedArtistFilter: (state,{payload}) => {
      state.artistFilter = payload;
    },
    namedLanguageFilter: (state,{payload}) => {
      state.languageFilter = payload;
    },
    nullLanguageFilter: (state) => {
      state.languageFilter = "Language";
    },
    namedalbumFilter: (state,{payload}) => {
      state.albumFilter = payload;
    },
    nullalbumFilter: (state) => {
      state.albumFilter = "Album";
    },
    // removeItem: (state, action) => {
    //   const itemId = action.payload;
    //   state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    // },
    // increase: (state, { payload }) => {
    //   const cartItem = state.cartItems.find((item) => item.id === payload.id);
    //   cartItem.amount = cartItem.amount + 1;
    // },
    // decrease: (state, { payload }) => {
    //   const cartItem = state.cartItems.find((item) => item.id === payload.id);
    //   cartItem.amount = cartItem.amount - 1;
    // },
    // calculateTotals: (state) => {
    //   let amount = 0;
    //   let total = 0;
    //   state.cartItems.forEach((item) => {
    //     amount += item.amount;
    //     total += item.amount * item.price;
    //   });
    //   state.amount = amount;
    //   state.total = total;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSongs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSongs.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.allSongs = action.payload;
      })
      .addCase(getAllSongs.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })
  },
});

// console.log(cartSlice);
export const { namedFilter,nullFilter,nullArtistFilter,namedArtistFilter,nullLanguageFilter,namedLanguageFilter,namedalbumFilter,nullalbumFilter} = songsSlice.actions;

export default songsSlice.reducer;
