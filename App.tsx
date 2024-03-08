import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as StoreProvider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
import NavContainer from './src/navigation';
import { theme } from './src/theme';
import { ConfirmModalProvider } from './src/components/CofirmationModel';
import { persistor, store } from './src/redux/store';
import { HandleNotification, requestUserPermission } from './src/utils/pushNotifiction';
import Toast from 'react-native-toast-message';
import versionUpdate from './src/utils/versionUpdate';

// LogBox.ignoreLogs(['NativeBase: The contrast ratio of']);
LogBox.ignoreAllLogs();

const queryClient = new QueryClient();

function App(): JSX.Element {
  React.useEffect(() => {
    requestUserPermission()
    HandleNotification()
    versionUpdate()
  }, [])
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <StatusBar barStyle="dark-content" />
          <SafeAreaProvider>
            <NativeBaseProvider theme={theme}>
              <ConfirmModalProvider>
                <NavContainer />
              </ConfirmModalProvider>
            </NativeBaseProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </PersistGate>
      <FlashMessage position="top" statusBarHeight={StatusBar.currentHeight} />
      <Toast />
    </StoreProvider>
  );
}

export default App;
