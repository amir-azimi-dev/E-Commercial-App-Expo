import { Image, Platform, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Product } from "~/../types";
import { useNavigation } from "@react-navigation/native";
import { AdminStackProps } from "types/navigation";

const ProductCard = (props: Product & { index: number }) => {
    const { _id, title, brand, category, image, price, index } = props;
    const { width } = useWindowDimensions();

    const navigation = useNavigation<AdminStackProps>();

    const navigateToProductDetailsHandler = (): void => {
        navigation.getParent()?.navigate("HomeStack", {
            screen: "ProductDetails",
            params: { id: _id },
        });
    };

    const navigateToEditProductHandler = (): void => {
        navigation.navigate("ProductForm", { product: props });
    };

    return (
        <View className="rounded-lg overflow-hidden">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="w-full"
            >
                <Pressable
                    onPress={navigateToProductDetailsHandler}
                    android_ripple={{ color: "c1c1c16a", foreground: true }}
                >
                    {({ pressed }) => (
                        <View
                            className="flex-row items-center gap-x-2.5 p-2 rounded-lg"
                            style={[
                                {
                                    backgroundColor: index % 2 ? "gainsboro" : "white",
                                    minWidth: width - 12
                                },
                                pressed && { opacity: 0.7 },
                            ]}
                        >
                            <Image
                                source={image ? { uri: `${Platform.select({ ios: process.env.EXPO_PUBLIC_STATIC_BASE_URL, android: process.env.EXPO_PUBLIC_ANDROID_STATIC_BASE_URL })}/${image}`, } : require("~/../assets/box.png")}
                                className="w-16 h-16"
                                resizeMode="contain"
                            />

                            <View className="w-0.5 h-full bg-gray-100" />
                            <Text
                                className="flex-1 font-bold text-center"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {title}
                            </Text>

                            <View className="w-0.5 h-full bg-gray-100" />
                            <Text
                                className="flex-1 font-bold text-center"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {brand || "Unknown"}
                            </Text>

                            <View className="w-0.5 h-full bg-gray-100" />
                            <Text
                                className="flex-1 font-bold text-center"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {category.title}
                            </Text>

                            <View className="w-0.5 h-full bg-gray-100" />
                            <Text className="flex-1 font-bold text-center text-orange-400">
                                ${price.toLocaleString()}
                            </Text>

                            <View className="w-0.5 h-full bg-gray-100" />

                            <Pressable onPress={navigateToEditProductHandler}>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="edit"
                                        color="#00a6ff"
                                        size={30}
                                        style={{ opacity: pressed ? 0.7 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </View>
                    )}
                </Pressable>
            </ScrollView>
        </View>
    );
};

export default ProductCard;