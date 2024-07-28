import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomNavigator from './BottomNavigator';
import DrawerContent from './DrawerContent';
import {SIZES} from '../constant/theme';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
const Drawer = createDrawerNavigator();
export default function DrawerNavigator() {
  const drawerSeasonOpen = useSelector(
    (x: RootState) => x.app.drawerSeasonOpen,
  );
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <DrawerContent drawerSeasonOpen={drawerSeasonOpen} {...props} />
      )}
      screenOptions={{
        drawerStyle: {
          width: drawerSeasonOpen ? SIZES.width : SIZES.width * 0.7,
        },
        swipeEnabled: drawerSeasonOpen ? false : true,
        headerShown: false,
      }}>
      <Drawer.Screen name="BottomNavigator" component={BottomNavigator} />
    </Drawer.Navigator>
  );
}
