import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Platform, Pressable, Text, View } from "react-native";
import { Order } from "~/../types";

const OrderStatuses = ["Rejected", "Pending", "Processing", "Shipped", "Delivered"] as const;
type OrderStatus = typeof OrderStatuses[number];

const OrderCard = ({ _id, status, totalPrice, customer, shippingAddress1, shippingAddress2, phone, country, city, zip, createdAt }: Order) => {
    const [orderStatus, setOrderStatus] = useState<OrderStatus>(status as OrderStatus);

    const getStatusColor = (status: OrderStatus): string => {
        if (status === "Rejected") return "#ff0000";
        if (["Pending", "Processing"].includes(status)) return "#f07d35";
        if (["Shipped", "Delivered"].includes(status)) return "#2ECC71";

        return "#000";
    };

    const changeOrderStatusHandler = (newStatus: OrderStatus): void => {
        if (orderStatus === newStatus) return;

        Alert.alert(
            "Change Order Status?",
            "Are you sure you want to proceed?",
            [
                { text: "Discard", style: "cancel" },
                {
                    text: "Confirm", style: "default", onPress: changeOrderStatus.bind(this, newStatus)
                }
            ]
        );
    };

    const changeOrderStatus = (newStatus: OrderStatus) => {
        setOrderStatus(newStatus);
    };

    return (
        <View className="p-4 bg-white rounded-lg overflow-hidden">
            <View className="flex flex-row justify-between gap-x-3 mb-3 pb-3 border-gray-300 border-b">
                <View>
                    <Text className="mb-2 font-bold">#{_id.substring(0, 8)}</Text>

                    <View className="flex-row items-center gap-x-1">
                        <Text>Status:</Text>
                        <Text className="font-bold">{status}</Text>
                        <View className="rounded-full size-4" style={{ backgroundColor: getStatusColor(orderStatus) }}></View>
                    </View>
                </View>

                <View>
                    <Text className="mb-2 font-bold text-orange-400">
                        ${totalPrice.toLocaleString()}
                    </Text>

                    <View className="flex-row items-center gap-x-1">
                        <Text numberOfLines={1} ellipsizeMode="tail">Customer:
                            <Text className="font-bold">{customer.name}</Text>
                        </Text>
                    </View>
                </View>
            </View>

            <View className="mb-3 pb-3 border-gray-300 border-b">
                <View className="flex flex-row justify-between gap-x-3 mb-2">
                    <View>
                        <View className="flex-row items-center gap-x-1 mb-2">
                            <Text>Country:</Text>
                            <Text className="font-bold">{country}</Text>
                        </View>

                        <View className="flex-row items-center gap-x-1">
                            <Text>Phone:</Text>
                            <Text className="font-bold">{phone}</Text>
                        </View>
                    </View>

                    <View>
                        <View className="flex-row items-center gap-x-1 mb-2">
                            <Text>City:</Text>
                            <Text className="font-bold">{city}</Text>
                        </View>

                        <View className="flex-row items-center gap-x-1">
                            <Text>Date Ordered:</Text>
                            <Text className="font-bold">{createdAt.toString().split("T")[0]}</Text>
                        </View>
                    </View>
                </View>

                <View className="flex-row items-center gap-x-1 mb-2">
                    <Text>Address 1:</Text>
                    <Text className="font-bold">{shippingAddress1}</Text>
                </View>

                <View className="flex-row items-center gap-x-1 mb-2">
                    <Text>Address 2:</Text>
                    <Text className="font-bold">{shippingAddress2}</Text>
                </View>

                <View className="flex-row items-center gap-x-1 mb-2">
                    <Text>Zip Code:</Text>
                    <Text className="font-bold">{zip}</Text>
                </View>
            </View>

            <View className="mb-4">
                <Text className="mb-1 font-semibold">Status</Text>

                <View className="flex-row flex-wrap justify-center gap-2">
                    {OrderStatuses.map(status => (
                        <View key={status} className="rounded-lg overflow-hidden">
                            <Pressable android_ripple={{ color: "c1c1c16a", foreground: true }} onPress={changeOrderStatusHandler.bind(this, status)}>
                                {({ pressed }) => (
                                    <View
                                        className={`flex-row items-center gap-x-2 py-1.5 ${(status === orderStatus) ? "px-2" : "px-3.5"}`}
                                        style={{ backgroundColor: getStatusColor(status), opacity: pressed ? 0.5 : 1 }}
                                    >
                                        <Text className="font-semibold text-white">{status}</Text>
                                        {(status === orderStatus) && <FontAwesome name="check" color="#fff" />}
                                    </View>
                                )}
                            </Pressable>
                        </View>
                    ))}
                </View>

            </View>
        </View>
    );
};

export default OrderCard;