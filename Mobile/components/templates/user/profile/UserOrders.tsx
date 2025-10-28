import { ActivityIndicator, FlatList, Text, View } from "react-native";
import useUserOrders from "graphql/queries/useUserOrders";
import OrderCard from "components/modules/user/OrderCard";

const UserOrders = () => {
    const { data: orders, loading, error } = useUserOrders();

    if (loading) return <ActivityIndicator size="large" className="flex-1" />;
    if (error) return <Text className="mt-5 font-bold text-2xl text-center">Error While Fetching Data!</Text>;

    return (
        <View className="flex-1 mt-4 pt-4">
            <Text className="mb-6 font-bold text-3xl text-center">Your Orders</Text>

            {!orders?.getUserOrders.length && (
                <Text className="mt-8 font-bold text-2xl text-center">No Order Yet!</Text>
            )}

            <FlatList
                data={orders?.getUserOrders}
                renderItem={({ item }) => <OrderCard {...item} />}
                keyExtractor={order => order._id}
                contentContainerStyle={{ rowGap: 12 }}
                className="-mx-4 my-3 px-4"
            />
        </View>
    );
};

export default UserOrders;