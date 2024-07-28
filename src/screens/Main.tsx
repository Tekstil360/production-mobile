import {useEffect} from 'react';
import {useGetSeasonMutation} from '../services/seasonService';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../types/Navigator';
import {useGetProduciontsMutation} from '../services/productionService';
import {useGetUserMutation} from '../services/authService';

export default function Main(
  props: NativeStackScreenProps<RootStackParamList, 'Main'>,
) {
  const {navigation} = props;
  const [getProductions] = useGetProduciontsMutation();
  const [getUser] = useGetUserMutation();
  useEffect(() => {
    loadProduction();
    loadUser();
  }, []);

  const loadUser = () => {
    getUser();
  };

  const loadProduction = () => {
    getProductions()
      .unwrap()
      .then(res => {
        if (res.count === 0) {
          navigation.replace('ProductionSplash');
        } else {
          navigation.replace('DrawerNavigator', {welcome: false});
        }
      });
  };
  return null;
}
