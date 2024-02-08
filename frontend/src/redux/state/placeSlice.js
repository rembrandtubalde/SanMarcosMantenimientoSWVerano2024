import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const placesNearbySlice = createSlice({
  name: 'placesNearby',
  initialState,
  reducers: {
    setPlacesNearby: (state, action) => action.payload
  }
});

export const { setPlacesNearby } = placesNearbySlice.actions;

export default placesNearbySlice.reducer;
