import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from 'screens/user/landing';

const Stack = createStackNavigator({
  screens: {
    Home: {
      screen: Landing,
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
