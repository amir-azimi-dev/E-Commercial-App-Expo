import { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text, View, ActivityIndicator, Image, ScrollView, Button, Platform } from "react-native";
import { Product } from "types";
import { ProductDetailsScreenProps, ProductDetailsScreenRouteProps } from "types/navigation";
import { useAppDispatch, useAppSelector } from "redux/store";
import { addOne, removeOne } from "redux/reducers/basket";
import { Toast } from "toastify-react-native";

const testProduct = [
    {
        "_id": "68d7d4cb1e39357d53fb80b5",
        "title": "product title 1",
        "description": "product description",
        "richDescription": "",
        "image": "5363044a-3434-4ea9-9f1a-31a5f8a8f51b-1759759479362.webp",
        "images": [
            "932d7441-cc5d-4573-9369-286ee6f67afe-1759759479362.jpg",
            "61b986c9-3d8f-45de-8c37-19c7eb53d4c9-1759759475896.jpg"
        ],
        "brand": "",
        "price": 1000000,
        "category": {
            "_id": "68d683782f2799fb2c870d57",
            "title": "computer",
            "color": "#444",
            "icon": "icon-computer",
            "image": "",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        "countInStock": 11,
        "rating": 4,
        "reviewsCount": 2,
        "isFeatured": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "_id": "68d7d4cb1e39357d53fb80b3",
        "title": "product title 2",
        "description": "product description",
        "richDescription": "",
        "image": "",
        "images": [],
        "brand": "",
        "price": 1000000,
        "category": {
            "_id": "68d683782f2799fb2c870d57",
            "title": "computer",
            "color": "#444",
            "icon": "icon-computer",
            "image": "",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        "countInStock": 11,
        "rating": 4,
        "reviewsCount": 2,
        "isFeatured": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "_id": "68d7d4cb1e39357d53fb80b2",
        "title": "product title 3",
        "description": "product description",
        "richDescription": "",
        "image": "",
        "images": [],
        "brand": "",
        "price": 1000000,
        "category": {
            "_id": "68d683782f2799fb2c870d57",
            "title": "computer",
            "color": "#444",
            "icon": "icon-computer",
            "image": "",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        "countInStock": 11,
        "rating": 4,
        "reviewsCount": 2,
        "isFeatured": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "_id": "68d7d4cb1e39357d53fb80b1",
        "title": "product title 4",
        "description": "product description",
        "richDescription": "",
        "image": "",
        "images": [],
        "brand": "",
        "price": 1000000,
        "category": {
            "_id": "68d683782f2799fb2c870d57",
            "title": "computer",
            "color": "#444",
            "icon": "icon-computer",
            "image": "",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        "countInStock": 11,
        "rating": 4,
        "reviewsCount": 2,
        "isFeatured": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
    }
];

const SingleProductsScreen = () => {
    const [product, setProduct] = useState<Product | null>(null);

    const basket = useAppSelector(state => state.basket.basket);
    const dispatch = useAppDispatch();

    const params = useRoute<ProductDetailsScreenRouteProps>().params;
    const navigation = useNavigation<ProductDetailsScreenProps>();

    useLayoutEffect(() => {
        if (!params?.id) return navigation.navigate("Home");

        const targetProduct = testProduct.find(product => product._id === params.id);
        if (!targetProduct) return navigation.navigate("Home");

        navigation.setOptions({
            title: targetProduct.title
        });

        setProduct(targetProduct);


    }, [params, navigation]);

    const addToBasketHandler = (): void => {
        if (!product) return;

        const { _id, title, image, price, countInStock } = product;
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

        dispatch(removeOne(product._id));

        Toast.show({
            type: "default",
            text1: "Success",
            text2: `"${product.title}" removed from cart.`,
            position: "top"
        });
    };

    if (!product) return <ActivityIndicator size="large" className="flex-1" />;

    return (
        <View className="flex-1 px-5 pt-10 pb-6 bg-white">
            <ScrollView>
                <Image
                    source={product.image ? { uri: `${Platform.select({ ios: process.env.EXPO_PUBLIC_STATIC_BASE_URL, android: process.env.EXPO_PUBLIC_ANDROID_STATIC_BASE_URL })}/${product.image}` } : require("~/../assets/box.png")}
                    className="h-56 mx-auto aspect-video"
                    resizeMode="contain"
                />
                <Text className="mt-3 font-bold text-3xl text-center">{product.title}</Text>
                {product.brand && <Text className="mt-2 font-bold text-2xl text-center">{product.brand}</Text>}

                <Text className="mt-3 pt-3 border-gray-300 border-t text-lg">{product.description}</Text>
            </ScrollView>

            <View className="flex-row justify-between items-center mt-auto pt-3 border-gray-300 border-t">
                <Text className="font-bold text-2xl text-tint">${product.price.toLocaleString()}</Text>

                {!!product.countInStock ? (
                    <View className={Platform.OS !== "ios" ? "mt-1" : ""}>
                        {basket.some(item => item._id === product._id) ? (
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