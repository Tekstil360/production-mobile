interface UpdateSeasonRequest {
  id: number;
  seasonName: string;
  status: 'ACTIVE' | 'INACTIVE';
}
export default UpdateSeasonRequest;
