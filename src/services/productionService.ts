import CreateProductionRequest from '../dto/Request/CreateProductionRequest';
import ProductionResponse from '../dto/Response/ProductionResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import {baseApi} from '../store/api';
import {ProductionActions} from '../store/features/productionReducer';

const productionService = baseApi.injectEndpoints({
  endpoints: build => ({
    getProductions: build.mutation<ServiceResponse<ProductionResponse>, void>({
      query: () => ({
        url: `production`,
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          if (data.isSuccess) {
            dispatch(ProductionActions.setProductions(data.list));
          }
        } catch (err) {
          console.error('Query failed', err);
        }
      },
    }),
    createProduction: build.mutation<
      ServiceResponse<ProductionResponse>,
      CreateProductionRequest
    >({
      query: data => ({
        url: `/production/single`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: data,
      }),
    }),
  }),
});
export const {useGetProductionsMutation, useCreateProductionMutation} =
  productionService;
