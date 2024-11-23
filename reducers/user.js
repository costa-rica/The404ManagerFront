import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    username: null,
    email: null,
    role: null,
    machineName: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMachineNameRedux: (state, action) => {
      state.value.machineName = action.payload;
    },
    loginUser: (state, action) => {
      console.log(`- dans Redux: loginUser 🔔`);
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.role = action.payload.role;
      state.value.email = action.payload.email;
    },
    logoutUser: (state) => {
      console.log(`- dans Redux: logoutUser 🔔`);
      state.value.token = null;
      state.value.username = null;
      state.value.role = null;
      state.value.email = null;
    },
  },
});

export const { setMachineNameRedux, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
