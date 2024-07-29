import ContractResponse from '../dto/Response/ContractResponse';
import LanguageResponse from '../dto/Response/LanguageResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import {baseApi} from '../store/api';
import {AppSettingActions} from '../store/features/appSettingReducer';

const appSettingApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getLanguages: builder.mutation<ServiceResponse<LanguageResponse>, void>({
      query: () => ({
        url: '/language/languages',
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(AppSettingActions.setLanguages(data.list));
        } catch (err) {
          console.error('Query failed', err);
        }
      },
    }),
    getContracts: builder.mutation<ServiceResponse<ContractResponse>, void>({
      query: () => ({
        url: '/contract',
        method: 'GET',
      }),
    }),
  }),
});
export const {useGetLanguagesMutation, useGetContractsMutation} = appSettingApi;
