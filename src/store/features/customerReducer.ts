import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import CreateCustomerRequest from '../../dto/Request/Customer/CreateCustomerRequest';
import CustomerResponse from '../../dto/Response/Customer/CustomerResponse';

interface CustomerState {
  customers: CustomerResponse[];
  customer: CustomerResponse | null;
  createCustomer: CreateCustomerRequest;
}
const initialState: CustomerState = {
  customers: [],
  createCustomer: {
    firstName: '',
    lastName: '',
    title: '',
    taxNumber: '',
    taxOffice: '',
    address: '',
    phone: '',
    email: '',
    city: '',
    country: '',
    notes: '',
  } as CreateCustomerRequest,
  customer: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomers(state, action: PayloadAction<CustomerResponse[]>) {
      state.customers = action.payload;
    },
    removeCustomer(state, action: PayloadAction<number>) {
      state.customers = state.customers.filter(
        item => item.id !== action.payload,
      );
    },
    addCustomer(state, action: PayloadAction<CustomerResponse>) {
      state.customers.push(action.payload);
      state.createCustomer = {
        firstName: '',
        lastName: '',
        title: '',
        taxNumber: '',
        taxOffice: '',
        address: '',
        phone: '',
        email: '',
        city: '',
        country: '',
        notes: '',
      };
    },
    updateCustomer(state, action: PayloadAction<CustomerResponse>) {
      state.customers = state.customers.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      });
    },
    handleChangeCreateCustomer(
      state,
      action: PayloadAction<{key: keyof CreateCustomerRequest; value: string}>,
    ) {
      state.createCustomer[action.payload.key] = action.payload.value;
    },
    setCustomer(state, action: PayloadAction<CustomerResponse>) {
      state.customer = action.payload;
    },
    handleChangeCustomer(
      state,
      action: PayloadAction<{key: keyof CustomerResponse; value: any}>,
    ) {
      if (state.customer) {
        let temp = {...state.customer} as any;
        temp[action.payload.key] = action.payload.value;
        state.customer = temp;
      }
    },
    clearCustomer(state) {
      state.customer = null;
    },
  },
});
export const CustomerActions = customerSlice.actions;
export const customerReducer = customerSlice.reducer;
