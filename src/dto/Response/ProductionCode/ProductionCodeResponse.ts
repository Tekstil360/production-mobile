import ProductionCodeVariantResponse from './ProductionCodeVariantResponse';

interface ProductionCodeResponse {
  id: number;
  code: string;
  description: string;
  imageSrc?: string;
  isSimpleProduct: boolean;
  variants: ProductionCodeVariantResponse[];
}
export default ProductionCodeResponse;
