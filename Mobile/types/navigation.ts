import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type HomeStackParamList = {
    Home: undefined;
    ProductDetails: { id: string };
};

type TabsParamList = {
    HomeStack: undefined;
    Cart: undefined;
    Admin: undefined;
    User: undefined;
};

type HomeScreenProps = NativeStackNavigationProp<HomeStackParamList, "Home">;
type ProductDetailsScreenProps = NativeStackNavigationProp<HomeStackParamList, "ProductDetails">;

type HomeScreenRouteProps = RouteProp<HomeStackParamList, "Home">;
type ProductDetailsScreenRouteProps = RouteProp<HomeStackParamList, "ProductDetails">;

export {
    HomeStackParamList,
    TabsParamList,
    HomeScreenProps,
    ProductDetailsScreenProps,
    HomeScreenRouteProps,
    ProductDetailsScreenRouteProps
};