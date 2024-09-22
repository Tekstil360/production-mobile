import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import ProductionCodePropertyResponse from '../../dto/Response/ProductionCode/ProductionCodePropertyResponse';
import ProductionCodePropertyItemResponse from '../../dto/Response/ProductionCode/ProductionCodePropertyItemResponse';

interface ProductionCodePropertyState {
  productionCodeProperties: Array<ProductionCodePropertyResponse>;
  updateProductionCodeProperty: ProductionCodePropertyResponse;
}
const INITIAL_STATE: ProductionCodePropertyState = {
  productionCodeProperties: [],
  updateProductionCodeProperty: {
    id: 0,
    name: '',
    productionPropertyItems: [],
  } as ProductionCodePropertyResponse,
};
const productionCodePropertySlice = createSlice({
  name: 'productionCodeProperty',
  initialState: INITIAL_STATE,
  reducers: {
    setProductionCodeProperties: (state, action) => {
      state.productionCodeProperties = action.payload;
    },
    addProductionCodeProperty: (state, action) => {
      state.productionCodeProperties.push(action.payload);
    },
    setUpdateProductionCodeProperties: (state, action) => {
      state.productionCodeProperties = state.productionCodeProperties.map(
        item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        },
      );
    },
    addUpdateProductionCodePropertyItem: state => {
      let temp = {...state.updateProductionCodeProperty};
      temp.productionPropertyItems.push({
        id: 0,
        name: '',
      });
      state.updateProductionCodeProperty = temp;
    },
    setUpdateProductionCodeProperty: (state, action) => {
      state.updateProductionCodeProperty = action.payload;
    },
    handleChangeProductionCodePropertyName(state, action) {
      let temp = {...state.updateProductionCodeProperty};
      temp.name = action.payload;
      state.updateProductionCodeProperty = temp;
    },
    handleChangeProductionCodePropertyItem: (
      state,
      action: PayloadAction<{
        key: keyof ProductionCodePropertyItemResponse;
        value: string;
        index: number;
      }>,
    ) => {
      let temp = {
        ...state.updateProductionCodeProperty,
      } as ProductionCodePropertyResponse;
      temp.productionPropertyItems.map((item: any, index) => {
        if (index === action.payload.index) {
          item[action.payload.key] = action.payload.value;
        }
      });
      state.updateProductionCodeProperty = temp;
    },
    removeProductionCodePropertyItem: (
      state,
      action: PayloadAction<{index: number}>,
    ) => {
      let temp = {...state.updateProductionCodeProperty};
      temp.productionPropertyItems.splice(action.payload.index, 1);
      state.updateProductionCodeProperty = temp;
    },
    removeProductionCodeProperty: (state, action) => {
      state.productionCodeProperties = state.productionCodeProperties.filter(
        item => item.id !== action.payload,
      );
    },
  },
});
export const productionCodePropertyReducer =
  productionCodePropertySlice.reducer;
export const ProductionCodePropertyActions =
  productionCodePropertySlice.actions;
