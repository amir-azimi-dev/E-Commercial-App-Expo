import { ActivityIndicator, Text, View } from "react-native";
import useIsAdmin from "utils/useIsAdmin";

const ProductFormScreen = () => {
    const isAdmin = useIsAdmin();

    if (isAdmin === null) return <ActivityIndicator size="large" className="flex-1" />;
    if (isAdmin === false) return;
    

    return (
        <View className="flex-1 px-5 bg-slate-200">
            <Text>Product Form</Text>
        </View>
    );
};

export default ProductFormScreen;