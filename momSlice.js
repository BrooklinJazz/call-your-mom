import { createSlice } from "@reduxjs/toolkit";
import { Routes } from "./Routes";

const momSlice = createSlice({
  name: "mom",
  initialState: {
    phoneNumber: undefined,
    currentRoute: Routes.Setup,
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
