import AlertDialog from '../components/AlertDialog/AlertDialog';
import CreateCustomerRequest from '../dto/Request/Customer/CreateCustomerRequest';
import UpdateCustomerRequest from '../dto/Request/Customer/UpdateCustomerRequest';
import CustomerResponse from '../dto/Response/Customer/CustomerResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import {baseApi} from '../store/api';
import {CustomerActions} from '../store/features/customerReducer';

const customerApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createCustomer: builder.mutation<
      ServiceResponse<CustomerResponse>,
      CreateCustomerRequest & {onClose: () => void}
    >({
      query: body => ({
        url: '/customer/create',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          const {data} = await queryFulfilled;
          AlertDialog.hideLoading();
          if (data.isSuccess) {
            dispatch(CustomerActions.addCustomer(data.entity));
            AlertDialog.success('Müşteri başarıyla eklendi.');
            arg.onClose();
          } else {
            AlertDialog.warning(data.exceptionMessage);
          }
        } catch (error) {
          AlertDialog.warning('Müşteri eklenirken bir hata oluştu.');
        }
      },
    }),
    getCustomers: builder.mutation<ServiceResponse<CustomerResponse>, void>({
      query: () => ({
        url: '/customer',
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          const {data} = await queryFulfilled;
          if (data.isSuccess) {
            dispatch(CustomerActions.setCustomers(data.list));
          }
        } catch (error) {
          console.error('Query failed', error);
        } finally {
          AlertDialog.hideLoading();
        }
      },
    }),
    getCustomerById: builder.mutation<
      ServiceResponse<CustomerResponse>,
      number
    >({
      query: id => ({
        url: `/customer/${id}`,
        method: 'GET',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          const {data} = await queryFulfilled;
          AlertDialog.hideLoading();
          if (data.isSuccess) {
            dispatch(CustomerActions.setCustomer(data.entity));
          }
        } catch (error) {
          console.error('Query failed', error);
        }
      },
    }),
    updateCustomer: builder.mutation<
      ServiceResponse<CustomerResponse>,
      UpdateCustomerRequest & {onClose: () => void}
    >({
      query: body => ({
        url: '/customer/update',
        method: 'POST',
        body,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          const {data} = await queryFulfilled;
          AlertDialog.hideLoading();
          if (data.isSuccess) {
            dispatch(CustomerActions.updateCustomer(data.entity));
            AlertDialog.success('Müşteri başarıyla güncellendi.');
            arg.onClose();
          } else {
            AlertDialog.warning(data.exceptionMessage);
          }
        } catch (error) {
          AlertDialog.warning('Müşteri güncellenirken bir hata oluştu.');
        } finally {
        }
      },
    }),
    deleteCustomer: builder.mutation<
      ServiceResponse<CustomerResponse>,
      {id: number; onClose: () => void}
    >({
      query: data => ({
        url: `/customer/delete/${data.id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          AlertDialog.showLoading();
          const {data} = await queryFulfilled;
          AlertDialog.hideLoading();
          if (data.isSuccess) {
            dispatch(CustomerActions.removeCustomer(arg.id));
            AlertDialog.success('Müşteri başarıyla silindi.');
            arg.onClose();
          } else {
            AlertDialog.warning(data.exceptionMessage);
          }
        } catch (error) {
          AlertDialog.warning('Müşteri silinirken bir hata oluştu.');
        }
      },
    }),
  }),
});
export const {
  useCreateCustomerMutation,
  useGetCustomersMutation,
  useGetCustomerByIdMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
