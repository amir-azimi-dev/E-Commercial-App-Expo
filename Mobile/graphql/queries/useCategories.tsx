import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Category } from "types";

const GET_PRODUCTS = gql`
    query {
        getCategories {
            _id
            title
            color
            icon
            image
            createdAt
            updatedAt
        }
    }
`;

type GetCategoriesData = {
    getCategories: Category[];
};

const useCategories = () => {
    return useQuery<GetCategoriesData>(GET_PRODUCTS);
}

export default useCategories;