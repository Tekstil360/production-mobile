import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Login from '../screens/Auth/Login';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import DrawerNavigator from './DrawerNavigator';
import OnBoarding from '../screens/Onboarding/OnBoarding';
import Register from '../screens/Auth/Register/Register';
import Result from '../screens/Auth/Register/Result';
import ForgotPassword from '../screens/Auth/ForgotPassword';

import {useEffect, useMemo} from 'react';
import {useGetPlansMutation} from '../services/planService';
import {PlanActions} from '../store/features/planReducer';
import ServiceResponse from '../dto/Response/ServiceResponse';
export type RootStackParamList = {
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  ResultScreen: undefined;
  DrawerNavigator: undefined;
};
const RootNavigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const {user} = useSelector((x: RootState) => x.auth);
  const {onBoarding} = useSelector((x: RootState) => x.app);
  const [getPlans] = useGetPlansMutation();
  const dispatch: AppDispatch = useDispatch();
  const memoizedGetPlans = useMemo(() => getPlans, []);

  // useEffect(() => {
  //   const result = memoizedGetPlans();
  //   result.then((res: any) => {
  //     dispatch(PlanActions.setPlans(res?.data?.list));
  //   });
  // }, []);

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
      {user === null && (
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
      {user !== null && (
        <>
          <Stack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
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
