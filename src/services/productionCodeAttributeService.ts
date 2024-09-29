import AlertDialog from '../components/AlertDialog/AlertDialog';
import CreateProductionCodeAttributeRequest from '../dto/Request/ProductionCode/CreateProductionCodeAttributeRequest';
import UpdateProductionCodeAttributeRequest from '../dto/Request/ProductionCode/UpdateProductionCodeAttributeRequest';
import ProductionCodeAttributeResponse from '../dto/Response/ProductionCode/ProductionCodeAttributeResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import {baseApi} from '../store/api';
import {ProductionCodeAttributeActions} from '../store/features/productionCodeAttributeReducer';

const productionCodeAttributeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createAttribute: builder.mutation<
      ServiceResponse<ProductionCodeAttributeResponse>,
      CreateProductionCodeAttributeRequest & {onClose: () => void}
    >({
      query: data => ({
        url: '/productioncodeattribute',
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
            arg.onClose();
            dispatch(
              ProductionCodeAttributeActions.addAttributeToAttributes(
                data.entity,
              ),
            );
          }
        } catch {
          AlertDialog.error('Ürün özelliği eklenirken bir hata oluştu.');
        } finally {
        }
      },
    }),
    getAttributes: builder.mutation<
      ServiceResponse<ProductionCodeAttributeResponse>,
      void
    >({
      query: () => ({
        url: '/productioncodeattribute',
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          const {data} = await queryFulfilled;
          AlertDialog.hideLoading();
          if (data.isSuccess) {
            dispatch(ProductionCodeAttributeActions.setAttributes(data.list));
          }
        } catch {
          AlertDialog.error('Ürün özellikleri getirilirken bir hata oluştu.');
        } finally {
        }
      },
    }),
    getAttributeById: builder.mutation<
      ServiceResponse<ProductionCodeAttributeResponse>,
      {id: number; onOpen: () => void}
    >({
      query: data => ({
        url: `/productioncodeattribute/${data.id}`,
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          const {data} = await queryFulfilled;
          AlertDialog.hideLoading();
          if (data.isSuccess) {
            console.log(data.entity);
            arg.onOpen();
            dispatch(
              ProductionCodeAttributeActions.setUpdateAttributeForm(
                data.entity,
              ),
            );
          }
        } catch {
          AlertDialog.error('Ürün özellikleri getirilirken bir hata oluştu.');
          AlertDialog.hideLoading();
        } finally {
        }
      },
    }),
    updateAttribute: builder.mutation<
      ServiceResponse<ProductionCodeAttributeResponse>,
      UpdateProductionCodeAttributeRequest & {onClose: () => void}
    >({
      query: body => ({
        url: '/productioncodeattribute/update',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          const {data} = await queryFulfilled;
          AlertDialog.hideLoading();
          if (data.isSuccess) {
            arg.onClose();
            AlertDialog.success('Ürün özelliği başarıyla güncellendi.');
            dispatch(
              ProductionCodeAttributeActions.updateAttributeToAttributes(
                data.entity,
              ),
            );
          }
        } catch {
          AlertDialog.error('Ürün özelliği güncellenirken bir hata oluştu.');
          AlertDialog.hideLoading();
        } finally {
        }
      },
    }),
    deleteAttribute: builder.mutation<
      ServiceResponse<boolean>,
      {
        id: number;
        onClose: () => void;
      }
    >({
      query: data => ({
        url: `/productioncodeattribute/delete/${data.id}`,
        method: 'POST',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          const {data} = await queryFulfilled;
          AlertDialog.hideLoading();
          if (data.isSuccess) {
            AlertDialog.success('Ürün özelliği başarıyla silindi.');
            arg.onClose();
            dispatch(
              ProductionCodeAttributeActions.removeAttributeFromAttributes(
                arg.id,
              ),
            );
          }
        } catch {
          AlertDialog.error('Ürün özelliği silinirken bir hata oluştu.');
          AlertDialog.hideLoading();
        } finally {
        }
      },
    }),
  }),
});
export const ProductionCodeAttributeApi = productionCodeAttributeApi;
