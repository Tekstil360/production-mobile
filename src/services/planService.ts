import AlertDialog from '../components/AlertDialog/AlertDialog';
import PlanResponse from '../dto/Response/PlanResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import {baseApi} from '../store/api';
import {PlanActions} from '../store/features/planReducer';

const planApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getPlans: builder.mutation<ServiceResponse<PlanResponse>, void>({
      query: () => ({
        url: '/plan/plans',
        method: 'GET',
      }),
      onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
        AlertDialog.showLoading();
        const {data} = await queryFulfilled;
        dispatch(PlanActions.setPlans(data.list));
        if (data.list.length > 0) {
          dispatch(PlanActions.setSelectedPlan(data.list[0]));
        }
        AlertDialog.hideLoading();
      },
    }),
  }),
});
export const {useGetPlansMutation} = planApi;
