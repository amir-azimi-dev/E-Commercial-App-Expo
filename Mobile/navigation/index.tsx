import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabsParamList } from 'types/navigation';
import { Pressable, Text, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { useAppSelector } from 'redux/store';
import HomeStack from './homeStack';
import BasketStack from './basketStack';
import UserStack from './userStack';
import AdminStack from './adminStack';

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

const CustomTabButton = (props: any) => (
  <View className="flex-1 rounded-b-lg overflow-hidden">
    <Pressable
      {...props}
      android_ripple={{ color: "rgba(0,0,0,0.15)", foreground: true }}
      style={[{ flex: 1, alignItems: "center", justifyContent: "center" }, props.style]}
    />
  </View>
);

const Tabs = createBottomTabNavigator<TabsParamList>({
  initialRouteName: "HomeStack",

  screenOptions: {
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: false,
    tabBarActiveTintColor: "#e91e63",
    tabBarButton: (props) => <CustomTabButton {...props} />
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
      screen: AdminStack,
      options: {
        tabBarIcon: ({ color, size }) => <FontAwesome name="cog" color={color} size={size} />,
        headerShown: false
      },
    },
    User: {
      screen: UserStack,
      options: {
        tabBarIcon: ({ color, size }) => <FontAwesome name="user" color={color} size={size} />,
        headerShown: false
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