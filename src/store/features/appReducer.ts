import {createSlice} from '@reduxjs/toolkit';

const INITIAL_STATE = {
  onBoarding: true,
  drawerSeasonOpen: false,
};
const appSlice = createSlice({
  name: 'app',
  initialState: INITIAL_STATE,
  reducers: {
    setOnBoarding: (state, action) => {
      state.onBoarding = action.payload;
    },
    setDrawerSeasonOpen: (state, action) => {
      state.drawerSeasonOpen = action.payload;
    },
  },
});
export const appReducer = appSlice.reducer;
export const AppActions = appSlice.actions;
