import { createSlice } from "@reduxjs/toolkit";

const initValue = {
  isLogin: false,
  user: {},
};

const authSlice = createSlice({
  name: "user",
  initialState: initValue,
  reducers: {
    setUser: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.isLogin = false;
      state.user = {};
      localStorage.removeItem("user");
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
