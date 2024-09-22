import {createSlice} from '@reduxjs/toolkit';

interface ProductionCodeState {
  step: 'ProductionCodeInfo' | 'ProductionCodeProperties';
}
const initialState: ProductionCodeState = {
  step: 'ProductionCodeInfo',
};
const productionCodeSlice = createSlice({
  name: 'productionCode',
  initialState,
  reducers: {
    setStep(state, action) {
      state.step = action.payload;
    },
  },
});
export const ProductionCodeActions = productionCodeSlice.actions;
export const productionCodeReducer = productionCodeSlice.reducer;
