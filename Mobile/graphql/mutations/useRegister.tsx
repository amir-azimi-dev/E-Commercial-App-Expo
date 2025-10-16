import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Auth, Product } from "types";

const REGISTER = gql`
    mutation ($name: String!, $email: String!, $phone: String!, $password: String!, $street: String, $apartment: String, $city: String, $zip: String, $country: String ) {
        registerUser(name: $name , email: $email, phone: $phone, password: $password, street: $street, apartment: $apartment, city: $city, zip: $zip, country: $country) {
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

type registerVars = {
    name: string;
    email: string;
    phone: string;
    password: string;
    street?: string;
    apartment?: string;
    city?: string;
    zip?: string;
    country?: string;
};

const useRegister = () => {
    return useMutation<Auth, registerVars>(REGISTER);
}

export default useRegister;