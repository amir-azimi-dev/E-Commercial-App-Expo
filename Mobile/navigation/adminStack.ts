import { createStackNavigator } from "@react-navigation/stack";
import CategoriesScreen from "screens/admin/categories";
import OrdersScreen from "screens/admin/orders";
import ProductFormScreen from "screens/admin/product-form";
import ProductsScreen from "screens/admin/products";
import { AdminStackParamList } from "types/navigation";


const AdminStack = createStackNavigator<AdminStackParamList>({
    initialRouteName: "Products",

    screens: {
        Products: {
            screen: ProductsScreen
        },
        ProductForm: {
            screen: ProductFormScreen,
            options: {
                title: "Product Form"
            }
        },
        Categories: {
            screen: CategoriesScreen
        },
        Orders: {
            screen: OrdersScreen
        },
    }
});

export default AdminStack;