import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const url = 'http://localhost:5000/';

const initialState = {
  user: [],
  allUsers:[],
  isLoading:false,
  alertType:null,
  isAudioPlaying:false,
  audioIndex:0,
};

export const getAllUsers = createAsyncThunk('user/getAllUsers', async (thunkAPI) => {
  try {
    // console.log(name);
    // console.log(thunkAPI);
    // console.log(thunkAPI.getState());
    // thunkAPI.dispatch(openModal());
    const res = await axios.get(`${url}api/users/get`)
    return res.data;

  } catch (error) {
    return thunkAPI.rejectWithValue('something went wrong');
  }
}
);




export const userValidator = createAsyncThunk('user/uservalidator', async (token, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const res = await axios.get(`${url}api/users/login`,{
        headers:{
            Authorization:'Bearer ' + token,
        }
    })
    return res.data;

    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    positiveAlert: (state) => {
      state.alertType = "success";
    },
    negativeAlert: (state) => {
      state.alertType = "danger";
    },
    nullAlert: (state) => {
      state.alertType = null;
    },
    closePlayer: (state) => {
      state.isAudioPlaying = false;
    },
    openPlayer: (state) => {
      state.isAudioPlaying = true;
    },
    zeroIndex: (state) => {
      state.audioIndex = 0;
    },
    increaseIndex: (state) => {
      state.audioIndex += 1;
    },
    decreaseIndex: (state) => {
      state.audioIndex -= 1;
    },
    setIndex: (state,{payload}) => {
      state.audioIndex = payload;
    },
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
      .addCase(userValidator.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userValidator.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(userValidator.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      }).addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })
  },
});

// console.log(cartSlice);
export const { positiveAlert,negativeAlert,nullAlert,openPlayer,closePlayer,zeroIndex,increaseIndex,decreaseIndex,setIndex} =
  userSlice.actions;

export default userSlice.reducer;
