export const selectPhoneNumber = (state) => state.momReducer.phoneNumber;
export const selectNavigation = (state) => state.momReducer.currentRoute;
export const selectLastCalledTime = (state) => state.momReducer.lastCalledTime;
export const selectCallHistory = (state) => state.momReducer.callHistory || [];

export const selectMomsBirthday = (state) => state.momReducer.momsBirthday;
export const selectShouldNotifyMomOnBirthday = (state) =>
  state.momReducer.shouldNotifyMomOnBirthday;
export const selectShouldNotifyMomOnMothersDay = (state) =>
  state.momReducer.shouldNotifyMomOnMothersDay;
export const selectFrequencyToCallMomInDays = (state) =>
  state.momReducer.frequencyToCallMomInDays;
