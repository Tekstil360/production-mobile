export type RootStackParamList = {
  Main: undefined;
  SeasonSplash: undefined;
  ProductionSplash: undefined;
  OnboardingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  ResultScreen: undefined;
  DrawerNavigator: {welcome?: boolean};
  Productions: undefined;
  Users: undefined;
  ProductionCodes: undefined;
  StockManagement: undefined;
  SaleManagement: undefined;
  Pastal: undefined;
  Reports: undefined;
  Seasons: {actionPermissions: ActionPermissions[]};
  Customers: {actionPermissions: ActionPermissions[]};
  Profile: undefined;
  Settings: undefined;
  PaymentScreen: undefined;
};
export interface ActionPermissions {
  action: string;
  permission: boolean;
}
