import { useEffect, useState } from "react";
import { Alert, Button, FlatList, Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BasketScreenProps } from "types/navigation";
import ProductCard from "components/modules/user/ProductCard";
import { clearBasket } from "redux/reducers/basket";
import { useAppDispatch, useAppSelector } from "redux/store";

const BasketScreen = () => {
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const basket = useAppSelector(state => state.basket).basket;
    const dispatch = useAppDispatch();

    const navigation = useNavigation<BasketScreenProps>();

    useEffect(() => {
        const totalPrice = basket.reduce<number>((acc, current) => acc + (current.price * current.quantity), 0);
        setTotalPrice(totalPrice);

    }, [basket]);

    const clearBasketHandler = () => {
        Alert.alert(
            "Warning",
            "Are you sure you want to 'REMOVE All THE ITEMS' from the basket?",
            [
                { text: "Discard", style: "cancel" },
                { text: "Clear Basket", style: "destructive", onPress: () => dispatch(clearBasket()) }
            ]
        );
    }

    const checkoutHandler = () => {
        Alert.alert(
            "Checkout",
            "Are you sure you want to proceed?",
            [
                { text: "Discard", style: "cancel" },
                { text: "Checkout", style: "default", onPress: () => navigation.navigate("Checkout") }
            ]
        );
    }

    return (
        <View className="flex-1 px-5 bg-slate-200">
            {basket.length ? (
                <>
                    <View className="flex-row justify-between items-center py-2 border-neutral-500 border-b">
                        <Text className="font-semibold text-neutral-500 text-xl">Items Count: {basket.length}</Text>
                        <Button title="Clear Basket" color="#dc2e2e" onPress={clearBasketHandler} />
                    </View>

                    <FlatList
                        data={basket}
                        renderItem={({ item }) => <ProductCard {...item} />}
                        keyExtractor={item => item._id}
                        contentContainerStyle={{ rowGap: 10 }}
                        columnWrapperStyle={{ columnGap: 10 }}
                        numColumns={2}
                        className="flex-1 -mx-4 my-4 px-4"
                    />

                    <View className="flex-row justify-between items-center mb-1.5 py-2 border-neutral-500 border-t">
                        <Text className="font-semibold text-neutral-500 text-xl">Total Price: ${totalPrice.toLocaleString()}</Text>
                        <Button title="Checkout" color="#0dc70d" onPress={checkoutHandler} />
                    </View>
                </>
            ) : (
                <View className="flex-1 justify-center items-center">
                    <Image
                        source={require("~/../assets/empty-cart.png")}
                        className="max-w-full h-56"
                        resizeMode="contain"
                    />
                    <Text className="mt-5 mb-1 font-bold text-3xl text-center">Looks like your cart is empty!</Text>
                    <Text className="font-bold text-center text-xl">Add products to your cart to get started.</Text>
                </View>
            )}
        </View>
    );
};

export default BasketScreen;