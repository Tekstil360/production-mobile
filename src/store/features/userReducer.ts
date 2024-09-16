import {createSlice} from '@reduxjs/toolkit';
import UserPermissionResponse from '../../dto/Response/User/UserPermissionResponse';

interface UserState {
  userPermission: Array<UserPermissionResponse>;
}
const INITIAL_STATE: UserState = {
  userPermission: [],
};
const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setUserPermission(state, action) {
      state.userPermission = action.payload;
    },
  },
});
export const userReducer = userSlice.reducer;
export const UserActions = userSlice.actions;
