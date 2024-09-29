import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import CreateProductionCodeAttributeRequest from '../../dto/Request/ProductionCode/CreateProductionCodeAttributeRequest';
import CreateProductionCodeAttributeValueRequest from '../../dto/Request/ProductionCode/CreateProductionCodeAttributeValueRequest';
import ProductionCodeAttributeResponse from '../../dto/Response/ProductionCode/ProductionCodeAttributeResponse';
import UpdateProductionCodeAttributeRequest from '../../dto/Request/ProductionCode/UpdateProductionCodeAttributeRequest';
import UpdateProductionCodeAttributeValueRequest from '../../dto/Request/ProductionCode/UpdateProductionCodeAttributeValueRequest';

interface ProductionCodeAttributeState {
  attributes: Array<ProductionCodeAttributeResponse>;
  createAttributeForm: CreateProductionCodeAttributeRequest;
  updateAttributeForm: UpdateProductionCodeAttributeRequest;
}
const initialState: ProductionCodeAttributeState = {
  attributes: [],
  createAttributeForm: {
    attributeName: '',
    attributeValues: [],
  },
  updateAttributeForm: {
    id: 0,
    attributeName: '',
    attributeValues: [],
  },
};
const productionCodeAttributeSlice = createSlice({
  name: 'productionCodeAttribute',
  initialState,
  reducers: {
    setAttributeNames: (state, action) => {
      state.createAttributeForm.attributeName = action.payload;
    },
    addAttributeValueToCreateForm: state => {
      state.createAttributeForm.attributeValues.push({
        value: '',
      });
    },
    updateAttributeValueInCreateForm: (
      state,
      action: PayloadAction<{
        index: number;
        key: keyof CreateProductionCodeAttributeValueRequest;
        value: any;
      }>,
    ) => {
      state.createAttributeForm.attributeValues[action.payload.index][
        action.payload.key
      ] = action.payload.value;
    },
    removeAttributeValueFromCreateForm: (
      state,
      action: PayloadAction<number>,
    ) => {
      console.log(action.payload);
      state.createAttributeForm.attributeValues.splice(action.payload, 1);
    },
    setAttributes: (
      state,
      action: PayloadAction<ProductionCodeAttributeResponse[]>,
    ) => {
      state.attributes = action.payload;
    },
    addAttributeToAttributes: (
      state,
      action: PayloadAction<ProductionCodeAttributeResponse>,
    ) => {
      state.attributes.push(action.payload);
      state.createAttributeForm = {
        attributeName: '',
        attributeValues: [],
      };
    },
    setUpdateAttributeForm: (
      state,
      action: PayloadAction<UpdateProductionCodeAttributeRequest>,
    ) => {
      state.updateAttributeForm = action.payload;
    },
    setUpdateAttributeNames: (state, action) => {
      state.updateAttributeForm.attributeName = action.payload;
    },
    addAttributeValueToUpdateForm: state => {
      state.updateAttributeForm.attributeValues.push({
        id: 0,
        value: '',
      });
    },
    updateAttributeValueInUpdateForm: (
      state,
      action: PayloadAction<{
        index: number;
        key: keyof CreateProductionCodeAttributeValueRequest;
        value: any;
      }>,
    ) => {
      state.updateAttributeForm.attributeValues[action.payload.index][
        action.payload.key
      ] = action.payload.value;
    },
    removeAttributeValueFromUpdateForm: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.updateAttributeForm.attributeValues.splice(action.payload, 1);
    },
    updateAttributeToAttributes: (
      state,
      action: PayloadAction<ProductionCodeAttributeResponse>,
    ) => {
      const index = state.attributes.findIndex(x => x.id === action.payload.id);
      if (index !== -1) {
        state.attributes[index] = action.payload;
      }
    },
    removeAttributeFromAttributes: (state, action: PayloadAction<number>) => {
      const index = state.attributes.findIndex(x => x.id === action.payload);
      if (index !== -1) {
        state.attributes.splice(index, 1);
      }
    },
  },
});
export const ProductionCodeAttributeActions =
  productionCodeAttributeSlice.actions;
export default productionCodeAttributeSlice.reducer;
