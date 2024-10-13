import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import CreateProductionCodeRequest from '../../dto/Request/ProductionCode/CreateProductionCodeRequest';
import CreateProductionCodeVariantAttributeRequest from '../../dto/Request/ProductionCode/CreateProductionCodeVariantAttributeRequest';
import ProductionCodeResponse from '../../dto/Response/ProductionCode/ProductionCodeResponse';

interface ProductionCodeState {
  productionCodes: ProductionCodeResponse[];
  productionCode: ProductionCodeResponse | null;
  step: 'ProductionCodeInfo' | 'ProductionCodeProperties';
  createProductionCodeForm: CreateProductionCodeRequest;
}
const initialState: ProductionCodeState = {
  productionCodes: [],
  productionCode: {} as ProductionCodeResponse,
  step: 'ProductionCodeInfo',
  createProductionCodeForm: {
    code: '',
    description: '',
    variantAttributes: [],
  },
};
const productionCodeSlice = createSlice({
  name: 'productionCode',
  initialState,
  reducers: {
    resetCreateProductionCodeForm(state) {
      state.createProductionCodeForm = {
        code: '',
        description: '',
        imageFile: '',
        variantAttributes: [],
      };
      state.step = 'ProductionCodeInfo';
    },
    setStep(state, action) {
      state.step = action.payload;
    },
    setCreateProductionCodeForm(
      state,
      action: PayloadAction<{
        key: keyof CreateProductionCodeRequest;
        value: any;
      }>,
    ) {
      state.createProductionCodeForm[action.payload.key] = action.payload.value;
    },
    setProductionCode(
      state,
      action: PayloadAction<ProductionCodeResponse | null>,
    ) {
      state.productionCode = action.payload;
    },
    setCreateProductionCodeVariantAttribute(
      state,
      action: PayloadAction<{
        entity: CreateProductionCodeVariantAttributeRequest;
      }>,
    ) {
      let check = state.createProductionCodeForm.variantAttributes.find(
        x =>
          x.attributeId === action.payload.entity.attributeId &&
          x.attributeValueId === action.payload.entity.attributeValueId,
      );
      if (check) {
        state.createProductionCodeForm.variantAttributes =
          state.createProductionCodeForm.variantAttributes.filter(
            x =>
              x.attributeId !== action.payload.entity.attributeId &&
              x.attributeValueId !== action.payload.entity.attributeValueId,
          );
      } else {
        state.createProductionCodeForm.variantAttributes.push(
          action.payload.entity,
        );
      }
    },
    setProductionCodes(state, action: PayloadAction<ProductionCodeResponse[]>) {
      state.productionCodes = action.payload;
    },
    addProductionCodeToProductionCodes(
      state,
      action: PayloadAction<ProductionCodeResponse>,
    ) {
      state.productionCodes.push(action.payload);
      state.step = 'ProductionCodeInfo';
      state.createProductionCodeForm = {
        code: '',
        description: '',
        variantAttributes: [],
      };
    },
  },
});
export const ProductionCodeActions = productionCodeSlice.actions;
export const productionCodeReducer = productionCodeSlice.reducer;
