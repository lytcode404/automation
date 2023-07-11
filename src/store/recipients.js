// recipients.js
import { createSlice } from '@reduxjs/toolkit';

const recipientsSlice = createSlice({
  name: 'recipients',
  initialState: [],
  reducers: {
    setAllRecipients: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAllRecipients } = recipientsSlice.actions;
export default recipientsSlice.reducer;
