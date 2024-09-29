import CreateProductionCodeVariantAttributeRequest from './CreateProductionCodeVariantAttributeRequest';

interface CreateProductionCodeRequest {
  code: string;
  description: string;
  imageFile?: string;
  variantAttributes: CreateProductionCodeVariantAttributeRequest[];
}
export default CreateProductionCodeRequest;
