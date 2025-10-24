import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Product } from "types";

const GET_PRODUCTS = gql`
    query GetProducts ($count: Int, $categories: [String!], $onlyFeaturedProducts: Boolean) {
        getProducts(count: $count , categories: $categories, onlyFeaturedProducts: $onlyFeaturedProducts) {
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

type GetProductsData = {
    getProducts: Product[];
};

type GetProductsVars = {
    count?: number;
    categories?: string[];
    onlyFeaturedProducts?: boolean;
};

const useProducts = ({ count, categories, onlyFeaturedProducts }: GetProductsVars) => {
    return useQuery<GetProductsData, GetProductsVars>(GET_PRODUCTS, { variables: { count, categories, onlyFeaturedProducts } });
}

export default useProducts;