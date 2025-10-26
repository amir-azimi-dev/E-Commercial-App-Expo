import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Category } from "types";

const REMOVE_CATEGORY = gql`
    mutation ($id: ID!) {
        removeCategory(id: $id) {
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

type RemoveCategoryVars = {
    id: string;
};

type RemoveCategoryData = {
    removeCategory: Category;
};

const useRemoveCategory = () => {
    return useMutation<RemoveCategoryData, RemoveCategoryVars>(REMOVE_CATEGORY);
}

export default useRemoveCategory;