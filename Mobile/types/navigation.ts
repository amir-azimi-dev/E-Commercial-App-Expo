import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ShippingState } from "screens/user/checkout/shipping";
import { PaymentData } from "screens/user/checkout/payment";
import { Product } from "types";


type HomeStackParamList = {
    Home: undefined;
    ProductDetails: { id: string };
};

type UserStackParamList = {
    Profile: undefined;
    Login: undefined;
    Register: undefined;
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

type AdminTopTabsParamList = {
    Products: undefined;
    ProductForm?: { product: Product };
    Categories: undefined;
    Orders: undefined;
};

type AdminStackParamList = {
    AdminTopTabs: undefined;
    ProductForm?: { product: Product };
};

type HomeScreenProps = NativeStackNavigationProp<HomeStackParamList, "Home">;
type ProductDetailsScreenProps = NativeStackNavigationProp<HomeStackParamList, "ProductDetails">;
type BasketScreenProps = NativeStackNavigationProp<BasketStackParamList, "Basket">;
type ShippingTabScreenProps = NativeStackNavigationProp<TopTabsParamList, "Shipping">;
type PaymentTabScreenProps = NativeStackNavigationProp<TopTabsParamList, "Payment">;
type ConfirmTabScreenProps = NativeStackNavigationProp<TopTabsParamList, "Confirm">;
type UserStackProps = NativeStackNavigationProp<UserStackParamList>;
type AdminStackParentProps = NativeStackNavigationProp<AdminStackParamList>;
type AdminStackProps = NativeStackNavigationProp<AdminTopTabsParamList>;

type HomeScreenRouteProps = RouteProp<HomeStackParamList, "Home">;
type ProductDetailsScreenRouteProps = RouteProp<HomeStackParamList, "ProductDetails">;
type PaymentTabScreenRouteProps = RouteProp<TopTabsParamList, "Payment">;
type ConfirmTabScreenRouteProps = RouteProp<TopTabsParamList, "Confirm">;
type ProductFormScreenRouteProps = RouteProp<AdminStackParamList, "ProductForm">;

export {
    HomeStackParamList,
    UserStackParamList,
    TabsParamList,
    BasketStackParamList,
    TopTabsParamList,
    AdminTopTabsParamList,
    AdminStackParamList,
    HomeScreenProps,
    ProductDetailsScreenProps,
    BasketScreenProps,
    ShippingTabScreenProps,
    PaymentTabScreenProps,
    ConfirmTabScreenProps,
    UserStackProps,
    AdminStackParentProps,
    AdminStackProps,

    HomeScreenRouteProps,
    ProductDetailsScreenRouteProps,
    PaymentTabScreenRouteProps,
    ConfirmTabScreenRouteProps,
    ProductFormScreenRouteProps
};