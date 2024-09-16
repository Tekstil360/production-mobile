interface SeasonResponse {
  id: number;
  seasonName: string;
  productionId: number;
  customerId: number;
  isDefault: boolean;
  isActivated: boolean;
  status: 'ACTIVE' | 'INACTIVE';
}
export default SeasonResponse;
