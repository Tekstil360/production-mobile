import {View, Text} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../components/CBottomSheet/CustomBottomSheet';

import FabricScreen from '../screens/Fabric/FabricScreen';
import WelcomeContent from '../components/BottomSheetContent/WelcomeContent';

const Tab = createBottomTabNavigator();
export default function BottomNavigator(props: any) {
  const welcomeBottomSheetRef = useRef<BottomSheetRef>(null);
  const {welcome} = props.route.params;
  useEffect(() => {
    if (welcome) {
      let timeOut = setTimeout(() => {
        welcomeBottomSheetRef.current?.open();
      }, 300);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [welcome, welcomeBottomSheetRef]);
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Anasayfa"
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon icon={faHome} color={color} size={size} />
            ),
          }}
          component={Home}
        />
        <Tab.Screen
          name="Kumaşlar"
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon icon={faHome} color={color} size={size} />
            ),
          }}
          component={FabricScreen}
        />
        <Tab.Screen
          name="Ürün Takibi"
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon icon={faHome} color={color} size={size} />
            ),
          }}
          component={Home}
        />
        <Tab.Screen
          name="Siparişler"
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon icon={faHome} color={color} size={size} />
            ),
          }}
          component={Home}
        />
      </Tab.Navigator>
      <CustomBottomSheet indicator={false} ref={welcomeBottomSheetRef}>
        <WelcomeContent close={() => welcomeBottomSheetRef.current?.close()} />
      </CustomBottomSheet>
    </>
  );
}
