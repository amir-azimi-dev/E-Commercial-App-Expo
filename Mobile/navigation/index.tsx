import { createStaticNavigation, RouteProp, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackParamList, TabsParamList } from 'types/navigation';
import ProductsScreen from 'screens/user/products';
import SingleProductsScreen from 'screens/user/single-product';
import BasketScreen from 'screens/user/basket';
import { FontAwesome } from "@expo/vector-icons";


const HomeStack = createStackNavigator<HomeStackParamList>({
  initialRouteName: "Home",

  screens: {
    Home: {
      screen: ProductsScreen
    },
    ProductDetails: {
      screen: SingleProductsScreen,
      options: {
        title: "Product Details ..."
      }
    }
  }
});


const Tabs = createBottomTabNavigator<TabsParamList>({
  initialRouteName: "HomeStack",

  screenOptions: {
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: false,
    tabBarActiveTintColor: "#e91e63"
  },

  screens: {
    HomeStack: {
      screen: HomeStack,
      options: {
        tabBarIcon: ({ color, size }) => <FontAwesome name="home" color={color} size={size} />,
        headerShown: false
      },
    },
    Basket: {
      screen: BasketScreen,
      options: {
        tabBarIcon: ({ color, size }) => <FontAwesome name="shopping-basket" color={color} size={size} />
      },
    },
    Admin: {
      screen: ProductsScreen,
      options: {
        tabBarIcon: ({ color, size }) => <FontAwesome name="cog" color={color} size={size} />
      },
    },
    User: {
      screen: ProductsScreen,
      options: {
        tabBarIcon: ({ color, size }) => <FontAwesome name="user" color={color} size={size} />
      },
    },
  },
});

type RootNavigatorParamList = StaticParamList<typeof Tabs>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootNavigatorParamList { }
  }
}

const Navigation = createStaticNavigation(Tabs);
export default Navigation;