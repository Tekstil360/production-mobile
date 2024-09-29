import CreateProductionCodeAttributeValueRequest from './CreateProductionCodeAttributeValueRequest';
import UpdateProductionCodeAttributeRequest from './UpdateProductionCodeAttributeRequest';

interface CreateProductionCodeAttributeRequest {
  attributeName: string;
  attributeValues: CreateProductionCodeAttributeValueRequest[];
}
export default CreateProductionCodeAttributeRequest;
