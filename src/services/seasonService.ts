import SeasonResponse from '../dto/Response/SeasonResponse';
import ServiceResponse from '../dto/Response/ServiceResponse';
import {baseApi} from '../store/api';
import {SeasonActions} from '../store/features/seasonReducer';

const seasonApi = baseApi.injectEndpoints({
  endpoints(build) {
    return {
      getSeason: build.mutation<ServiceResponse<SeasonResponse>, void>({
        query(arg) {
          return {
            url: `/season`,
            method: 'GET',
          };
        },
        async onQueryStarted(arg, {dispatch, queryFulfilled}) {
          try {
            const {data} = await queryFulfilled;
            if (data.isSuccess) {
              dispatch(SeasonActions.setSeasons(data.list));
            }
          } catch (err) {
            console.error('Query failed', err);
          }
        },
      }),
    };
  },
});
export const {useGetSeasonMutation} = seasonApi;
