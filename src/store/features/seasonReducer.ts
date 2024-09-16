import {createSlice} from '@reduxjs/toolkit';
import SeasonResponse from '../../dto/Response/Season/SeasonResponse';

interface SeasonState {
  seasons: SeasonResponse[];
  selectedSeason: SeasonResponse | null;
}
const INITIAL_STATE: SeasonState = {
  seasons: [],
  selectedSeason: null,
};
const seasonSlice = createSlice({
  name: 'season',
  initialState: INITIAL_STATE,
  reducers: {
    setSeasons(state, action) {
      state.seasons = action.payload;
    },
    addSeason(state, action) {
      state.seasons.push(action.payload);
    },
    updateSeason(state, action) {
      state.seasons = state.seasons.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
    deleteSeason(state, action) {
      state.seasons = state.seasons.filter(item => item.id !== action.payload);
      state.selectedSeason = null;
    },
    setSelectedSeason(state, action) {
      state.selectedSeason = action.payload;
    },
  },
});
export const seasonReducer = seasonSlice.reducer;
export const SeasonActions = seasonSlice.actions;
