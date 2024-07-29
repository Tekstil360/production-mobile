import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

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

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQuery,
  endpoints: builder => ({}),
});
