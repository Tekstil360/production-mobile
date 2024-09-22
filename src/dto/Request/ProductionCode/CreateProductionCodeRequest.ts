import CreateProductionCodeGroupItemRequest from './CreateProductionCodeGroupItemRequest';

interface CreateProductionCodeRequest {
  code: string;
  description: string;
  productionCodeGroupItems: Array<CreateProductionCodeGroupItemRequest>;
}
export default CreateProductionCodeRequest;
