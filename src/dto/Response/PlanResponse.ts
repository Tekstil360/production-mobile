import PlanDescriptionResponse from './PlanDescriptionResponse';

interface PlanResponse {
  id: number;
  planName: string;
  description: string;
  price: number;
  currency: string;
  planDescriptions: PlanDescriptionResponse[];
}
export default PlanResponse;
