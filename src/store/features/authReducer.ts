import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import LoginResponse from '../../dto/Response/JwtResponse';
import CreateCustomerRequest from '../../dto/Request/CreateCustomerRequest';
import UserResponse from '../../dto/Response/UserResponse';

interface AuthState {
  user: LoginResponse;
  register: CreateCustomerRequest;
  userInfo: UserResponse;
}
const INITIAL_STATE: AuthState = {
  user: {} as LoginResponse,
  register: {} as CreateCustomerRequest,
  userInfo: {} as UserResponse,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = {} as LoginResponse;
    },
    setRegister(state, action: PayloadAction<RegisterActions>) {
      let data = {
        ...state.register,
        [action.payload.key]: action.payload.value,
      } as CreateCustomerRequest;
      state.register = data;
    },
    setUserInfo(state, action: PayloadAction<UserResponse>) {
      state.userInfo = action.payload;
    },
    clearRegister(state) {
      state.register = {} as CreateCustomerRequest;
    },
  },
});
export const authReducer = authSlice.reducer;
export const AuthActions = authSlice.actions;
interface RegisterActions {
  key: keyof CreateCustomerRequest;
  value: any;
}
