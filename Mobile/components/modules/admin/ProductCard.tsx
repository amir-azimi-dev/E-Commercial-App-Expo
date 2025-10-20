import { Image, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { Product } from "~/../types";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenProps } from "types/navigation";

const ProductCard = ({ _id, title, brand, category, image, price, index }: Product & { index: number }) => {
    const navigation = useNavigation<HomeScreenProps>();

    const navigateToProductDetailsHandler = (): void => {
        navigation.getParent()?.navigate("HomeStack", {
            screen: "ProductDetails",
            params: { id: _id },
        });
    };

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="w-full">
            <Pressable
                onPress={navigateToProductDetailsHandler}
                className="flex-1"
                android_ripple={{ color: "c1c1c16a", foreground: true }}
            >
                {({ pressed }) => (
                    <View
                        className="flex-row justify-between items-center gap-x-2.5 p-2 rounded-lg"
                        style={[{ backgroundColor: index % 2 ? "gainsboro" : "white" }, pressed && { opacity: 0.7 }]}

                    >
                        <Image
                            source={image ? { uri: `${Platform.select({ ios: process.env.EXPO_PUBLIC_STATIC_BASE_URL, android: process.env.EXPO_PUBLIC_ANDROID_STATIC_BASE_URL })}/${image}` } : require("~/../assets/box.png")}
                            className="h-16 bg-blue-500 aspect-square"
                            resizeMode="contain"
                        />
                        <Text className="font-bold text-center text-xl" numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                        <Text className="font-bold text-center text-xl" numberOfLines={1} ellipsizeMode="tail">{brand || "Unknown"}</Text>
                        <Text className="font-bold text-center text-xl" numberOfLines={1} ellipsizeMode="tail">{category.title}</Text>
                        <Text className="font-bold text-center text-orange-400 text-xl">${price.toLocaleString()}</Text>
                    </View>
                )}
            </Pressable>
        </ScrollView>
    );
};

export default ProductCard;