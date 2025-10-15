import { useEffect, useState } from "react";
import { Alert,  FlatList, ScrollView, Text, useWindowDimensions, View } from "react-native";
import Button from "components/modules/Button";
import { CommonActions, useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { ConfirmTabScreenProps, ConfirmTabScreenRouteProps } from "types/navigation";
import { useAppDispatch, useAppSelector } from "redux/store";
import { clearBasket } from "redux/reducers/basket";
import ProductCard from "components/modules/user/ProductCard";

const ConfirmScreen = () => {
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const basket = useAppSelector(state => state.basket).basket;
    const dispatch = useAppDispatch();

    const orderData = useRoute<ConfirmTabScreenRouteProps>().params;
    const navigation = useNavigation<ConfirmTabScreenProps>();
    const isFocused = useIsFocused();

    const { height } = useWindowDimensions();

    useEffect(() => {
        if (!orderData) return navigation.navigate("Shipping");

        const { phone, shippingAddress1, shippingAddress2, country, city, zip, paymentMethod, cardNumber } = orderData;

        if (!phone || !shippingAddress1 || !shippingAddress2 || !country || !city || !zip) return navigation.navigate("Shipping");
        if (paymentMethod !== "Card Payment" || cardNumber.trim()) return;

        navigation.navigate("Payment", {
            phone,
            shippingAddress1,
            shippingAddress2,
            country,
            city,
            zip
        });

    }, [orderData, isFocused]);

    useEffect(() => {
        const totalPrice = basket.reduce<number>((acc, current) => acc + (current.price * current.quantity), 0);
        setTotalPrice(totalPrice);

    }, [basket]);

    const checkoutHandler = () => {
        Alert.alert(
            "Checkout",
            "Are you sure you want to proceed?",
            [
                { text: "Discard", style: "cancel" },
                {
                    text: "Checkout", style: "default", onPress: placeOrder
                }
            ]
        );
    };

    const placeOrder = (): void => {
        Alert.alert(
            "Success",
            "Your Order Placed Successfully.",
            [
                {
                    text: "Okay", style: "default", onPress: () => {
                        dispatch(clearBasket());

                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: "HomeStack" }],
                            })
                        );

                    }
                }
            ]
        );
    };

    if (!orderData) return;

    return (
        <View className="flex-1 p-8 pb-0 bg-slate-200">
            <Text className="mb-4 font-bold text-3xl text-center">Confirm Order</Text>

            <View className="p-3 border border-gray-400 rounded-lg fmt-2" style={{ height: height / 5 }}>
                <ScrollView className="-mx-3 px-3">
                    <Text className="mb-3 pb-3 border-gray-400 border-b text-lg">Phone: <Text className="font-bold">{orderData.phone}</Text></Text>
                    <Text className="mb-3 pb-3 border-gray-400 border-b text-lg">Shipping Address 1: <Text className="font-bold">{orderData.shippingAddress1}</Text></Text>
                    <Text className="mb-3 pb-3 border-gray-400 border-b text-lg">Shipping Address 2: <Text className="font-bold">{orderData.shippingAddress2}</Text></Text>
                    <Text className="mb-3 pb-3 border-gray-400 border-b text-lg">Country: <Text className="font-bold">{orderData.country}</Text></Text>
                    <Text className="mb-3 pb-3 border-gray-400 border-b text-lg">City: <Text className="font-bold">{orderData.city}</Text></Text>
                    <Text className="mb-3 pb-3 border-gray-400 border-b text-lg">Zip: <Text className="font-bold">{orderData.zip}</Text></Text>
                    <Text className="mb-3 pb-3 border-gray-400 border-b text-lg">Payment Method: <Text className="font-bold">{orderData.paymentMethod}</Text></Text>
                    {orderData.paymentMethod === "Card Payment" && (
                        <Text className="mb-2 pb-2 border-gray-400 border-b font-semibold text-lg">cardNumber: {orderData.cardNumber}</Text>
                    )}
                </ScrollView>
            </View>

            <View className="flex-1 mt-10">
                <Text className="font-bold text-xl">Items:</Text>

                <FlatList
                    data={basket}
                    renderItem={({ item }) => <ProductCard {...item} disableNavigation />}
                    keyExtractor={item => item._id}
                    contentContainerStyle={{ rowGap: 10 }}
                    columnWrapperStyle={{ columnGap: 10 }}
                    numColumns={2}
                    className="-mx-4 my-4 px-4"
                />
            </View>

            <View className="flex-row justify-between items-center mt-auto mb-1.5 py-2 border-neutral-500 border-t">
                <Text className="font-semibold text-neutral-500 text-xl">Total Price: ${totalPrice.toLocaleString()}</Text>
                <Button title="Checkout" color="#0dc70d" onPress={checkoutHandler} />
            </View>
        </View>
    );
};

export default ConfirmScreen;