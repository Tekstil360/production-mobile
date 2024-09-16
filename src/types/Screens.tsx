import CustomerScreen from '../screens/Customer/CustomerScreen';
import SeasonScreen from '../screens/Season/SeasonScreen';

const SeasonScreens = () => [
  {
    name: 'Seasons',
    component: SeasonScreen,
    options: {
      headerShown: false,
    },
    initialParams: {
      actionPermissions: [
        {
          action: 'CreateSeason',
          permission: false,
        },
        {
          action: 'UpdateSeason',
          permission: false,
        },
        {
          action: 'DeleteSeason',
          permission: false,
        },
        {
          action: 'SeasonDetail',
          permission: false,
        },
      ],
    },
    permissionKey: 'Seasons',
  },
];

const CustomerScreens = () => [
  {
    name: 'Customers',
    component: CustomerScreen,
    options: {
      headerShown: false,
    },
    initialParams: {
      actionPermissions: [
        {
          action: 'CreateCustomer',
          permission: false,
        },
        {
          action: 'UpdateCustomer',
          permission: false,
        },
        {
          action: 'DeleteCustomer',
          permission: false,
        },
        {
          action: 'CustomerDetail',
          permission: false,
        },
      ],
    },
    permissionKey: 'Customers',
  },
];

const Screens = [...SeasonScreens(), ...CustomerScreens()];
export default Screens;
