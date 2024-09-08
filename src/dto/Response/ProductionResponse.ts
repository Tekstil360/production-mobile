import ProductionErrorResponse from './ProductionErrorResponse';
import ProductionTransactionResponse from './ProductionTransactionResponse';

interface ProductionResponse {
  id: number;
  customerId: number;
  name: string;
  status: string;
  icon: string;
  productionTransactionList: ProductionTransactionResponse[];
  productionErrorList: ProductionErrorResponse[];
}
export default ProductionResponse;
