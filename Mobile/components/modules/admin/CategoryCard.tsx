import { Alert, Pressable, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Category } from "types";

type CategoryCardPropsTypes = Category & {
    removeCategory: (id: string) => Promise<void>;
};

const CategoryCard = ({ _id, title, color, removeCategory }: CategoryCardPropsTypes) => {
    const removeCategoryHandler = (): void => {
        Alert.alert(
            "Warning",
            "Are you sure you want to 'REMOVE' the category?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Remove", style: "destructive", onPress: () => removeCategory(_id) }
            ]
        );
    };

    return (
        <View className="flex-row justify-between items-center p-4 rounded-2xl" style={{ backgroundColor: color }}>
            <Text className="font-bold text-lg text-white">{title}</Text>
            <Pressable onPress={removeCategoryHandler}>
                {({ pressed }) => <FontAwesome name="trash" color="#ff0000" size={24} className={pressed ? "opacity-50" : "opacity-100"} />}
            </Pressable>
        </View>
    );
};

export default CategoryCard;