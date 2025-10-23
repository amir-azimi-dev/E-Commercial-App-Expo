import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import CategoriesScreen from "screens/admin/categories";
import OrdersScreen from "screens/admin/orders";
import ProductFormScreen from "screens/admin/product-form";
import ProductsScreen from "screens/admin/products";
import { AdminStackParamList, AdminTopTabsParamList } from "types/navigation";

const AdminTopTabs = createMaterialTopTabNavigator<AdminTopTabsParamList>({
    initialRouteName: "Products",

    screens: {
        Products: {
            screen: ProductsScreen
        },
        Categories: {
            screen: CategoriesScreen
        },
        Orders: {
            screen: OrdersScreen
        },
    }
});

const AdminStack = createStackNavigator<AdminStackParamList>({
    initialRouteName: "AdminTopTabs",

    screens: {
        AdminTopTabs: {
            screen: AdminTopTabs,
            options: {
                title: "Admin Panel"
            }
        },
        ProductForm: {
            screen: ProductFormScreen,
            options: {
                presentation: "transparentModal",
                title: "Product Form",
                headerBackTitle: "Back"
            }
        }
    }
});

export default AdminStack;