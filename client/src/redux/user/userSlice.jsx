import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  role: "",
  isHod: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    studentLoginSuccess(state, action) {
      console.log(action.payload);
      state.isAuthenticated = true;
      state.user = action.payload;
      state.role = "student";
    },
    staffLoginSuccess: {
      prepare(data, isHod) {
        return { payload: { data, isHod } };
      },
      reducer(state, action) {
        state.isAuthenticated = true;
        state.user = action.payload.data;
        state.isHod = action.payload.isHod;
        state.role = "staff";
      },
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.role = "";
    },
  },
});

export default userSlice.reducer;

export const { staffLoginSuccess, studentLoginSuccess, logout } =
  userSlice.actions;
