import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../Button";
import { ProductPreview } from "../../../types";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenProps } from "types/navigation";
import { useAppDispatch, useAppSelector } from "redux/store";
import { addOne, removeOne } from "redux/reducers/basket";
import { Toast } from "toastify-react-native";

const ProductCard = ({ _id, title, image, price, countInStock, disableNavigation }: ProductPreview & { disableNavigation?: boolean }) => {
    const basket = useAppSelector(state => state.basket).basket;
    const dispatch = useAppDispatch();

    const navigation = useNavigation<HomeScreenProps>();

    const addToBasketHandler = (): void => {
        dispatch(addOne({ _id, title, image, price, quantity: 1, countInStock }));
        Toast.show({
            type: "success",
            text1: `"${title}" added to cart.`,
            text2: "You can go to your cart to complete the order.",
            position: "top"
        });
    };

    const removeFromBasketHandler = (): void => {
        dispatch(removeOne(_id));
        Toast.show({
            type: "default",
            text1: "Success",
            text2: `"${title}" removed from cart.`,
            position: "top"
        });
    };

    const navigateToProductDetailsHandler = (): void => {
        if (disableNavigation) return;
        navigation.navigate("ProductDetails", { id: _id });
    };

    return (
        <Pressable onPress={navigateToProductDetailsHandler} className="flex-1 pt-8 pb-2">
            {({ pressed }) => (
                <View
                    className={`items-center p-4 pt-36 bg-white rounded-lg ${(pressed && !disableNavigation) && "opacity-70"}`}
                    style={styles.container}
                >
                    <Image
                        source={image ? { uri: `${Platform.select({ ios: process.env.EXPO_PUBLIC_STATIC_BASE_URL, android: process.env.EXPO_PUBLIC_ANDROID_STATIC_BASE_URL })}/${image}` } : require("~/../assets/box.png")}
                        className="absolute -top-8 max-w-full h-40 aspect-video"
                        resizeMode="contain"
                    />
                    <Text className="font-bold text-center text-xl">{title.length > 15 ? `${title.substring(0, 12)} ...` : title}</Text>
                    <Text className="font-bold text-center text-orange-400 text-xl">${price.toLocaleString()}</Text>

                    {!!countInStock ? (
                        <View className={Platform.OS !== "ios" ? "mt-1" : ""}>
                            {basket.some(item => item._id === _id) ? (
                                <Button title="Remove" color="red" onPress={removeFromBasketHandler} />
                            ) : (
                                <Button title="Add to Cart" color="green" onPress={addToBasketHandler} />
                            )}
                        </View>
                    ) : (
                        <View style={{ marginVertical: Platform.OS === "ios" ? 7 : 6 }}>
                            <Text className="font-bold text-lg text-red-500">Unavailable</Text>
                        </View>
                    )}
                </View>
            )}
        </Pressable>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        boxShadow: "2px 2px 5px #00000055"
    }
});