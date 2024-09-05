import ServiceResponse from '../dto/Response/ServiceResponse';
import {baseApi} from '../store/api';

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    cancelSubscription: build.mutation<ServiceResponse<Boolean>, void>({
      query: () => ({
        url: '/subscription/cancel-subscription',
        method: 'POST',
      }),
    }),
  }),
});
export const {useCancelSubscriptionMutation} = subscriptionApi;
