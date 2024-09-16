import UserPermissionResponse from '../dto/Response/User/UserPermissionResponse';
import {ActionPermissions} from './Navigator';

class ActionPermissionHelper {
  private canCreate(actionPermissions: Array<ActionPermissions>) {
    return actionPermissions.find(item => item.action.includes('Create'))
      ?.permission;
  }
  private canUpdate(actionPermissions: Array<ActionPermissions>) {
    return actionPermissions.find(item => item.action.includes('Update'))
      ?.permission;
  }
  private canDelete(actionPermissions: Array<ActionPermissions>) {
    return actionPermissions.find(item => item.action.includes('Delete'))
      ?.permission;
  }
  private canDetail(actionPermissions: Array<ActionPermissions>) {
    return actionPermissions.find(item => item.action.includes('Detail'))
      ?.permission;
  }
  public canPermission(actionPermissions: Array<ActionPermissions>) {
    return {
      canCreate: this.canCreate(actionPermissions),
      canUpdate: this.canUpdate(actionPermissions),
      canDelete: this.canDelete(actionPermissions),
      canDetail: this.canDetail(actionPermissions),
    };
  }

  public getPermissionScreenListByScreenName(
    userPermission: Array<UserPermissionResponse>,
    screenName: string,
  ) {
    return userPermission.some(item =>
      item.permissionScreenList.some(screen => screen === screenName),
    );
  }
}
export default new ActionPermissionHelper();
