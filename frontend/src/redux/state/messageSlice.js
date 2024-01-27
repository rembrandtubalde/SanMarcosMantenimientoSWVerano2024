import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fields: [],
  messages: '',
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setFields(state, action) {
      state.fields = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    clearMessages(state) {
      state.messages = '';
      state.fields = [];
    }
  }
});

export const { setFields, setMessages, clearMessages } = messageSlice.actions;

export default messageSlice.reducer;
