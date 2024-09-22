import {useSelector} from 'react-redux';

import {useMemo} from 'react';
import ActionPermissionHelper from '../types/ActionPermissionHelper';
import {RootState} from '../store';

const useHasPermission = (screenName: string): boolean => {
  const userPermission = useSelector(
    (state: RootState) => state.user.userPermission,
  );
  return useMemo(() => {
    let check =
      ActionPermissionHelper.getPermissionScreenListByScreenName(
        userPermission,
        screenName,
      ) === undefined
        ? false
        : true;

    return check;
  }, [userPermission, screenName]);
};

export default useHasPermission;
