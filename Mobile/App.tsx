import './global.css';

import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { useMemo } from 'react';

import 'react-native-gesture-handler';

import Navigation from './navigation';
import { Provider } from 'react-redux';
import store from 'redux/store';
import ApolloProvider from 'graphql/ApolloProvider';
import ToastManager from 'toastify-react-native';

export default function App() {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => (colorScheme === 'dark' ? DarkTheme : DefaultTheme), [colorScheme]);

  return (
    <ApolloProvider>
      <Provider store={store}>
        <Navigation theme={theme} />
        <ToastManager />
      </Provider>
    </ApolloProvider>
  );
}
