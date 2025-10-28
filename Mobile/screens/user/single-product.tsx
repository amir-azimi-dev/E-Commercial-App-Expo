import { useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View, ActivityIndicator, Image, ScrollView, Button, Platform } from "react-native";
import { ProductDetailsScreenProps, ProductDetailsScreenRouteProps } from "types/navigation";
import { useAppDispatch, useAppSelector } from "redux/store";
import { addOne, removeOne } from "redux/reducers/basket";
import { Toast } from "toastify-react-native";
import useProduct from "graphql/queries/useProduct";

const SingleProductsScreen = () => {
    const basket = useAppSelector(state => state.basket.basket);
    const dispatch = useAppDispatch();

    const params = useRoute<ProductDetailsScreenRouteProps>().params;
    const navigation = useNavigation<ProductDetailsScreenProps>();

    const { data: product, loading, error } = useProduct({ id: params.id });

    useEffect(() => {
        navigation.setOptions({
            title: product?.getProduct.title
        });

    }, [product?.getProduct.title]);

    const getAvailabilityText = () => {
        if (!product) return;

        if (product.getProduct.countInStock >= 5) {
            return "Available";
        }

        if (product.getProduct.countInStock > 0) {
            return "Available";
        }

        return "Unavailable";
    };

    const getAvailabilityColor = () => {
        if (!product) return;

        if (product.getProduct.countInStock >= 5) {
            return "#00ff00";
        }

        if (product.getProduct.countInStock > 0) {
            return "#d2ba0a";
        }

        return "#ff0000";
    };

    const addToBasketHandler = (): void => {
        if (!product) return;

        const { _id, title, image, price, countInStock } = product.getProduct;
        dispatch(addOne({ _id, title, image, price, quantity: 1, countInStock }));

        Toast.show({
            type: "success",
            text1: `"${title}" added to cart.`,
            text2: "You can go to your cart to complete the order.",
            position: "top"
        });
    };

    const removeFromBasketHandler = (): void => {
        if (!product) return;

        dispatch(removeOne(product.getProduct._id));

        Toast.show({
            type: "default",
            text1: "Success",
            text2: `"${product.getProduct.title}" removed from cart.`,
            position: "top"
        });
    };

    if (loading) return <ActivityIndicator size="large" className="flex-1" />;
    if (error) return <Text className="mt-5 font-bold text-2xl text-center">Error While Fetching Data!</Text>;

    return (
        <View className="flex-1 px-5 pt-10 pb-6 bg-white">
            <ScrollView>
                <Image
                    source={product?.getProduct.image ? { uri: `${Platform.select({ ios: process.env.EXPO_PUBLIC_STATIC_BASE_URL, android: process.env.EXPO_PUBLIC_ANDROID_STATIC_BASE_URL })}/${product?.getProduct.image}` } : require("~/../assets/box.png")}
                    className="h-56 mx-auto aspect-video"
                    resizeMode="contain"
                />
                <Text className="mt-3 font-bold text-3xl text-center">{product?.getProduct.title}</Text>
                {product?.getProduct.brand && <Text className="mt-2 font-bold text-2xl text-center">{product?.getProduct.brand}</Text>}

                <View className="flex-row justify-center items-center gap-x-2 my-3">
                    <Text>Availability: </Text>
                    <View className="flex-row items-center gap-x-1">
                        <Text>{getAvailabilityText()}</Text>
                        <View className="rounded-full size-4" style={{ backgroundColor: getAvailabilityColor() }}></View>
                    </View>
                </View>

                <Text className="mt-3 pt-3 border-gray-300 border-t text-lg">{product?.getProduct.description}</Text>
            </ScrollView>

            <View className="flex-row justify-between items-center mt-auto pt-3 border-gray-300 border-t">
                <Text className="font-bold text-2xl text-tint">${product?.getProduct.price.toLocaleString()}</Text>

                {!!product?.getProduct.countInStock ? (
                    <View className={Platform.OS !== "ios" ? "mt-1" : ""}>
                        {basket.some(item => item._id === product?.getProduct._id) ? (
                            <Button title="Remove" color="red" onPress={removeFromBasketHandler} />
                        ) : (
                            <Button title="Add to Cart" color="green" onPress={addToBasketHandler} />
                        )}
                    </View>
                ) : (
                    <Text className="font-bold text-red-500">Unavailable</Text>
                )}

            </View>
        </View>
    );
};

export default SingleProductsScreen;