import CustomerScreen from '../screens/Customer/CustomerScreen';
import ProductionCodePropertyScreen from '../screens/ProductCode/ProductionCodePropertyScreen';
import ProductionCodeScreen from '../screens/ProductCode/ProductionCodeScreen';
import ProductionScreen from '../screens/Production/ProductionScreen';
import SeasonScreen from '../screens/Season/SeasonScreen';
import StockManagementScreen from '../screens/StockManagement/StockManagementScreen';

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
    permissionKey: ['Seasons'],
  },
];
const ProductionScreens = () => [
  {
    name: 'Productions',
    component: ProductionScreen,
    options: {
      headerShown: false,
    },
    initialParams: {
      actionPermissions: [
        {
          action: 'CreateProduction',
          permission: false,
        },
        {
          action: 'UpdateProduction',
          permission: false,
        },
        {
          action: 'DeleteProduction',
          permission: false,
        },
        {
          action: 'ProductionDetail',
          permission: false,
        },
      ],
    },
    permissionKey: ['Productions'],
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
    permissionKey: ['Customers'],
  },
];
const StockManagementScreens = () => [
  {
    name: 'Stockmanagements',
    component: StockManagementScreen,
    options: {
      headerShown: false,
    },
    initialParams: {
      actionPermissions: [
        {
          action: 'Stockmanagements',
          permission: false,
        },
        {
          action: 'CreateStockmanagement',
          permission: false,
        },
        {
          action: 'UpdateStockmanagement',
          permission: false,
        },
        {
          action: 'DeleteStockmanagement',
          permission: false,
        },
        {
          action: 'StockmanagementDetail',
          permission: false,
        },
      ],
    },
    permissionKey: ['Stockmanagements', 'Productioncodes'],
  },
  {
    name: 'Productioncodes',
    component: ProductionCodeScreen,
    options: {
      headerShown: false,
    },
    initialParams: {
      actionPermissions: [
        {
          action: 'Productioncodes',
          permission: false,
        },
        {
          action: 'CreateProductioncode',
          permission: false,
        },
        {
          action: 'UpdateProductioncode',
          permission: false,
        },
        {
          action: 'DeleteProductioncode',
          permission: false,
        },
        {
          action: 'ProductioncodeDetail',
          permission: false,
        },
      ],
    },
    permissionKey: ['Productioncodes', 'StockManagement'],
  },
  {
    name: 'Productioncodepropertys',
    component: ProductionCodePropertyScreen,
    options: {
      headerShown: false,
    },
    initialParams: {
      actionPermissions: [
        {
          action: 'Productioncodepropertys',
          permission: false,
        },
        {
          action: 'CreateProductioncodeproperty',
          permission: false,
        },
        {
          action: 'UpdateProductioncodeproperty',
          permission: false,
        },
        {
          action: 'DeleteProductioncodeproperty',
          permission: false,
        },
        {
          action: 'ProductioncodepropertyDetail',
          permission: false,
        },
      ],
    },
    permissionKey: ['Productioncodepropertys'],
  },
];
const Screens = [
  ...SeasonScreens(),
  ...CustomerScreens(),
  ...StockManagementScreens(),
  ...ProductionScreens(),
];
export default Screens;
