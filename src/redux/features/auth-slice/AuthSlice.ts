import { createSlice } from '@reduxjs/toolkit';

// type IAuth = {
//   user:
// }

const initialState = {
  user: null,
  token: null,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      console.log(action.payload.user);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
