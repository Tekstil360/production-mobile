import LoginDto from '../dto/Request/LoginDto';
import SignUpRequest from '../dto/Request/SignUpRequest';
import LoginResponse from '../dto/Response/LoginResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import {baseApi} from '../store/api';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ServiceResponse<LoginResponse>, LoginDto>({
      query: (body: LoginDto) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation<ServiceResponse<LoginResponse>, LoginDto>({
      query: (body: SignUpRequest) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),
    getMe: builder.query<ServiceResponse<LoginResponse>, void>({
      query: () => ({
        url: 'v1/auth/me',
        method: 'GET',
      }),
    }),
  }),
});
export const {useLoginMutation, useGetMeQuery} = authApi;
