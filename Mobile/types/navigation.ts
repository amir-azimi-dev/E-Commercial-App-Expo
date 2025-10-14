import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ShippingState } from "screens/user/checkout/shipping";
import { PaymentData } from "screens/user/checkout/payment";


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
    Confirm: ShippingState & PaymentData;
};

type HomeScreenProps = NativeStackNavigationProp<HomeStackParamList, "Home">;
type ProductDetailsScreenProps = NativeStackNavigationProp<HomeStackParamList, "ProductDetails">;
type BasketScreenProps = NativeStackNavigationProp<BasketStackParamList, "Basket">;
type ShippingTabScreenProps = NativeStackNavigationProp<TopTabsParamList, "Shipping">;
type PaymentTabScreenProps = NativeStackNavigationProp<TopTabsParamList, "Payment">;
type ConfirmTabScreenProps = NativeStackNavigationProp<TopTabsParamList, "Confirm">;

type HomeScreenRouteProps = RouteProp<HomeStackParamList, "Home">;
type ProductDetailsScreenRouteProps = RouteProp<HomeStackParamList, "ProductDetails">;
type PaymentTabScreenRouteProps = RouteProp<TopTabsParamList, "Payment">;
type ConfirmTabScreenRouteProps = RouteProp<TopTabsParamList, "Confirm">;

export {
    HomeStackParamList,
    TabsParamList,
    BasketStackParamList,
    TopTabsParamList,
    HomeScreenProps,
    ProductDetailsScreenProps,
    BasketScreenProps,
    ShippingTabScreenProps,
    PaymentTabScreenProps,
    ConfirmTabScreenProps,

    HomeScreenRouteProps,
    ProductDetailsScreenRouteProps,
    PaymentTabScreenRouteProps,
    ConfirmTabScreenRouteProps
};