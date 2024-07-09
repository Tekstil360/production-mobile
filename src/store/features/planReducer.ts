import {createSlice} from '@reduxjs/toolkit';
import PlanResponse from '../../dto/Response/PlanResponse';

interface PlanState {
  plans: PlanResponse[] | null;
  selectedPlan: PlanResponse | null;
}
const INITIAL_STATE: PlanState = {
  plans: null,
  selectedPlan: null,
};
const planSlice = createSlice({
  name: 'plan',
  initialState: INITIAL_STATE,
  reducers: {
    setPlans(state, action) {
      state.plans = action.payload;
    },
    setSelectedPlan(state, action) {
      state.selectedPlan = action.payload;
    },
  },
});
export const planReducer = planSlice.reducer;
export const PlanActions = planSlice.actions;
