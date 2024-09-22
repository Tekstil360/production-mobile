import AlertDialog from '../components/AlertDialog/AlertDialog';
import CreateProductionCodePropertyRequest from '../dto/Request/ProductionCode/CreateProductionCodePropertyRequest';
import UpdateProductionCodePropertyRequest from '../dto/Request/ProductionCode/UpdateProductionCodePropertyRequest';
import ProductionCodePropertyResponse from '../dto/Response/ProductionCode/ProductionCodePropertyResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import {baseApi} from '../store/api';
import {ProductionCodePropertyActions} from '../store/features/productionCodePropertyReducer';

const productionCodePropertyApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createProductionProperty: builder.mutation<
      ServiceResponse<ProductionCodePropertyResponse>,
      CreateProductionCodePropertyRequest & {onClose: () => void}
    >({
      query: data => ({
        url: '/productioncodeproperty',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          const {data} = await queryFulfilled;
          AlertDialog.hideLoading();
          if (data.isSuccess) {
            AlertDialog.success('Ürün özelliği başarıyla eklendi.');
            dispatch(
              ProductionCodePropertyActions.addProductionCodeProperty(
                data.entity,
              ),
            );
            arg.onClose();
          } else {
            AlertDialog.error('Ürün özelliği eklenirken hata oluştu.');
          }
        } catch (error) {
          AlertDialog.hideLoading();
        }
      },
    }),
    getProductionProperties: builder.mutation<
      ServiceResponse<ProductionCodePropertyResponse>,
      void
    >({
      query: () => ({
        url: '/productioncodeproperty',
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          const {data} = await queryFulfilled;
          AlertDialog.hideLoading();
          if (data.isSuccess) {
            dispatch(
              ProductionCodePropertyActions.setProductionCodeProperties(
                data.list,
              ),
            );
          }
        } catch (error) {
          AlertDialog.hideLoading();
          AlertDialog.error('Ürün özellikleri getirilirken hata oluştu.');
        }
      },
    }),
    getProductionPropertyById: builder.mutation<
      ServiceResponse<ProductionCodePropertyResponse>,
      {id: number; openUpdateSheet: () => void}
    >({
      query: entity => ({
        url: `/productioncodeproperty/${entity.id}`,
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          const {data} = await queryFulfilled;
          AlertDialog.hideLoading();
          console.log(data);
          if (data.isSuccess) {
            dispatch(
              ProductionCodePropertyActions.setUpdateProductionCodeProperty(
                data.entity,
              ),
            );
            arg.openUpdateSheet();
          }
        } catch (error) {
          AlertDialog.hideLoading();
        }
      },
    }),
    updateProductionProperty: builder.mutation<
      ServiceResponse<ProductionCodePropertyResponse>,
      UpdateProductionCodePropertyRequest
    >({
      query: data => ({
        url: '/productioncodeproperty/update',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          const {data} = await queryFulfilled;
          AlertDialog.hideLoading();
          if (data.isSuccess) {
            AlertDialog.success('Ürün özelliği başarıyla güncellendi.');
            dispatch(
              ProductionCodePropertyActions.setUpdateProductionCodeProperties(
                data.entity,
              ),
            );
          } else {
            AlertDialog.error('Ürün özelliği güncellenirken hata oluştu.');
          }
        } catch (error) {
          AlertDialog.hideLoading();
        }
      },
    }),
    deleteProductionProperty: builder.mutation<
      ServiceResponse<void>,
      {id: number; onClose: () => void}
    >({
      query: data => ({
        url: `/productioncodeproperty/delete/${data.id}`,
        method: 'POST',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          const {data} = await queryFulfilled;
          AlertDialog.hideLoading();
          if (data.isSuccess) {
            AlertDialog.success('Ürün özelliği başarıyla silindi.');
            dispatch(
              ProductionCodePropertyActions.removeProductionCodeProperty(
                arg.id,
              ),
            );
            arg.onClose();
          } else {
            AlertDialog.error('Ürün özelliği silinirken hata oluştu.');
          }
        } catch (error) {
          AlertDialog.hideLoading();
        }
      },
    }),
  }),
});
export const {
  useCreateProductionPropertyMutation,
  useGetProductionPropertiesMutation,
  useGetProductionPropertyByIdMutation,
  useUpdateProductionPropertyMutation,
  useDeleteProductionPropertyMutation,
} = productionCodePropertyApi;
