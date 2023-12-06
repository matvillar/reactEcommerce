// se user credentials to local storage

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
  },
});

// export actions
export const { setCredentials } = loginSlice.actions;
// export reducer
export default loginSlice.reducer;
