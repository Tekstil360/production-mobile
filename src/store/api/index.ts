import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchBaseQueryError,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';
import {AuthActions} from '../features/authReducer';

export const BaseUrl = 'http://localhost:8080';

const baseQuery = fetchBaseQuery({
  baseUrl: BaseUrl,
  prepareHeaders: (headers, {getState}: any) => {
    const token = getState().auth.user?.token;
    const lang = getState().app.selectedLanguage;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Accept-Language', lang);
    return headers;
  },
});

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 402) {
    api.dispatch(AuthActions.setSubscriptionExpired(true));
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({}),
});
