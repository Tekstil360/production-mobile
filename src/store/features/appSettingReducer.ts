import {createSlice} from '@reduxjs/toolkit';
import LanguageResponse from '../../dto/Response/LanguageResponse';

interface AppSettingState {
  languages: LanguageResponse[];
}
const initialState: AppSettingState = {
  languages: [],
};
const appSettingSlice = createSlice({
  name: 'appSetting',
  initialState,
  reducers: {
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
  },
});
export const appSettingReducer = appSettingSlice.reducer;
export const AppSettingActions = appSettingSlice.actions;
