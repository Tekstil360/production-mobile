import ServiceResponse from '../dto/Response/ServiceResponse';
import UserPermissionResponse from '../dto/Response/User/UserPermissionResponse';
import UserRoleProduction from '../dto/Response/User/UserRoleProduction';
import {baseApi} from '../store/api';
import {UserActions} from '../store/features/userReducer';

const userApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getUserPermission: build.mutation<
      ServiceResponse<UserPermissionResponse>,
      void
    >({
      query: () => ({
        url: `/user-permission`,
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          if (data.isSuccess) {
            dispatch(UserActions.setUserPermission(data.list));
          }
        } catch (err) {
          console.error('Query failed', err);
        }
      },
    }),
    getUserRoleProduction: build.mutation<
      ServiceResponse<UserRoleProduction>,
      void
    >({
      query: () => ({
        url: `/user/role-productions`,
        method: 'GET',
      }),
    }),
  }),
});
export const {useGetUserPermissionMutation, useGetUserRoleProductionMutation} =
  userApi;
