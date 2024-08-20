import {createSlice} from '@reduxjs/toolkit';
import initI18n from '../../lang/i18n';

const INITIAL_STATE = {
  onBoarding: true,
  drawerSeasonOpen: false,
  selectedLanguage: 'tr',
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
    setSelectedLanguage: (state, action) => {
      initI18n().then(i18n => {
        i18n?.changeLanguage(action.payload);
      });
      state.selectedLanguage = action.payload;
    },
  },
});
export const appReducer = appSlice.reducer;
export const AppActions = appSlice.actions;
