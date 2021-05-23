// selectors
// syntax sugar -> for accessing store values
// instead of remaking a function that does useSelector((state) => state.momReducer.phoneNumber)

export const selectPhoneNumber = (state) => state.momReducer.phoneNumber;
export const selectNavigation = (state) => state.momReducer.currentRoute;

