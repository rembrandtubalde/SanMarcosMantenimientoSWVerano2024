/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/auth';
import { setMessages, setFields } from './messageSlice';

const user = JSON.parse(sessionStorage.getItem('user'));

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const data = await authService.login(credentials);
      return data;
    } catch (err) {
      const { fields, messages } = err.response.data;
      dispatch(setMessages(messages));
      dispatch(setFields(fields));
      return rejectWithValue(err);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      const data = await authService.register(credentials);

      return data;
    } catch (err) {
      console.log('error from axios', err);
      const { fields, messages } = err.response.data;
      dispatch(setMessages(messages));
      dispatch(setFields(fields));
      return rejectWithValue(err);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => { await authService.logout(); }
);

const initialState = user
  ? { isLogged: true, user }
  : { isLogged: false, user: null };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.isLogged = true;
      state.user = action.payload.data;
    },
    [login.rejected]: (state, action) => {
      state.isLogged = false;
      state.user = null;
    },
    [register.fulfilled]: (state, action) => {
      state.isLogged = true;
      state.user = action.payload.user;
    },
    [register.rejected]: (state, action) => {
      state.isLogged = false;
      console.log('state register rejected', state);
      console.log('action register rejected', action);
    },
    [logout.fulfilled]: (state, action) => {
      state.isLogged = false;
      state.user = null;
    },
  }
});

export default authSlice.reducer;
