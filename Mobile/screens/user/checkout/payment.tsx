import { useEffect, useState } from "react";
import { Alert, Button, Platform, ScrollView, Text, View } from "react-native";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { PaymentTabScreenProps, PaymentTabScreenRouteProps } from "types/navigation";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-gesture-handler";

const paymentMethods = [
    "Cache on Delivery",
    "Bank Transfer",
    "Card Payment"
] as const;

export type PaymentData = { paymentMethod: "Card Payment", cardNumber: string } |
{ paymentMethod: "Cache on Delivery" | "Bank Transfer", cardNumber: string | undefined };


const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState<typeof paymentMethods[number]>("Bank Transfer");
    const [cardNumber, setCardNumber] = useState<string>("");

    const shippingInfo = useRoute<PaymentTabScreenRouteProps>().params;
    const navigation = useNavigation<PaymentTabScreenProps>();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (shippingInfo) return;
        setTimeout(() => navigation.navigate("Shipping"), 100);

    }, [shippingInfo, isFocused]);


    const submitHandler = (): void => {
        if (paymentMethod === "Card Payment" && !cardNumber.trim()) {
            return Alert.alert("Invalid Entry!", "Please fill all the Inputs.");
        }

        navigation.navigate("Confirm", { ...shippingInfo, paymentMethod, cardNumber });
    };

    return (
        <ScrollView className="flex-1 p-8 bg-slate-200">
            <Text className="font-bold text-3xl text-center">Payment</Text>

            <View className="mb-4">
                <Text className="mb-1 font-semibold">Payment Method</Text>

                <View className={`bg-white border border-pink-500 rounded-lg text-lg ${Platform.select({ ios: "p-3" })}`}>
                    <Picker
                        selectedValue={paymentMethod}
                        onValueChange={setPaymentMethod.bind(this)}>
                        {paymentMethods.map(method => <Picker.Item key={method} label={method} value={method} />)}
                    </Picker>
                </View>

            </View>
            {paymentMethod === "Card Payment" && (
                <View className="mb-4">
                    <Text className="mb-1 font-semibold">Card Number (VisaCard, MasterCard, ...)</Text>
                    <TextInput
                        placeholder="Card Number"
                        value={cardNumber}
                        onChangeText={setCardNumber.bind(this)}
                        inputMode="numeric"
                        className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                    />
                </View>
            )}

            <View className="mb-4">
                <Button title="Next" onPress={submitHandler} />
            </View>
        </ScrollView>
    );
};

export default PaymentScreen;