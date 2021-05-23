import { configureStore } from '@reduxjs/toolkit';
import momReducer from './momSlice';

export const store = configureStore({
  reducer: {
    momReducer: momReducer
  }
});

// store -> global state

// actions -> type, payload
// store -> change store values (setters/getters)
// slice -> syntax sugar -> actions/reducers

//actions is like a message (type: "actionA", payload: "8888888888")
// reducer is like a listener (type: "actionA", payload) -> phoneNumber = payload

