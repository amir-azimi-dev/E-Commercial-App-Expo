import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Product } from "types";

const EDIT_PRODUCT = gql`
    mutation ($id: ID!, $title: String!, $description: String!, $richDescription: String, $image: String, $images: [String!], $brand: String, $price: Float!, $category: ID!, $countInStock: Int!, $rating: Int, $reviewsCount: Int, $isFeatured: Boolean) {
        editProduct(id: $id, title: $title, description: $description,richDescription: $richDescription, image: $image,images: $images, brand: $brand, price: $price, category: $category, countInStock: $countInStock, rating: $rating,reviewsCount: $reviewsCount, isFeatured: $isFeatured) {
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

type EditProductVars = {
    id: string;
    title: string;
    description: string;
    richDescription?: string;
    image?: string;
    images?: string[];
    brand: string;
    price: number;
    category: string;
    countInStock: number;
    rating: number;
    reviewsCount: number;
    isFeatured: boolean;
};

type EditProductData = {
    editProduct?: Product;
};

const useEditProduct = () => {
    return useMutation<EditProductData, EditProductVars>(EDIT_PRODUCT);
};

export default useEditProduct;