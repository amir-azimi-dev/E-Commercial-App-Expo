import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Auth } from "types";

const LOGIN = gql`
    mutation ($identifier: String!, $password: String!) {
        loginUser(identifier: $identifier, password: $password) {
            user {
                _id
                name
                email
                phone
                isAdmin
                street
                apartment
                city
                zip
                country
                createdAt
                updatedAt
            },
            
            token
        }
    }
`;

type LoginVars = {
    identifier: string;
    password: string;
};

type LoginData = {
    loginUser: Auth;
};

const useLogin = () => {
    return useMutation<LoginData, LoginVars>(LOGIN);
}

export default useLogin;