import { Text,  View } from "react-native";
import { Product } from "../../../types";

const ProductCard = ({ title }: Product) => {
    return (
        <View className="w-1/2 bg-slate-100">
            <Text>{title}</Text>
        </View>
    );
};

export default ProductCard;