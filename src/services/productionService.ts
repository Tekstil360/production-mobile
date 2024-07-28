import CreateProductionRequest from '../dto/Request/CreateProductionRequest';
import ProductionResponse from '../dto/Response/ProductionResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import {baseApi} from '../store/api';

const productionService = baseApi.injectEndpoints({
  endpoints: build => ({
    getProducionts: build.mutation<ServiceResponse<ProductionResponse>, void>({
      query: () => ({
        url: `production`,
        method: 'GET',
      }),
    }),
    createProduction: build.mutation<
      ServiceResponse<ProductionResponse>,
      CreateProductionRequest[]
    >({
      query: data => ({
        url: `production`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: data,
      }),
    }),
  }),
});
export const {useGetProduciontsMutation, useCreateProductionMutation} =
  productionService;
