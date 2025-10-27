import { useLayoutEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import useOrders from "graphql/queries/useOrders";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AdminStackProps } from "types/navigation";
import useIsAdmin from "utils/useIsAdmin";
import OrderCard from "components/modules/admin/OrderCard";

const OrdersScreen = () => {
    const isAdmin = useIsAdmin();

    const { data: orders, loading, error } = useOrders();

    const navigation = useNavigation<AdminStackProps>();
    const isFocused = useIsFocused();

    useLayoutEffect(() => {
        if (!isFocused) return;

        navigation.getParent()?.setOptions({
            headerSearchBarOptions: undefined
        });

    }, [isFocused]);

    if (isAdmin === null || loading) return <ActivityIndicator size="large" className="flex-1" />;
    if (error) return <Text className="mt-5 font-bold text-2xl text-center">Error While Fetching Data!</Text>;
    if (isAdmin === false) return;

    return (
        <View className="flex-1 px-5 bg-slate-200">
            {!orders?.getOrders.length && (
                <Text className="mt-8 font-bold text-2xl text-center">No Order Yet!</Text>
            )}

            <FlatList
                data={orders?.getOrders}
                renderItem={({ item }) => <OrderCard {...item} />}
                keyExtractor={order => order._id}
                contentContainerStyle={{ rowGap: 12 }}
                className="-mx-4 my-3 px-4"
            />
        </View>
    );
};

export default OrdersScreen;