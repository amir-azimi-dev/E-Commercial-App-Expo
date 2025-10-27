import { useEffect, useReducer } from "react";
import { Platform, Text, TextInput, View, ScrollView, Alert } from "react-native";
import Button from "components/modules/Button";
import { useAppSelector } from "redux/store";
import { Picker } from '@react-native-picker/picker';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ShippingTabScreenProps } from "types/navigation";
import countries from "db/countries";

export type ShippingState = {
    phone: string;
    shippingAddress1: string;
    shippingAddress2: string;
    country: string;
    city: string;
    zip: string;
};

type ActionTypes = "phone" | "shippingAddress1" | "shippingAddress2" | "country" | "city" | "zip";

const initialState = {
    phone: "",
    shippingAddress1: "",
    shippingAddress2: "",
    country: "Iran",
    city: "",
    zip: ""
};

const reducer = (state: ShippingState, action: { type: ActionTypes, payload: string }) => {
    switch (action.type) {
        case "phone": {
            return { ...state, phone: action.payload };
        }
        case "shippingAddress1": {
            return { ...state, shippingAddress1: action.payload };
        }
        case "shippingAddress2": {
            return { ...state, shippingAddress2: action.payload };
        }
        case "country": {
            return { ...state, country: action.payload };
        }
        case "city": {
            return { ...state, city: action.payload };
        }
        case "zip": {
            return { ...state, zip: action.payload };
        }
        default: {
            return state;
        }
    }
};

const ShippingScreen = () => {
    const user = useAppSelector(state => state.user);

    const [formState, dispatch] = useReducer(reducer, initialState);

    const navigation = useNavigation<ShippingTabScreenProps>();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!user._id) setTimeout(() => navigation.getParent()?.navigate("Basket"), 200);

    }, [isFocused]);

    const changeInputHandler = (field: ActionTypes, newValue: string) => {
        dispatch({ type: field, payload: newValue });
    };

    const submitHandler = (): void => {
        if (
            !formState.phone.trim() ||
            !formState.shippingAddress1.trim() ||
            !formState.shippingAddress2.trim() ||
            !formState.country.trim() ||
            !formState.city.trim() ||
            !formState.zip.trim()
        ) {
            return Alert.alert("Invalid Entry!", "Please fill all the Inputs.");
        }

        navigation.navigate("Payment", formState);
    };

    return (
        <ScrollView className="flex-1 p-8 bg-slate-200">
            <Text className="font-bold text-3xl text-center">Shipping Address</Text>

            <View className="mb-4">
                <Text className="mb-1 font-semibold">Phone</Text>
                <TextInput
                    placeholder="Your Phone Number"
                    value={formState.phone}
                    onChangeText={changeInputHandler.bind(this, "phone")}
                    inputMode="numeric"
                    className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                />
            </View>
            <View className="mb-4">
                <Text className="mb-1 font-semibold">Shipping Address 1</Text>
                <TextInput
                    placeholder="First Address"
                    value={formState.shippingAddress1}
                    onChangeText={changeInputHandler.bind(this, "shippingAddress1")}
                    inputMode="text"
                    className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                />
            </View>
            <View className="mb-4">
                <Text className="mb-1 font-semibold">Shipping Address 2</Text>
                <TextInput
                    placeholder="Second Address"
                    value={formState.shippingAddress2}
                    onChangeText={changeInputHandler.bind(this, "shippingAddress2")}
                    inputMode="text"
                    className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                />
            </View>
            <View className="mb-4">
                <Text className="mb-1 font-semibold">Country</Text>

                <View className={`bg-white border border-pink-500 rounded-lg text-lg ${Platform.select({ ios: "p-3" })}`}>
                    <Picker
                        selectedValue={formState.country}
                        onValueChange={changeInputHandler.bind(this, "country")}>
                        {countries.map(country => <Picker.Item key={country} label={country} value={country} />)}
                    </Picker>
                </View>
            </View>
            <View className="mb-4">
                <Text className="mb-1 font-semibold">City</Text>
                <TextInput
                    placeholder="City"
                    value={formState.city}
                    onChangeText={changeInputHandler.bind(this, "city")}
                    inputMode="numeric"
                    className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                />
            </View>
            <View className="mb-4">
                <Text className="mb-1 font-semibold">Zip</Text>
                <TextInput
                    placeholder="Your Zip Code"
                    value={formState.zip}
                    onChangeText={changeInputHandler.bind(this, "zip")}
                    inputMode="numeric"
                    className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                />
            </View>

            <View className="mb-4">
                <Button title="Next" onPress={submitHandler} />
            </View>
        </ScrollView>
    );
};

export default ShippingScreen;