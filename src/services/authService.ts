import LoginDto from '../dto/Request/LoginDto';
import CreateCustomerRequest from '../dto/Request/CreateCustomerRequest';
import LoginResponse from '../dto/Response/JwtResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import {baseApi} from '../store/api';
import UserResponse from '../dto/Response/UserResponse';
import {AuthActions} from '../store/features/authReducer';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ServiceResponse<LoginResponse>, LoginDto>({
      query: (body: LoginDto) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<
      ServiceResponse<LoginResponse>,
      CreateCustomerRequest
    >({
      query: (body: CreateCustomerRequest) => ({
        url: '/customer/createCustomer',
        method: 'POST',
        body,
      }),
    }),
    getUser: builder.mutation<ServiceResponse<UserResponse>, void>({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          if (data.isSuccess) {
            dispatch(AuthActions.setUserInfo(data.entity));
          }
        } catch (err) {
          console.error('Query failed', err);
        }
      },
    }),
  }),
});
export const {useLoginMutation, useRegisterMutation, useGetUserMutation} =
  authApi;
