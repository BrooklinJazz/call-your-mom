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
    momsBirthday: undefined,
    shouldNotifyMomOnBirthday: false,
    shouldNotifyMomOnMothersDay: false,
  },
  reducers: {
    setMomsPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setMomsBirthdayAction(state, action) {
      state.momsBirthday = action.payload;
    },
    setShouldNotifyMomOnBirthdayAction(state, action) {
      state.shouldNotifyMomOnBirthday = action.payload;
    },
    setShouldNotifyMomOnMothersDayAction(state, action) {
      state.shouldNotifyMomOnMothersDay = action.payload;
    },
    setNavigation(state, action) {
      state.currentRoute = action.payload;
    },
    setLastTimeCalledMom(state, action) {
      AsyncStorage.setItem(StorageKeys.lastCallTime, action.payload);

      state.lastCalledTime = action.payload;
    },
    addToCallHistoryAction(state, action) {
      const newCallHistory = [...state.callHistory, action.payload].filter(
        (each) => !!each
      );

      AsyncStorage.setItem(
        StorageKeys.callHistory,
        JSON.stringify(newCallHistory)
      );

      state.callHistory = newCallHistory;
    },
    setCallHistoryAction(state, action) {
      state.callHistory = action.payload || [];
    },
  },
});

export const {
  setMomsPhoneNumber,
  setNavigation,
  setLastTimeCalledMom,
  setCallHistoryAction,
  addToCallHistoryAction,
  setMomsBirthdayAction,
  setShouldNotifyMomOnBirthdayAction,
  setShouldNotifyMomOnMothersDayAction,
} = momSlice.actions;

export default momSlice.reducer;
