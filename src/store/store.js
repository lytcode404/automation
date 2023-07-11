// store.js
import { configureStore } from '@reduxjs/toolkit';
import recipientsReducer from './recipients';

const store = configureStore({
  reducer: {
    recipients: recipientsReducer,
    // Add other reducers here if needed
  },
});

export default store;
