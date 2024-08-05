import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Login from '../screens/Auth/Login';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import DrawerNavigator from './DrawerNavigator';
import OnBoarding from '../screens/Onboarding/OnBoarding';
import Register from '../screens/Auth/Register/Register';
import Result from '../screens/Auth/Register/Result';
import ForgotPassword from '../screens/Auth/ForgotPassword';

import Main from '../screens/Main';
import {RootStackParamList} from '../types/Navigator';
import SeasonSplash from '../screens/Season/SeasonSplash';
import ProductionSplash from '../screens/Production/ProductionSplash';
import {useGetLanguagesMutation} from '../services/appSettingService';
import {useEffect} from 'react';
import Productions from '../screens/Production/Productions';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const {user} = useSelector((x: RootState) => x.auth);
  const {onBoarding} = useSelector((x: RootState) => x.app);
  const [getLanguages] = useGetLanguagesMutation();

  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = () => {
    getLanguages();
  };

  return (
    <Stack.Navigator
      initialRouteName="OnboardingScreen"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      {onBoarding && (
        <Stack.Screen
          name="OnboardingScreen"
          component={OnBoarding}
          options={{
            headerShown: false,
          }}
        />
      )}
      {Object.keys(user).length === 0 && (
        <>
          <Stack.Screen
            name="LoginScreen"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ResultScreen"
            component={Result}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPassword}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
      {Object.keys(user).length !== 0 && (
        <>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Group navigationKey="Season">
            <Stack.Screen
              name="SeasonSplash"
              component={SeasonSplash}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Group>
          <Stack.Group navigationKey="Production">
            <Stack.Screen
              name="ProductionSplash"
              component={ProductionSplash}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Group>
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Productions"
            component={Productions}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
