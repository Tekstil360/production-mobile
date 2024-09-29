import ProductionCodeVariantAttributeResponse from './ProductionCodeVariantAttributeResponse';

interface ProductionCodeVariantResponse {
  variantId: number;
  sku: string;
  stockQuantity: number;
  fullVariantName: string;
  variantAttributes: ProductionCodeVariantAttributeResponse[];
}
export default ProductionCodeVariantResponse;
