import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Products from 'screens/user/products';

const Stack = createStackNavigator({
  screens: {
    Products: {
      screen: Products,
    },
  },
});

type RootNavigatorParamList = StaticParamList<typeof Stack>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootNavigatorParamList { }
  }
}

const Navigation = createStaticNavigation(Stack);
export default Navigation;
