import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlices';
import songsReducer from './features/songs/songSlice';
import artistsReducer from './features/artists/artistSlice'
import albumsReducer from './features/album/albumSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    songs:songsReducer,
    artists:artistsReducer,
    albums:albumsReducer,
  },
});
