import { useEffect, useState } from "react";
import { useAppSelector } from "redux/store";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useApolloClient } from "@apollo/client/react";
import { AdminStackProps } from "types/navigation";


const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    const user = useAppSelector(state => state.user);

    const navigation = useNavigation<AdminStackProps>();
    const isFocused = useIsFocused();

    const client = useApolloClient();
    const reauthenticateUser = () => client.refetchQueries({ include: ["GetMe"] });

    useEffect(() => {
        reauthenticateUser();

        return () => setIsAdmin(null);

    }, []);

    useEffect(() => {
        if (!user._id || !user.isAdmin) {
            setIsAdmin(false);
            navigation.getParent()?.navigate("User");
        }

        setIsAdmin(true);

    }, [user._id, isFocused]);

    return isAdmin;
};

export default useIsAdmin;