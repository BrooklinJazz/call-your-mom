import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { Routes } from "./Routes";
import { StorageKeys } from "./StorageKeys";
const momSlice = createSlice({
  name: "mom",
  initialState: {
    phoneNumber: undefined,
    currentRoute: Routes.Home,
    lastCalledTime: undefined,
    callHistory: [],
  },
  reducers: {
    setMomsPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setNavigation(state, action) {
      state.currentRoute = action.payload;
    },
    setLastTimeCalledMom(state, action) {
      AsyncStorage.setItem(StorageKeys.lastCallTime, action.payload);
      const newCallHistory = [...state.callHistory, action.payload].filter(
        (each) => !!each
      );
      AsyncStorage.setItem(
        StorageKeys.callHistory,
        JSON.stringify(newCallHistory)
      );
      state.callHistory = newCallHistory;
      state.lastCalledTime = action.payload;
    },
  },
});

export const { setMomsPhoneNumber, setNavigation, setLastTimeCalledMom } =
  momSlice.actions;

export default momSlice.reducer;
