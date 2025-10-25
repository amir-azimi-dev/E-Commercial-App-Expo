import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Product } from "types";

const REMOVE_PRODUCT = gql`
    mutation ($id: ID!) {
        removeProduct(id: $id) {
            _id
            title
            description
            richDescription
            image
            images
            brand
            price
            category {
                _id
                title
                color
                icon
                image
                createdAt
                updatedAt
            }
            countInStock
            rating
            reviewsCount
            isFeatured
            createdAt
            updatedAt
        }
    }
`;

type RemoveProductVars = {
    id: string;
    
};

type RemoveProductData = {
    removeProduct?: Product;
};

const useRemoveProduct = () => {
    return useMutation<RemoveProductData, RemoveProductVars>(REMOVE_PRODUCT);
};

export default useRemoveProduct;