import { useLayoutEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useApolloClient } from "@apollo/client/react";
import useOrders from "graphql/queries/useOrders";
import useUpdateOrderStatus from "graphql/mutations/useUpdateOrderStatus";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AdminStackProps } from "types/navigation";
import useIsAdmin from "utils/useIsAdmin";
import OrderCard from "components/modules/admin/OrderCard";
import { Toast } from "toastify-react-native";

const OrdersScreen = () => {
    const isAdmin = useIsAdmin();

    const { data: orders, loading, error } = useOrders();
    const [updateOrderStatus, { loading: isUpdatingOrderStatus }] = useUpdateOrderStatus();
    const client = useApolloClient();

    const navigation = useNavigation<AdminStackProps>();
    const isFocused = useIsFocused();
    const refetchOrders = () => client.refetchQueries({ include: ["GetOrders"] });

    useLayoutEffect(() => {
        if (!isFocused) return;

        navigation.getParent()?.setOptions({
            headerSearchBarOptions: undefined
        });

    }, [isFocused]);

    const updateOrderStatusHandler = async (id: string, newStatus: string): Promise<void> => {
        try {
            const { data: responseData } = await updateOrderStatus({ variables: { id, newStatus } });
            const data = responseData?.updateOrderStatus;

            if (!data?._id) throw new Error("");

            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Order updated successfully.",
                position: "top"
            });

            refetchOrders();

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: `Error While Updating the Order Status! Please try again. ${error}`,
                position: "top",
                useModal: true
            });
        }
    };

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
                renderItem={({ item }) => <OrderCard {...item} isFetching={isUpdatingOrderStatus} onUpdateOrderStatus={updateOrderStatusHandler} />}
                keyExtractor={order => order._id}
                contentContainerStyle={{ rowGap: 12 }}
                className="-mx-4 my-3 px-4"
            />
        </View>
    );
};

export default OrdersScreen;