import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/users/userSlices';
// import modalReducer from './features/modal/modalSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
