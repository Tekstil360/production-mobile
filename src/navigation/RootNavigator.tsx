import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Login from '../screens/Auth/Login';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import DrawerNavigator from './DrawerNavigator';
import OnBoarding from '../screens/Onboarding/OnBoardingScreen';
import Register from '../screens/Auth/Register/Register';
import Result from '../screens/Auth/Register/Result';
import ForgotPassword from '../screens/Auth/ForgotPassword';

import Main from '../screens/Main';
import {RootStackParamList} from '../types/Navigator';
import SeasonSplash from '../screens/Season/SeasonSplash';
import ProductionSplash from '../screens/Production/ProductionSplash';
import {useGetLanguagesMutation} from '../services/appSettingService';
import {useEffect} from 'react';
import Productions from '../screens/Production/ProductionScreen';
import Users from '../screens/Users/UserScreen';
import ProductionCodes from '../screens/ProductCode/ProductionCodeScreen';
import StockManagement from '../screens/StockManagement/StockManagement';
import SaleManagement from '../screens/SaleManagement/SaleManagementScreen';
import Pastals from '../screens/Pastal/PastalScreen';
import Reports from '../screens/Reports/ReportScreen';
import Settings from '../screens/Settings/SettingScreen';
import Seasons from '../screens/Season/SeasonScreen';
import Profile from '../screens/Profile/ProfileScreen';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthActions} from '../store/features/authReducer';
import PaymentScreen from '../screens/Payment/PaymentScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = (props: any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const {user, isSubscriptionExpired} = useSelector((x: RootState) => x.auth);
  const {onBoarding} = useSelector((x: RootState) => x.app);

  const [getLanguages] = useGetLanguagesMutation();

  useEffect(() => {
    if (isSubscriptionExpired) {
      navigation.reset({
        index: 0,
        routes: [{name: 'PaymentScreen'}],
      });
      dispatch(AuthActions.clearSubscriptionExpired());
    }
  }, [isSubscriptionExpired, dispatch]);

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
            name="Users"
            component={Users}
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
          <Stack.Screen
            name="ProductionCodes"
            component={ProductionCodes}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StockManagement"
            component={StockManagement}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SaleManagement"
            component={SaleManagement}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Pastal"
            component={Pastals}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Reports"
            component={Reports}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Seasons"
            component={Seasons}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
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
