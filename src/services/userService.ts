import ServiceResponse from '../dto/Response/ServiceResponse';
import UserPermissionResponse from '../dto/Response/User/UserPermissionResponse';
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
  }),
});
export const {useGetUserPermissionMutation} = userApi;
