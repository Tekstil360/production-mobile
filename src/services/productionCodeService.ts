import AlertDialog from '../components/AlertDialog/AlertDialog';
import CreateProductionCodeRequest from '../dto/Request/ProductionCode/CreateProductionCodeRequest';
import ProductionCodeResponse from '../dto/Response/ProductionCode/ProductionCodeResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import {baseApi} from '../store/api';
import {ProductionCodeActions} from '../store/features/productionCodeReducer';

const productionCodeApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createProductionCode: build.mutation<
      ServiceResponse<ProductionCodeResponse>,
      {formData: FormData; onClose: () => void}
    >({
      query: body => ({
        url: '/productioncode',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: body.formData,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          let {data} = await queryFulfilled;
          AlertDialog.hideLoading();
          if (data.isSuccess) {
            arg.onClose();
            dispatch(
              ProductionCodeActions.addProductionCodeToProductionCodes(
                data.entity,
              ),
            );
            AlertDialog.success('Ürün kodu başarıyla eklendi');
          } else {
            AlertDialog.error(data.exceptionMessage);
          }
        } catch (error) {
          AlertDialog.hideLoading();
        }
      },
    }),
    getProductionCodes: build.mutation<
      ServiceResponse<ProductionCodeResponse>,
      void
    >({
      query: () => ({
        url: '/productioncode',
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          let {data} = await queryFulfilled;
          AlertDialog.hideLoading();
          if (data.isSuccess) {
            dispatch(ProductionCodeActions.setProductionCodes(data.list));
          }
        } catch (error) {
          AlertDialog.hideLoading();
        } finally {
        }
      },
    }),
  }),
});
const ProductionCodeApi = productionCodeApi;
export default ProductionCodeApi;
