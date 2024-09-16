import ProductionErrorResponse from './ProductionErrorResponse';
import ProductionTransactionResponse from './ProductionTransactionResponse';

interface ProductionResponse {
  id: number;
  customerId: number;
  name: string;
  status: string;
  icon: string;
  inUse: boolean;
  transactions: ProductionTransactionResponse[];
  errors: ProductionErrorResponse[];
}
export default ProductionResponse;
