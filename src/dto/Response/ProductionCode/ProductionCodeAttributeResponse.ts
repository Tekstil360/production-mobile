import ProductionCodeAttributeValueResponse from './ProductionCodeAttributeValueResponse';

interface ProductionCodeAttributeResponse {
  id: number;
  attributeName: string;
  attributeValues: ProductionCodeAttributeValueResponse[];
}
export default ProductionCodeAttributeResponse;
