import ProductionCodePropertyItemResponse from './ProductionCodePropertyItemResponse';

interface ProductionCodePropertyResponse {
  id: number;
  name: string;
  productionPropertyItems: ProductionCodePropertyItemResponse[];
}
export default ProductionCodePropertyResponse;
