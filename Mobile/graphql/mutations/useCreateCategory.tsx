import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Category } from "types";

const CREATE_CATEGORY = gql`
    mutation ($title: String!, $color: String!, $icon: String, $image: String) {
        createCategory(title: $title, color: $color, icon: $icon, image: $image) {
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

type CreateCategoryVars = {
    title: string;
    color: string;
    icon?: string;
    image?: string;
};

type CreateCategoryData = {
    createCategory: Category;
};

const useCreateCategory = () => {
    return useMutation<CreateCategoryData, CreateCategoryVars>(CREATE_CATEGORY);
}

export default useCreateCategory;