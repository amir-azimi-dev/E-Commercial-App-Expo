import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { User } from "types";

const GET_USER = gql`
    query {
        getMe {
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
        }
    }
`;
type GetUserData = {
    getMe: User;
};

const useUser = () => {
    return useQuery<GetUserData>(GET_USER);
}

export default useUser;