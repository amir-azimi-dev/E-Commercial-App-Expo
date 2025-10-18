import { useEffect, useReducer, useState } from "react";
import { Alert, Platform, ScrollView, Text, TextInput, View } from "react-native";
import { Checkbox } from "expo-checkbox";
import { useAppDispatch, useAppSelector } from "redux/store";
import { saveUserInfo } from "redux/reducers/user";
import { useNavigation } from "@react-navigation/native";
import { UserStackProps } from "types/navigation";
import { Picker } from "@react-native-picker/picker";
import Button from "components/modules/Button";
import countries from "db/countries";
import useRegister from "graphql/mutations/useRegister";
import { Toast } from "toastify-react-native";

type FormState = {
    name: string;
    email: string;
    phone: string;
    password: string;
    street: string;
    apartment: string;
    city: string;
    zip: string;
    country: string;
};

type ActionTypes = "name" | "email" | "phone" | "password" | "street" | "apartment" | "city" | "zip" | "country";

const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    street: "",
    apartment: "",
    city: "",
    zip: "",
    country: "Iran"
};

const reducer = (state: FormState, action: { type: ActionTypes, payload: string }) => {
    switch (action.type) {
        case "name": {
            return { ...state, name: action.payload };
        }
        case "email": {
            return { ...state, email: action.payload };
        }
        case "phone": {
            return { ...state, phone: action.payload };
        }
        case "password": {
            return { ...state, password: action.payload };
        }
        case "street": {
            return { ...state, street: action.payload };
        }
        case "apartment": {
            return { ...state, apartment: action.payload };
        }
        case "city": {
            return { ...state, city: action.payload };
        }
        case "zip": {
            return { ...state, zip: action.payload };
        }
        case "country": {
            return { ...state, country: action.payload };
        }
        default: {
            return state;
        }
    }
};

const RegisterScreen = () => {
    const [formState, dispatch] = useReducer(reducer, initialState);
    const [areOptionalFieldsVisible, setAreOptionalFieldsVisible] = useState<boolean>(false);

    const userId = useAppSelector(state => state.user._id);
    const reduxDispatch = useAppDispatch();

    const [registerUser, { loading }] = useRegister();

    const navigation = useNavigation<UserStackProps>();

    useEffect(() => {
        if (userId) navigation.replace("Profile");

    }, [userId]);

    const changeInputHandler = (field: ActionTypes, newValue: string) => {
        dispatch({ type: field, payload: newValue });
    };

    const navigateToLoginScreen = (): void => {
        navigation.replace("Login");
    };

    const registerHandler = async (): Promise<void> => {
        if (loading) return;

        const { name, email, phone, password } = formState;

        if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
            return Alert.alert("Invalid Entry", "Please fill all required fields!");
        }

        try {
            const { data: responseData } = await registerUser({ variables: formState });
            const data = responseData?.registerUser;

            if (!data?.token) throw new Error("");

            Toast.show({
                type: "success",
                text1: "Success",
                text2: "You Registered successfully.",
                position: "top"
            });

            reduxDispatch(saveUserInfo({ token: data.token, ...data.user }));

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: `Error While Registering! Please try again. ${error}`,
                position: "top",
                useModal: true
            });
        }
    };


    return (
        <ScrollView className="flex-1 px-4 py-8 bg-slate-200">
            <View className="mb-16 p-8 border-2 border-blue-400 rounded-xl">
                <Text className="mb-6 font-bold text-3xl text-center">Register</Text>

                <View className="mb-4">
                    <Text className="mb-1 font-semibold">Name</Text>
                    <TextInput
                        placeholder="Your Name"
                        value={formState.name}
                        onChangeText={changeInputHandler.bind(this, "name")}
                        inputMode="text"
                        autoCapitalize="words"
                        className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                    />
                </View>
                <View className="mb-4">
                    <Text className="mb-1 font-semibold">Email</Text>
                    <TextInput
                        placeholder="Your Email"
                        value={formState.email}
                        onChangeText={changeInputHandler.bind(this, "email")}
                        inputMode="text"
                        autoCapitalize="none"
                        className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                    />
                </View>
                <View className="mb-4">
                    <Text className="mb-1 font-semibold">Phone Number</Text>
                    <TextInput
                        placeholder="Your Phone Number"
                        value={formState.phone}
                        onChangeText={changeInputHandler.bind(this, "phone")}
                        inputMode="text"
                        className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                    />
                </View>
                <View className="mb-4">
                    <Text className="mb-1 font-semibold">Password</Text>
                    <TextInput
                        placeholder="Your Password"
                        value={formState.password}
                        onChangeText={changeInputHandler.bind(this, "password")}
                        inputMode="text"
                        secureTextEntry
                        className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                    />
                </View>
                <View className="mb-6">
                    <Text className="mb-1 font-semibold">Country</Text>

                    <View className={`bg-white border border-pink-500 rounded-lg text-lg ${Platform.select({ ios: "p-3" })}`}>
                        <Picker
                            selectedValue={formState.country}
                            onValueChange={changeInputHandler.bind(this, "country")}>
                            {countries.map(country => <Picker.Item key={country} label={country} value={country} />)}
                        </Picker>
                    </View>
                </View>

                <View className="flex-row items-center gap-x-1 mb-4">
                    <Checkbox
                        value={areOptionalFieldsVisible}
                        onValueChange={value => setAreOptionalFieldsVisible(value)}
                    />
                    <Text className="font-bold" onPress={() => setAreOptionalFieldsVisible(prev => !prev)}>Fill Optional Fields</Text>
                </View>

                {areOptionalFieldsVisible && (
                    <>
                        <View className="mb-4">
                            <Text className="mb-1 font-semibold">Street (optional)</Text>
                            <TextInput
                                placeholder="Street ..."
                                value={formState.street}
                                onChangeText={changeInputHandler.bind(this, "street")}
                                inputMode="text"
                                className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                            />
                        </View>
                        <View className="mb-4">
                            <Text className="mb-1 font-semibold">Apartment (optional)</Text>
                            <TextInput
                                placeholder="Your Apartment"
                                value={formState.apartment}
                                onChangeText={changeInputHandler.bind(this, "apartment")}
                                inputMode="text"
                                className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                            />
                        </View>
                        <View className="mb-4">
                            <Text className="mb-1 font-semibold">City (optional)</Text>
                            <TextInput
                                placeholder="City ..."
                                value={formState.city}
                                onChangeText={changeInputHandler.bind(this, "city")}
                                inputMode="text"
                                className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                            />
                        </View>
                        <View className="mb-4">
                            <Text className="mb-1 font-semibold">Zip Code (optional)</Text>
                            <TextInput
                                placeholder="Your Zip Code"
                                value={formState.zip}
                                onChangeText={changeInputHandler.bind(this, "zip")}
                                inputMode="text"
                                className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                            />
                        </View>
                    </>
                )}


                <View className="mb-4">
                    <Button title="Register" onPress={registerHandler} />
                </View>

                <Text className="text-center">
                    have an account? {""}
                    <Text className="font-semibold" onPress={navigateToLoginScreen}>Login</Text>
                </Text>
            </View>
        </ScrollView>
    );
};

export default RegisterScreen;