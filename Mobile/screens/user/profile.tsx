import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserStackProps } from "types/navigation";

const ProfileScreen = () => {
    const navigation = useNavigation<UserStackProps>();

    navigation.replace("Login");

    return (
        <View className="flex-1 p-8 bg-slate-200">
            <Text>Register Page</Text>
        </View>
    );
};

export default ProfileScreen;