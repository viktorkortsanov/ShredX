import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: JSON.parse(localStorage.getItem('user')) !== null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('likedPosts');
      localStorage.removeItem('purchasedPrograms');
      localStorage.removeItem('profileImg');
    },
    setProfileImg: (state, action) => {
      state.profileImg = action.payload.profileImg;
      localStorage.setItem('profileImg', action.payload.profileImg);
    }
  },
});

export const { login, logout, setProfileImg } = authSlice.actions;
export default authSlice.reducer;
