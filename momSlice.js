import { createSlice } from "@reduxjs/toolkit";

const momSlice = createSlice({
  name: "mom",
  initialState: {
    phoneNumber: undefined,
  },
  reducers: {
    setMomsPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
  },
});

export const { setMomsPhoneNumber } = momSlice.actions;

export default momSlice.reducer;
