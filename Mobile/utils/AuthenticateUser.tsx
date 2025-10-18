import useUser from "graphql/queries/useUser";
import { useAppDispatch, useAppSelector } from "redux/store";
import { clearUserInfo, saveUserInfo } from "redux/reducers/user";
import { useEffect } from "react";


const AuthenticateUser = () => {
    const userToken = useAppSelector(state => state.user.token);
    console.log(useAppSelector(state => state.user));
    
    const dispatch = useAppDispatch();

    const { data: userInfo, loading } = useUser();

    useEffect(() => {
        if (loading) return;

        if (!userToken || !userInfo?.getMe) {
            dispatch(clearUserInfo());
            return;
        }

        const { _id, name, isAdmin } = userInfo.getMe;
        dispatch(saveUserInfo({ _id, name, isAdmin, token: userToken }));

    }, [userInfo, userToken, loading]);

    return null;
};

export default AuthenticateUser;