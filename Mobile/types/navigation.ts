import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShippingState } from 'screens/user/checkout/shipping';


type HomeStackParamList = {
    Home: undefined;
    ProductDetails: { id: string };
};

type TabsParamList = {
    HomeStack: undefined;
    BasketStack: undefined;
    Admin: undefined;
    User: undefined;
};

type BasketStackParamList = {
    Basket: undefined;
    Checkout: undefined;
};

type TopTabsParamList = {
    Shipping: undefined;
    Payment: ShippingState;
    Confirm: undefined;
};

type HomeScreenProps = NativeStackNavigationProp<HomeStackParamList, "Home">;
type ProductDetailsScreenProps = NativeStackNavigationProp<HomeStackParamList, "ProductDetails">;
type BasketScreenProps = NativeStackNavigationProp<BasketStackParamList, "Basket">;
type PaymentTabScreenProps = NativeStackNavigationProp<TopTabsParamList, "Payment">;

type HomeScreenRouteProps = RouteProp<HomeStackParamList, "Home">;
type ProductDetailsScreenRouteProps = RouteProp<HomeStackParamList, "ProductDetails">;
type PaymentTabScreenRouteProps = RouteProp<TopTabsParamList, "Payment">;

export {
    HomeStackParamList,
    TabsParamList,
    BasketStackParamList,
    TopTabsParamList,
    HomeScreenProps,
    ProductDetailsScreenProps,
    BasketScreenProps,
    PaymentTabScreenProps,

    HomeScreenRouteProps,
    ProductDetailsScreenRouteProps,
    PaymentTabScreenRouteProps
};