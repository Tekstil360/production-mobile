interface UserPermissionResponse {
  id: number;
  permissionId: number;
  customerId: number;
  userId: number;
  isRead: boolean;
  isWrite: boolean;
  isDelete: boolean;
  isUpdate: boolean;
  createdDate: Date;
  permissionScreenList: string[];
}
export default UserPermissionResponse;
