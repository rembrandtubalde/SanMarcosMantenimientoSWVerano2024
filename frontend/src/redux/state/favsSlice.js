/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import favsService from '../../services/favorites';

export const initializeFavorites = createAsyncThunk(
  'favs/initialize',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await favsService.getFavorites(userId);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const addFavorite = createAsyncThunk(
  'favs/add',
  async ({userId, data}, { rejectWithValue }) => {
    try {
      console.log(userId, data);
      const res = await favsService.addToFavorites(userId, data);
      console.log('res fro addFavorite ', res);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  'favs/remove',
  async (placeId, { rejectWithValue }) => {
    try {
      const res = await favsService.deleteFromFavorites(placeId);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  favorites: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const favsSlice = createSlice({
  name: 'favs',
  initialState,
  extraReducers: {
    [initializeFavorites.pending]: (state) => {
      state.isLoading = true;
    },
    [initializeFavorites.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.favorites = action.payload;
    },
    [initializeFavorites.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error;
    },
    [addFavorite.pending]: (state) => {
      state.isLoading = true;
    },
    [addFavorite.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.favorites.push(action.payload.data);
    },
    [addFavorite.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error;
    },
    [removeFavorite.pending]: (state) => {
      state.isLoading = true;
    },
    [removeFavorite.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.favorites = state.favorites.filter(
        (place) => place.id !== action.payload.data.id
      );
    },
    [removeFavorite.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error;
    }
  }
});

export default favsSlice.reducer;