import './global.css';

import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { useMemo } from 'react';

import 'react-native-gesture-handler';

import Navigation from './navigation';
import { Provider } from 'react-redux';
import store, { persistor } from 'redux/store';
import ApolloProvider from 'graphql/ApolloProvider';
import ToastManager from 'toastify-react-native';
import { PersistGate } from 'redux-persist/integration/react';
import AuthenticateUser from 'utils/AuthenticateUser';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => (colorScheme === 'dark' ? DarkTheme : DefaultTheme), [colorScheme]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ApolloProvider>
          <Navigation theme={theme} />
          <ToastManager />
          <AuthenticateUser />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
