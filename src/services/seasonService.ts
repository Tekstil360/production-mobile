import CreateSeasonRequest from '../dto/Request/Season/CreateSeasonRequest';
import UpdateSeasonRequest from '../dto/Request/Season/UpdateSeasonRequest';
import SeasonResponse from '../dto/Response/Season/SeasonResponse';
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
      createSeason: build.mutation<
        ServiceResponse<SeasonResponse>,
        CreateSeasonRequest
      >({
        query(data) {
          return {
            url: `/season`,
            method: 'POST',
            body: data,
          };
        },
        async onQueryStarted(arg, {dispatch, queryFulfilled}) {
          try {
            const {data} = await queryFulfilled;
            if (data.isSuccess) {
              dispatch(SeasonActions.addSeason(data.entity));
            }
          } catch (err) {
            console.error('Query failed', err);
          }
        },
      }),
      getSeasonById: build.mutation<ServiceResponse<SeasonResponse>, number>({
        query(id) {
          return {
            url: `/season/${id}`,
            method: 'GET',
          };
        },
        async onQueryStarted(arg, {dispatch, queryFulfilled}) {
          try {
            const {data} = await queryFulfilled;
            if (data.isSuccess) {
              dispatch(SeasonActions.setSelectedSeason(data.entity));
            }
          } catch (err) {
            console.error('Query failed', err);
          }
        },
      }),
      deleteSeasonById: build.mutation<ServiceResponse<SeasonResponse>, number>(
        {
          query(id) {
            return {
              url: `/season/${id}`,
              method: 'DELETE',
            };
          },
        },
      ),
      updateSeason: build.mutation<
        ServiceResponse<SeasonResponse>,
        UpdateSeasonRequest
      >({
        query(data) {
          return {
            url: `/season`,
            method: 'PUT',
            body: data,
          };
        },
        async onQueryStarted(arg, {dispatch, queryFulfilled}) {
          try {
            const {data} = await queryFulfilled;
            if (data.isSuccess) {
              dispatch(SeasonActions.updateSeason(data.entity));
            }
          } catch (err) {
            console.error('Query failed', err);
          }
        },
      }),
    };
  },
});
export const {
  useGetSeasonMutation,
  useCreateSeasonMutation,
  useGetSeasonByIdMutation,
  useDeleteSeasonByIdMutation,
  useUpdateSeasonMutation,
} = seasonApi;
