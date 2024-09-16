import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import UpdateProductionRequest from '../../dto/Request/Production/UpdateProductionRequest';
import ProductionResponse from '../../dto/Response/Production/ProductionResponse';
import CreateProductionRequest from '../../dto/Request/Production/CreateProductionRequest';
import CreateProductionErrorRequest from '../../dto/Request/Production/CreateProductionErrorRequest';
import CreateProductionTransactionRequest from '../../dto/Request/Production/CreateProductionTransactionRequest';
export type StepType = 'production' | 'transaction' | 'productionError';

interface ProductionState {
  productions: ProductionResponse[];
  selectedProduction: ProductionResponse | null;
  step: StepType;
  createProductionRequest: CreateProductionRequest;
  updateProductionRequest: UpdateProductionRequest | null;
  createMultipleProductionRequest: CreateProductionRequest[];
  selectedIndex: number;
}
const INITIAL_STATE: ProductionState = {
  productions: [],
  selectedProduction: null,
  step: 'production',
  selectedIndex: 0,
  createMultipleProductionRequest: [],
  updateProductionRequest: null,
  createProductionRequest: {
    name: '',
    icon: '',
    transactions: [{name: '', icon: '', orderNumber: 1}],
    errors: [],
  },
};

const productionSlice = createSlice({
  name: 'production',
  initialState: INITIAL_STATE,
  reducers: {
    setProductions(state, action) {
      state.productions = action.payload;
    },
    updateProductionsById(state, action: {payload: ProductionResponse}) {
      state.productions = state.productions.map(item =>
        item.id === action.payload.id ? action.payload : item,
      );
    },
    deleteProductionById(state, action: {payload: number}) {
      state.productions = state.productions.filter(
        item => item.id !== action.payload,
      );
    },
    setSelectedProduction(state, action: {payload: ProductionResponse}) {
      state.selectedProduction = action.payload;
    },
    setStep(state, action: {payload: StepPayload}) {
      state.step = action.payload.step;
    },
    handleCreateProductionRequest(
      state,
      action: PayloadAction<{
        key: keyof CreateProductionRequest;
        value: any;
      }>,
    ) {
      state.createProductionRequest[action.payload.key] = action.payload.value;
    },
    handleCreateProductionErrorRequest(
      state,
      action: PayloadAction<{
        key: keyof CreateProductionErrorRequest;
        value: any;
        indexNumber: number;
      }>,
    ) {
      let temp = [...state.createProductionRequest.errors];
      temp[action.payload.indexNumber][action.payload.key] =
        action.payload.value;
    },
    handleCreateProductionTransactionRequest(
      state,
      action: PayloadAction<{
        key: keyof CreateProductionTransactionRequest;
        value: any;
        indexNumber: number;
      }>,
    ) {
      let temp = [...state.createProductionRequest.transactions] as any;
      temp[action.payload.indexNumber][action.payload.key] =
        action.payload.value;
    },
    setCreateProductionRequest(
      state,
      action: {payload: {entity: CreateProductionRequest}},
    ) {
      if (action.payload.entity) {
        state.createProductionRequest = action.payload.entity;
      }
    },
    addTransaction(state) {
      state.createProductionRequest.transactions.push({
        name: '',
        icon: '',
        orderNumber: state.createProductionRequest.transactions.length + 1,
      });
    },
    addError(state) {
      state.createProductionRequest.errors.push({
        name: '',
      });
    },
    removeTransaction(state, action: PayloadAction<number>) {
      state.createProductionRequest.transactions.splice(action.payload, 1);
    },
    setSelectedIndex(state, action: PayloadAction<number>) {
      state.selectedIndex = action.payload;
    },
    removeError(state, action: PayloadAction<number>) {
      state.createProductionRequest.errors.splice(action.payload, 1);
    },
    setCreateProductionErrorRequest(
      state,
      action: PayloadAction<CreateProductionErrorRequest[]>,
    ) {
      state.createProductionRequest.errors = action.payload;
    },
    resetCreateProductionRequest(state) {
      state.step = 'production';
      state.createProductionRequest = {
        name: '',
        icon: '',
        transactions: [{name: '', icon: '', orderNumber: 1}],
        errors: [],
      };
    },
    resetCreateMultipleProductionRequest(state) {
      state.createMultipleProductionRequest = [];
    },
    addCreateMultipleProductionRequest(state) {
      state.createMultipleProductionRequest.push(state.createProductionRequest);
      state.createProductionRequest = {
        name: '',
        icon: '',
        transactions: [{name: '', icon: '', orderNumber: 1}],
        errors: [],
      };
    },
    setCreateMultipleProductionRequest(
      state,
      action: {payload: {entity: CreateProductionRequest[]}},
    ) {
      if (action.payload.entity) {
        state.createMultipleProductionRequest = action.payload.entity;
      }
    },
    setUpdateProductionRequest(
      state,
      action: {payload: {entity: UpdateProductionRequest}},
    ) {
      if (action.payload.entity) {
        state.updateProductionRequest = action.payload.entity;
      }
    },
    handleUpdateProductionRequest(
      state,
      action: PayloadAction<{key: keyof UpdateProductionRequest; value: any}>,
    ) {
      let temp = {...state.updateProductionRequest} as any;
      temp[action.payload.key] = action.payload.value;
      state.updateProductionRequest = temp;
    },
    handleUpdateProductionTransactionRequest(
      state,
      action: PayloadAction<{
        key: keyof UpdateProductionRequest;
        value: any;
        indexNumber: number;
      }>,
    ) {
      let temp = [...(state.updateProductionRequest?.transactions as any)];
      temp[action.payload.indexNumber][action.payload.key] =
        action.payload.value;
    },
    handleUpdateProductionErrorRequest(
      state,
      action: PayloadAction<{
        key: keyof UpdateProductionRequest;
        value: any;
        indexNumber: number;
      }>,
    ) {
      let temp = [...(state.updateProductionRequest?.errors as any)];
      temp[action.payload.indexNumber][action.payload.key] =
        action.payload.value;
    },
    addUpdateError(state) {
      state.updateProductionRequest?.errors.push({
        name: '',
        id: 0,
      });
    },
    addUpdateTransaction(state) {
      state.updateProductionRequest?.transactions.push({
        name: '',
        id: 0,
        icon: '',
        orderNumber: state.updateProductionRequest.transactions
          ? state.updateProductionRequest.transactions.length + 1
          : 1,
      });
    },
    removeUpdateTransaction(state, action: PayloadAction<number>) {
      state.updateProductionRequest?.transactions.splice(action.payload, 1);
    },
    removeUpdateError(state, action: PayloadAction<number>) {
      state.updateProductionRequest?.errors.splice(action.payload, 1);
    },
    resetUpdateProductionRequest(state) {
      state.updateProductionRequest = null;
      state.step = 'production';
    },
  },
});

export const productionReducer = productionSlice.reducer;
export const ProductionActions = productionSlice.actions;

export const getInUseProduction = (state: ProductionState) => {
  return state.productions.find(item => item.inUse);
};

interface StepPayload {
  step: StepType;
}
