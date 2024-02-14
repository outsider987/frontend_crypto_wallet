import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
export const initialState = {
  accessToken: '',
  refreshToken: '',
  userInformation: {
    email: '',
    exp: 0,
    iat: 0,
    user_id: 0,
    username: ''
  }
};

export const globalSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<typeof initialState>) => {
      const { accessToken, refreshToken } = action.payload;
      state;
      if (accessToken === '') {
        state = {
          ...action.payload,
          userInformation: initialState.userInformation
        };
        return;
      } else {
        const jwtUser = jwtDecode(accessToken) as any;
        state = {
          ...action.payload,
          accessToken,
          refreshToken,
          userInformation: jwtUser
        };
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const { setToken } = globalSlice.actions;

export default globalSlice.reducer;
