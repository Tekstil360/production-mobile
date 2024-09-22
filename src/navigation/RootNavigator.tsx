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
import ProductionSplash from '../screens/Production/ProductionSplash';
import {useGetLanguagesMutation} from '../services/appSettingService';
import {useEffect} from 'react';
import Users from '../screens/Users/UserScreen';
import SaleManagement from '../screens/SaleManagement/SaleManagementScreen';
import Pastals from '../screens/Pastal/PastalScreen';
import Reports from '../screens/Reports/ReportScreen';
import Settings from '../screens/Settings/SettingScreen';
import Profile from '../screens/Profile/ProfileScreen';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthActions} from '../store/features/authReducer';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import {useGetUserPermissionMutation} from '../services/userService';
import Screens from '../types/Screens';
import FormatHelper from '../helper/FormatHelper';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = (props: any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const {userPermission} = useSelector((x: RootState) => x.user);
  const {user, isSubscriptionExpired} = useSelector((x: RootState) => x.auth);
  const {onBoarding} = useSelector((x: RootState) => x.app);

  const [useUserPermission] = useGetUserPermissionMutation();
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
    loadUserPermission();
  }, []);

  const loadLanguages = () => {
    getLanguages();
  };
  const loadUserPermission = async () => {
    if (user.id) {
      await useUserPermission();
    }
  };
  const AuthStack = () => {
    return (
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
    );
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
      {Object.keys(user).length === 0 && AuthStack()}
      {Object.keys(user).length !== 0 && (
        <>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown: false,
            }}
          />
          {Screens.filter(x => {
            if (userPermission) {
              let permissionKeys = FormatHelper.convertArrayToLowerCase(
                x.permissionKey,
              ).includes(x.name.toLocaleLowerCase());
              let check = userPermission.some(c =>
                c.permissionScreenList.some(d =>
                  d.toLocaleLowerCase().includes(x.name.toLocaleLowerCase()),
                ),
              );
              return check;
            }
            return false;
          }).map((screen, index) => (
            <Stack.Screen
              key={index}
              name={screen.name as any}
              component={screen.component as any}
              initialParams={{
                ...screen.initialParams,
                actionPermissions: screen.initialParams.actionPermissions.map(
                  x => {
                    return {
                      ...x,
                      permission: userPermission.some(c =>
                        c.permissionScreenList.some(d => d === x.action),
                      ),
                    };
                  },
                ),
              }}
              options={{
                headerShown: false,
              }}
            />
          ))}
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
            name="SaleManagements"
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
