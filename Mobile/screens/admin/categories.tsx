import { ActivityIndicator, Text, View } from "react-native";
import useIsAdmin from "utils/useIsAdmin";


const CategoriesScreen = () => {
    const isAdmin = useIsAdmin();

    if (isAdmin === null) return <ActivityIndicator size="large" className="flex-1" />;
    if (isAdmin === false) return;

    return (
        <View className="flex-1 px-5 bg-slate-200">
            <Text>Categories</Text>
        </View>
    );
};

export default CategoriesScreen;