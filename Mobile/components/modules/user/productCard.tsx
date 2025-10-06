import { Button, Image, Platform, StyleSheet, Text, View } from "react-native";
import { Product } from "../../../types";

const ProductCard = ({ title, image, price, countInStock }: Product) => {
    return (
        <View className="flex-1 pt-20 pb-2">
            <View className="items-center p-4 pt-36 rounded-lg" style={styles.container}>
                <Image
                    source={image ? { uri: `${process.env.EXPO_PUBLIC_STATIC_BASE_URL}/${image}` } : require("../../../assets/box.png")}
                    className="absolute -top-8 h-40 aspect-video"
                    resizeMode="contain"
                />
                <Text className="font-bold text-center text-xl">{title.length > 15 ? `${title.substring(0, 12)} ...` : title}</Text>
                <Text className="font-bold text-center text-orange-400 text-xl">${price}</Text>

                {!!countInStock ? (
                    <View className={Platform.OS !== "ios" ? "mt-1" : ""}>
                        <Button title="Add to Cart" color="green" />
                    </View>
                ) : (
                    <Text className="font-bold text-red-500">Unavailable</Text>
                )}
            </View>
        </View>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        boxShadow: "2px 2px 5px #00000055"
    }
});