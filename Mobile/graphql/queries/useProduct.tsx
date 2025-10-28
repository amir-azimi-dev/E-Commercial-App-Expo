import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Product } from "types";

const GET_PRODUCT = gql`
    query GetProduct ($id: ID!) {
        getProduct(id: $id) {
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

type GetProductData = {
    getProduct: Product;
};

type GetProductVars = {
    id: string;
};

const useProduct = ({ id }: GetProductVars) => {
    return useQuery<GetProductData, GetProductVars>(GET_PRODUCT, { variables: { id } });
}

export default useProduct;