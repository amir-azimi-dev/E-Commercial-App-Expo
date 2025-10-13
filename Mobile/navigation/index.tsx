import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { BasketStackParamList, HomeStackParamList, TabsParamList, TopTabsParamList } from 'types/navigation';
import ProductsScreen from 'screens/user/products';
import SingleProductsScreen from 'screens/user/single-product';
import BasketScreen from 'screens/user/basket';
import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from 'react-native';
import { useAppSelector } from 'redux/store';
import ShippingScreen from 'screens/user/checkout/shipping';
import PaymentScreen from 'screens/user/checkout/payment';
import ConfirmScreen from 'screens/user/checkout/confirm';

const BasketIcon = ({ color, size }: { color: string; size: number }) => {
  const basketItemsCount = useAppSelector(state => state.basket.basket.length);

  return (
    <View className="relative">
      <FontAwesome name="shopping-basket" color={color} size={size} />
      {basketItemsCount > 0 && (
        <View
        className="absolute -top-1.5 -right-2 min-w-5 h-5 justify-center items-center bg-red-500 rounded-full aspect-square">
          <Text className="font-bold text-white text-xs">
            {basketItemsCount}
          </Text>
        </View>
      )}
    </View>
  );
}

const CheckoutTopTabs = createMaterialTopTabNavigator<TopTabsParamList>({
  initialRouteName: "Shipping",

  screens: {
    Shipping: {
      screen: ShippingScreen
    },
    Payment: {
      screen: PaymentScreen
    },
    Confirm: {
      screen: ConfirmScreen
    }
  }
});

const BasketStack = createStackNavigator<BasketStackParamList>({
  initialRouteName: "Basket",

  screens: {
    Basket: {
      screen: BasketScreen
    },
    Checkout: {
      screen: CheckoutTopTabs
    }
  }
});

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
    BasketStack: {
      screen: BasketStack,
      options: {
        tabBarIcon: ({ color, size }) => <BasketIcon color={color} size={size} />,
        headerShown: false
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