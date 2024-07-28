import {createSlice} from '@reduxjs/toolkit';
import SeasonResponse from '../../dto/Response/SeasonResponse';

interface SeasonState {
  seasons: SeasonResponse[];
}
const INITIAL_STATE: SeasonState = {
  seasons: [],
};
const seasonSlice = createSlice({
  name: 'season',
  initialState: INITIAL_STATE,
  reducers: {
    setSeasons(state, action) {
      state.seasons = action.payload;
    },
  },
});
export const seasonReducer = seasonSlice.reducer;
export const SeasonActions = seasonSlice.actions;
