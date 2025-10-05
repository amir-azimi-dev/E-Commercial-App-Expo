import { Text, View } from "react-native";
import Products from "../../components/templates/user/landing/products";

const Landing = () => {
    return (
        <View className="flex-1 px-2.5 py-5">
            <Text>Landing Screen</Text>

            <Products />
        </View>
    );
};

export default Landing;