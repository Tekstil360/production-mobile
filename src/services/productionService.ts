import AlertDialog from '../components/AlertDialog/AlertDialog';
import CreateProductionRequest from '../dto/Request/Production/CreateProductionRequest';
import UpdateProductionRequest from '../dto/Request/Production/UpdateProductionRequest';
import ProductionResponse from '../dto/Response/Production/ProductionResponse';
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
          AlertDialog.showLoading();
          const {data} = await queryFulfilled;
          if (data.isSuccess) {
            dispatch(ProductionActions.setProductions(data.list));
          }
          AlertDialog.hideLoading();
        } catch (err) {
          console.error('Query failed', err);
        }
      },
    }),
    getProductionById: build.mutation<
      ServiceResponse<ProductionResponse>,
      number
    >({
      query: id => ({
        url: `production/${id}`,
        method: 'GET',
      }),
      onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          queryFulfilled.then(({data}) => {
            if (data.isSuccess) {
              dispatch(ProductionActions.setSelectedProduction(data.entity));
            }
            AlertDialog.hideLoading();
          });
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
    createMultipleProduction: build.mutation<
      ServiceResponse<ProductionResponse>,
      CreateProductionRequest[]
    >({
      query: data => ({
        url: `/production/multiple`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: data,
      }),
    }),
    updateProduction: build.mutation<
      ServiceResponse<ProductionResponse>,
      UpdateProductionRequest & {onClose: () => void}
    >({
      query: data => ({
        url: `/production`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: data,
      }),
      onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          queryFulfilled.then(({data}) => {
            if (data.isSuccess) {
              dispatch(ProductionActions.updateProductionsById(data.entity));
              dispatch(ProductionActions.resetUpdateProductionRequest());
              dispatch;
            }
            arg.onClose();
            AlertDialog.hideLoading();
          });
        } catch (err) {
          console.error('Query failed', err);
        }
      },
    }),
    deleteProduction: build.mutation<
      ServiceResponse<ProductionResponse>,
      number
    >({
      query: id => ({
        url: `/production/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});
export const {
  useGetProductionsMutation,
  useCreateProductionMutation,
  useCreateMultipleProductionMutation,
  useGetProductionByIdMutation,
  useUpdateProductionMutation,
  useDeleteProductionMutation,
} = productionService;
