import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: "",
  role: "",
  isHod: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    studentLoginSuccess: {
      prepare(data, token) {
        return { payload: { data, token } };
      },
      reducer(state, action) {
        state.isAuthenticated = true;
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.role = "student";
      },
    },
    staffLoginSuccess: {
      prepare(data, token, isHod) {
        return { payload: { data, token, isHod } };
      },
      reducer(state, action) {
        state.isAuthenticated = true;
        state.user = action.payload.data;
        state.isHod = action.payload.isHod;
        state.token = action.payload.token;
        state.role = "staff";
      },
    },
    adminLoginSuccess: {
      prepare(data, token) {
        return { payload: { data, token } };
      },
      reducer(state, action) {
        state.isAuthenticated = true;
        state.role = "admin";
        state.user = action.payload.data;
        state.token = action.payload.token;
      },
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = "";
      state.role = "";
      state.isHod = false;
    },
  },
});

export default userSlice.reducer;

export const {
  staffLoginSuccess,
  studentLoginSuccess,
  logout,
  adminLoginSuccess,
} = userSlice.actions;
