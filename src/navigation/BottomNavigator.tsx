import {View, Text, TouchableOpacity} from 'react-native';
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
import useThemeColors from '../constant/useColor';
import Icon from '../components/Icon/Icon';
import JeansPantsSvg from '../assets/productions/JeansPantsSvg';
import {SvgXml} from 'react-native-svg';
import {ICONS} from '../constant/theme';

const Tab = createBottomTabNavigator();
export default function BottomNavigator(props: any) {
  const colors = useThemeColors();
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
          tabBarStyle: {
            backgroundColor: colors.primary,
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Tab.Screen
          name="Anasayfa"
          options={{
            tabBarIcon: ({focused, size}) => (
              <Icon
                color={!focused ? colors.unActiveBottomTab : '#564839'}
                icon={faHome}
                size={size}
              />
            ),
            tabBarActiveTintColor: '#564839',
            tabBarInactiveTintColor: colors.unActiveBottomTab,
          }}
          component={Home}
        />
        <Tab.Screen
          name="Kumaşlar"
          options={{
            tabBarIcon: ({focused, size}) => (
              <SvgXml
                color={!focused ? colors.unActiveBottomTab : '#564839'}
                xml={ICONS.Fabric}
                width={'35'}
                height={'35'}
              />
            ),
            tabBarActiveTintColor: '#564839',
            tabBarInactiveTintColor: colors.unActiveBottomTab,
          }}
          component={FabricScreen}
        />
        <Tab.Screen
          name="mycart"
          component={Home}
          listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault();
            },
          })}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color, size}) => (
              <TouchableOpacity
                onPress={() => {}}
                activeOpacity={0.7}
                style={{
                  position: 'absolute',
                  bottom: 5,
                  height: 58,
                  width: 58,
                  borderRadius: 58,
                  backgroundColor: colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.4,
                  shadowRadius: 4.84,
                  elevation: 5,
                }}>
                <JeansPantsSvg width={32} height={32} fill="#564839" />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Ürün Takibi"
          options={{
            tabBarIcon: ({focused, size}) => (
              <SvgXml
                color={!focused ? colors.unActiveBottomTab : '#564839'}
                height={'30'}
                width={'35'}
                xml={ICONS.Tracking}
              />
            ),
            tabBarActiveTintColor: '#564839',
            tabBarInactiveTintColor: colors.unActiveBottomTab,
          }}
          component={Home}
        />

        <Tab.Screen
          name="Siparişler"
          options={{
            tabBarIcon: ({focused, size}) => (
              <SvgXml
                color={!focused ? colors.unActiveBottomTab : '#564839'}
                height={'30'}
                width={'35'}
                xml={ICONS.Orders}
              />
            ),
            tabBarActiveTintColor: '#564839',
            tabBarInactiveTintColor: colors.unActiveBottomTab,
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
