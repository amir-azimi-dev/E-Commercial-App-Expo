import { Button, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { ProductPreview } from "../../../types";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenProps } from "types/navigation";
import { useAppDispatch, useAppSelector } from "redux/store";
import { addOne, removeOne } from "redux/reducers/basket";

const ProductCard = ({ _id, title, image, price, countInStock }: ProductPreview) => {
    const basket = useAppSelector(state => state.basket).basket;
    const dispatch = useAppDispatch();

    const navigation = useNavigation<HomeScreenProps>();

    const addToBasketHandler = (): void => {
        dispatch(addOne({ _id, title, image, price, quantity: 1, countInStock }));
    };

    const removeFromBasketHandler = (): void => {
        dispatch(removeOne(_id));
    };

    const navigateToProductDetailsHandler = (): void => {
        navigation.navigate("ProductDetails", { id: _id });
    };

    return (
        <Pressable onPress={navigateToProductDetailsHandler} className="flex-1 pt-8 pb-2">
            {({ pressed }) => (
                <View
                    className={`items-center p-4 pt-36 bg-white rounded-lg ${pressed && "opacity-70"}`}
                    style={styles.container}
                >
                    <Image
                        source={image ? { uri: `${process.env.EXPO_PUBLIC_STATIC_BASE_URL}/${image}` } : require("~/../assets/box.png")}
                        className="absolute -top-8 max-w-full h-40 aspect-video"
                        resizeMode="contain"
                    />
                    <Text className="font-bold text-center text-xl">{title.length > 15 ? `${title.substring(0, 12)} ...` : title}</Text>
                    <Text className="font-bold text-center text-orange-400 text-xl">${price}</Text>

                    {!!countInStock ? (
                        <View className={Platform.OS !== "ios" ? "mt-1" : ""}>
                            {basket.some(item => item._id === _id) ? (
                                <Button title="Remove" color="red" onPress={removeFromBasketHandler} />
                            ) : (
                                <Button title="Add to Cart" color="green" onPress={addToBasketHandler} />
                            )}
                        </View>
                    ) : (
                        <Text className="font-bold text-red-500">Unavailable</Text>
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