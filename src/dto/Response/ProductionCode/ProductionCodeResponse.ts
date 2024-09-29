import ProductionCodeVariantResponse from './ProductionCodeVariantResponse';

interface ProductionCodeResponse {
  id: number;
  code: string;
  description: string;
  imageSrc?: string;
  variants: ProductionCodeVariantResponse[];
}
export default ProductionCodeResponse;
