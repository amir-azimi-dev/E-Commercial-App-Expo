import { useEffect } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "redux/store";
import { clearUserInfo } from "redux/reducers/user";
import { useNavigation } from "@react-navigation/native";
import { UserStackProps } from "types/navigation";
import { useApolloClient } from "@apollo/client/react";
import AuthenticateUser from "utils/AuthenticateUser";
import Button from "components/modules/Button";
import { Toast } from "toastify-react-native";

const ProfileScreen = () => {
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const navigation = useNavigation<UserStackProps>();

    const client = useApolloClient();
    const reauthenticateUser = () => client.refetchQueries({ include: ["GetMe"] });

    useEffect(() => {
        reauthenticateUser();

    }, []);

    useEffect(() => {
        if (!user._id) navigation.replace("Login");

    }, [user._id]);

    const logoutHandler = (): void => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", style: "destructive", onPress: logout }
        ]);
    };

    const logout = (): void => {
        dispatch(clearUserInfo());
        Toast.show({
            type: "success",
            text1: "You Logged out successfully.",
            position: "top"
        });
    };

    if (!user._id) return;

    return (
        <ScrollView className="flex-1 p-8 bg-slate-200">
            <Text className="mb-6 font-bold text-3xl text-center">User Information</Text>

            <Text className="mb-3 pb-3 border-gray-400 border-b text-lg">Name: <Text className="font-bold">{user.name}</Text></Text>
            <Text className="mb-3 pb-3 border-gray-400 border-b text-lg">Email: <Text className="font-bold">{user.email}</Text></Text>
            <Text className="mb-3 pb-3 border-gray-400 border-b text-lg">Phone: <Text className="font-bold">{user.phone}</Text></Text>
            <Text className="mb-3 pb-3 border-gray-400 border-b text-lg">Role: <Text className="font-bold">{user.isAdmin ? "Admin" : "User"}</Text></Text>

            <View className="my-4">
                <Button title="Logout" color="red" onPress={logoutHandler} />
            </View>

            <AuthenticateUser />
        </ScrollView>
    );
};

export default ProfileScreen;