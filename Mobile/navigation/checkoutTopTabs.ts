import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ConfirmScreen from "screens/user/checkout/confirm";
import PaymentScreen from "screens/user/checkout/payment";
import ShippingScreen from "screens/user/checkout/shipping";
import { TopTabsParamList } from "types/navigation";

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

export default CheckoutTopTabs;