import { createSlice } from "@reduxjs/toolkit";

const momSlice = createSlice({
  name: "mom",
  initialState: {
    phoneNumber: undefined,
    currentRoute: "settings",
  },
  reducers: {
    setMomsPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setNavigation(state, action) {
      state.currentRoute = action.payload;
    },
  },
});

export const { setMomsPhoneNumber, setNavigation } = momSlice.actions;

export default momSlice.reducer;
