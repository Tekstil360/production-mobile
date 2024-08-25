import CreateProductionErrorRequest from './CreateProductionErrorRequest';
import CreateProductionTransactionRequest from './CreateProductionTransactionRequest';

interface CreateProductionRequest {
  name: string;
  icon: string;
  errors: CreateProductionErrorRequest[];
  transactions: CreateProductionTransactionRequest[];
}
export default CreateProductionRequest;
