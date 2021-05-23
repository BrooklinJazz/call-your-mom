import { createSlice } from "@reduxjs/toolkit";

const momSlice = createSlice({
  name: "mom",
  initialState: {
    phoneNumber: undefined,
    currentRoute: "settings",
    lastCalledTime: undefined,
  },
  reducers: {
    setMomsPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setNavigation(state, action) {
      state.currentRoute = action.payload;
    },
    setLastTimeCalledMom(state, action) {
      state.lastCalledTime = action.payload;
    },
  },
});

export const { setMomsPhoneNumber, setNavigation, setLastTimeCalledMom } =
  momSlice.actions;

export default momSlice.reducer;
