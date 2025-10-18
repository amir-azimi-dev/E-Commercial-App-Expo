import { useEffect } from "react";
import { Text, View } from "react-native";
import { useAppSelector } from "redux/store";
import { useNavigation } from "@react-navigation/native";
import { UserStackProps } from "types/navigation";

const ProfileScreen = () => {
    const userId = useAppSelector(state => state.user._id);

    const navigation = useNavigation<UserStackProps>();

    useEffect(() => {
        if (!userId) navigation.replace("Login");

    }, [userId]);

    return (
        <View className="flex-1 p-8 bg-slate-200">
            <Text>Register Page</Text>
        </View>
    );
};

export default ProfileScreen;