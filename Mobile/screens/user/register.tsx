import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserStackProps } from "types/navigation";

const RegisterScreen = () => {
    const navigation = useNavigation<UserStackProps>();

    const navigateToLoginScreen = (): void => {
        navigation.replace("Login");
    };

    return (
        <View className="flex-1 p-8 bg-slate-200">
            <Text>Register Page</Text>

            <Text className="text-center">
                have an account? {""}
                <Text className="font-semibold" onPress={navigateToLoginScreen}>Login</Text>
            </Text>
        </View>
    );
};

export default RegisterScreen;