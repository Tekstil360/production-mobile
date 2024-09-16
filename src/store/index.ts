import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import {appReducer} from './features/appReducer';
import {baseApi} from './api';
import {authReducer} from './features/authReducer';
import {planReducer} from './features/planReducer';
import {seasonReducer} from './features/seasonReducer';
import {appSettingReducer} from './features/appSettingReducer';
import {productionReducer} from './features/productionReducer';
import {userReducer} from './features/userReducer';
import {customerReducer} from './features/customerReducer';

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  whitelist: ['onBoarding', 'selectedLanguage'],
};
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const rootReducers = combineReducers({
  app: persistReducer(appPersistConfig, appReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  season: seasonReducer,
  plan: planReducer,
  appSettings: appSettingReducer,
  production: productionReducer,
  user: userReducer,
  customer: customerReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducers,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware),
  });
};

export const store = setupStore();
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
