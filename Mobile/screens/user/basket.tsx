import { Text, View } from "react-native";

const BasketScreen = () => {
    return (
        <View className="flex-1 px-5 bg-slate-200">
            <View className="flex-1 justify-center items-center">
                <Text className="mb-1 font-bold text-3xl text-center">Looks like your cart is empty!</Text>
                <Text className="font-bold text-center text-xl">Add products to your cart to get started.</Text>
            </View>
        </View>
    );
};

export default BasketScreen;