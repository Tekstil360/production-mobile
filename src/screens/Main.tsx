import {useEffect} from 'react';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../types/Navigator';
import {useGetUserMutation} from '../services/authService';

import {useGetProductionsMutation} from '../services/productionService';

export default function Main({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Main'>) {
  const [getUser] = useGetUserMutation();
  const [useProductions] = useGetProductionsMutation();

  useEffect(() => {
    const fetchData = async () => {
      const {data: userData} = await getUser();
      if (userData) {
        const {data} = await useProductions();
        if (data?.count === 0) {
          navigation.replace('ProductionSplash');
        } else {
          navigation.replace('DrawerNavigator', {welcome: false});
        }
      }
    };

    fetchData();
  }, []);

  return null;
}
