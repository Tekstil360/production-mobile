import PlanResponse from '../dto/Response/PlanResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import {baseApi} from '../store/api';

const planApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPlans: builder.mutation<ServiceResponse<PlanResponse>, void>({
      query: () => ({
        url: '/plan/plans',
        method: 'GET',
      }),
    }),
  }),
});
export const {useGetPlansMutation} = planApi;
