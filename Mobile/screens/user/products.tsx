import { View } from "react-native";
import Products from "../../components/templates/user/products/products";

const ProductsScreen = () => {
    return (
        <View className="flex-1 px-5 bg-slate-200">
            <Products />
        </View>
    );
};

export default ProductsScreen;