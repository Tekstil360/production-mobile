import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomNavigator from './BottomNavigator';
import DrawerContent from './DrawerContent';
import {SIZES} from '../constant/theme';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {RootStackParamList} from '../types/Navigator';

import {useGetSeasonMutation} from '../services/seasonService';
import useHasPermission from '../hooks/useHasPermission';
const Drawer = createDrawerNavigator();
export default function DrawerNavigator(
  props: NativeStackScreenProps<RootStackParamList, 'DrawerNavigator'>,
) {
  const canSeason = useHasPermission('Season');
  const [getSeason] = useGetSeasonMutation();
  const drawerSeasonOpen = useSelector(
    (x: RootState) => x.app.drawerSeasonOpen,
  );
  let isFocused = props.navigation.isFocused();
  useEffect(() => {
    if (isFocused && canSeason) {
      getSeason();
    }
  }, [isFocused, canSeason]);
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent />}
      screenOptions={{
        drawerStyle: {
          width: drawerSeasonOpen ? SIZES.width : SIZES.width * 0.7,
        },
        swipeEnabled: drawerSeasonOpen ? false : true,
        headerShown: false,
      }}>
      <Drawer.Screen
        name="BottomNavigator"
        initialParams={{...props.route.params}}
        component={BottomNavigator}
      />
    </Drawer.Navigator>
  );
}
