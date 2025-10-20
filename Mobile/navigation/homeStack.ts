import { createStackNavigator } from "@react-navigation/stack";
import ProductsScreen from "screens/user/products";
import SingleProductsScreen from "screens/user/single-product";
import { HomeStackParamList } from "types/navigation";

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

export default HomeStack;