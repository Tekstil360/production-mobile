import CreateProductionCodePropertyItemRequest from './CreateProductionCodePropertyItemRequest';

interface CreateProductionCodePropertyRequest {
  name: string;
  productionPropertyItems: CreateProductionCodePropertyItemRequest[];
}
export default CreateProductionCodePropertyRequest;
