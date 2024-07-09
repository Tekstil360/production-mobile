import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import LoginResponse from '../../dto/Response/LoginResponse';
import SignUpRequest from '../../dto/Request/SignUpRequest';

interface AuthState {
  user: LoginResponse | null;
  register: SignUpRequest | null;
}
const INITIAL_STATE: AuthState = {
  user: null,
  register: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    setRegister(state, action: PayloadAction<RegisterActions>) {
      let data = {
        ...state.register,
        [action.payload.key]: action.payload.value,
      } as SignUpRequest;
      state.register = data;
    },
    clearRegister(state) {
      state.register = null;
    },
  },
});
export const authReducer = authSlice.reducer;
export const AuthActions = authSlice.actions;
interface RegisterActions {
  key: keyof SignUpRequest;
  value: any;
}
