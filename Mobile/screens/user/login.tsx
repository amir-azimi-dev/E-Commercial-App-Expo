import { useReducer } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import Button from "components/modules/Button";
import { useNavigation } from "@react-navigation/native";
import { UserStackProps } from "types/navigation";

type FormState = {
    identifier: string;
    password: string;
};

type ActionTypes = "identifier" | "password";

const initialState = {
    identifier: "",
    password: ""
};

const reducer = (state: FormState, action: { type: ActionTypes, payload: string }) => {
    switch (action.type) {
        case "identifier": {
            return { ...state, identifier: action.payload };
        }
        case "password": {
            return { ...state, password: action.payload };
        }
        default: {
            return state;
        }
    }
};

const LoginScreen = () => {
    const [formState, dispatch] = useReducer(reducer, initialState);

    const navigation = useNavigation<UserStackProps>();

    const changeInputHandler = (field: ActionTypes, newValue: string) => {
        dispatch({ type: field, payload: newValue });
    };

    const navigateToRegisterScreen = (): void => {
        navigation.replace("Register");
    };

    const loginHandler = (): void => {
        if (!formState.identifier.trim() || !formState.password.trim()) {
            return Alert.alert("Invalid Entry", "Please fill all the fields!");
        }

        
    };


    return (
        <ScrollView className="flex-1 px-4 py-8 bg-slate-200">
            <View className="mt-10 p-8 border-2 border-blue-400 rounded-xl">
                <Text className="mb-6 font-bold text-3xl text-center">Login</Text>

                <View className="mb-4">
                    <Text className="mb-1 font-semibold">Email or Phone Number</Text>
                    <TextInput
                        placeholder="Your Email or Phone Number"
                        value={formState.identifier}
                        onChangeText={changeInputHandler.bind(this, "identifier")}
                        inputMode="numeric"
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


                <View className="mb-4">
                    <Button title="Login" onPress={loginHandler} />
                </View>
                <Text className="text-center">
                    Don't have an account? {""}
                    <Text className="font-semibold" onPress={navigateToRegisterScreen}>Register</Text>
                </Text>
            </View>
        </ScrollView>
    );
};

export default LoginScreen;