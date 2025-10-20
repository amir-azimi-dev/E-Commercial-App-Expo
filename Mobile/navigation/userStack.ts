import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "screens/user/login";
import ProfileScreen from "screens/user/profile";
import RegisterScreen from "screens/user/register";
import { UserStackParamList } from "types/navigation";

const UserStack = createStackNavigator<UserStackParamList>({
  initialRouteName: "Login",

  screens: {
    Profile: {
      screen: ProfileScreen
    },
    Login: {
      screen: LoginScreen
    },
    Register: {
      screen: RegisterScreen
    },

  }
});

export default UserStack;