import RoleResponse from './RoleResponse';

interface LoginResponse {
  id: number;
  customerId: number;
  token: string;
  type: string;
  refreshToken: string;
  email: string;
  roles: RoleResponse[];
}
export default LoginResponse;
