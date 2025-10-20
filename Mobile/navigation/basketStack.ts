import { createStackNavigator } from "@react-navigation/stack";
import BasketScreen from "screens/user/basket";
import { BasketStackParamList } from "types/navigation";
import CheckoutTopTabs from "./checkoutTopTabs";

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

export default BasketStack;