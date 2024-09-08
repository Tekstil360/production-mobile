import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import ProductionResponse from '../../dto/Response/ProductionResponse';
import CreateProductionRequest from '../../dto/Request/CreateProductionRequest';
import CreateProductionErrorRequest from '../../dto/Request/CreateProductionErrorRequest';
import CreateProductionTransactionRequest from '../../dto/Request/CreateProductionTransactionRequest';

export type StepType = 'production' | 'transaction' | 'productionError';

interface ProductionState {
  productions: ProductionResponse[];
  production: ProductionResponse | null;
  step: StepType;
  createProductionRequest: CreateProductionRequest;
  createMultipleProductionRequest: CreateProductionRequest[];
  selectedIndex: number;
}
const INITIAL_STATE: ProductionState = {
  productions: [],
  production: null,
  step: 'production',
  selectedIndex: 0,
  createMultipleProductionRequest: [],
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
    setProduction(state, action: {payload: ProductionResponse}) {
      state.production = action.payload;
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
  },
});

export const productionReducer = productionSlice.reducer;
export const ProductionActions = productionSlice.actions;

interface StepPayload {
  step: StepType;
}
