import { useLayoutEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AdminStackProps } from "types/navigation";
import useIsAdmin from "utils/useIsAdmin";

const OrdersScreen = () => {
    const isAdmin = useIsAdmin();

    const navigation = useNavigation<AdminStackProps>();
    const isFocused = useIsFocused();

    useLayoutEffect(() => {
        if (!isFocused) return;

        navigation.getParent()?.setOptions({
            headerSearchBarOptions: undefined
        });

    }, [isFocused]);

    if (isAdmin === null) return <ActivityIndicator size="large" className="flex-1" />;
    if (isAdmin === false) return;

    return (
        <View className="flex-1 px-5 bg-slate-200">
            <Text>Orders</Text>
        </View>
    );
};

export default OrdersScreen;