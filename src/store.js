import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlices';
import songsReducer from './features/songs/songSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    songs:songsReducer,
  },
});
