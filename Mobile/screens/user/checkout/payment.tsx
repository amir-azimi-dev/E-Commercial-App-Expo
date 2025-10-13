import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { PaymentTabScreenRouteProps } from "types/navigation";

const PaymentScreen = () => {
    const shippingInfo = useRoute<PaymentTabScreenRouteProps>().params;
    console.log(shippingInfo);

    return (
        <View className="flex-1 px-5 bg-slate-200">
            <Text>PaymentScreen</Text>
        </View>
    );
};

export default PaymentScreen;