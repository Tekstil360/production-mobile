import {AppRegistry, LogBox, Platform} from 'react-native';
import {name as appName} from './app.json';
import RootNavigator from './src/navigation/RootNavigator';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {ModalPortal} from 'react-native-modals';
import KeyboardManager from 'react-native-keyboard-manager';
import initI18n from './src/lang/i18n';
import {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
LogBox.ignoreAllLogs(true);
const Production = () => {
  const [isI18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initI18n();
      setI18nReady(true);
    };
    init();
  }, []);
  if (!isI18nReady) {
    return null;
  }

  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(true);
    KeyboardManager.setEnableDebugging(false);
    KeyboardManager.setKeyboardDistanceFromTextField(10);
    KeyboardManager.setLayoutIfNeededOnUpdate(true);
    KeyboardManager.setEnableAutoToolbar(true);
    KeyboardManager.setToolbarDoneBarButtonItemText('Done');
    KeyboardManager.setToolbarManageBehaviourBy('subviews');
    KeyboardManager.setToolbarPreviousNextButtonEnable(false);
    KeyboardManager.setToolbarTintColor('#0000FF');
    KeyboardManager.setToolbarBarTintColor('#FFFFFF');
    KeyboardManager.setShouldShowToolbarPlaceholder(true);
    KeyboardManager.setOverrideKeyboardAppearance(false);
    KeyboardManager.setKeyboardAppearance('default');
    KeyboardManager.setShouldResignOnTouchOutside(true);
    KeyboardManager.setShouldPlayInputClicks(true);
    KeyboardManager.resignFirstResponder();
    KeyboardManager.isKeyboardShowing().then(isShowing => {});
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <ModalPortal />
      </PersistGate>
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => Production);
