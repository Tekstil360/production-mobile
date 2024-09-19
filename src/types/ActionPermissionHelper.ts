import UserPermissionResponse from '../dto/Response/User/UserPermissionResponse';
import {ActionPermissions} from './Navigator';

class ActionPermissionHelper {
  private canPage = (
    actionPermissions: Array<ActionPermissions>,
    pageName?: string,
  ) => {
    return (
      actionPermissions.find(item => item.action.includes(pageName || ''))
        ?.permission || false
    );
  };
  private canCreate(actionPermissions: Array<ActionPermissions>) {
    return (
      actionPermissions.find(item => item.action.includes('Create'))
        ?.permission || false
    );
  }
  private canUpdate(actionPermissions: Array<ActionPermissions>) {
    return (
      actionPermissions.find(item => item.action.includes('Update'))
        ?.permission || false
    );
  }
  private canDelete(actionPermissions: Array<ActionPermissions>) {
    return (
      actionPermissions.find(item => item.action.includes('Delete'))
        ?.permission || false
    );
  }
  private canDetail(actionPermissions: Array<ActionPermissions>) {
    return (
      actionPermissions.find(item => item.action.includes('Detail'))
        ?.permission || false
    );
  }
  public canPermission(
    actionPermissions: Array<ActionPermissions>,
    pageName?: string,
  ) {
    return {
      canPage: this.canPage(actionPermissions, pageName),
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
