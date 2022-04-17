import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash'

export const Auth = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
  RESTORE_TOKEN: 'RESTORE_TOKEN',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSignout: false,
    userToken: null,
    infoUser: null,
  },
  reducers: {
    signIn: {
      reducer(state, action) {
        const { token, infoUser } = action.payload;
        if(token)
          state.userToken = token;
        if(infoUser)
          state.infoUser  = infoUser;
      },
    },

    updateInfoUser: {
      reducer(state, action) {
        const { infoUser } = action.payload;
        if(infoUser)
          state.infoUser  = infoUser;
      },
    },

    signOut(state, action) {
      state.userToken = null;
      state.infoUser  = null;
    },
  }
})

export const { signIn, signOut, updateInfoUser } = authSlice.actions;

export default authSlice.reducer;
