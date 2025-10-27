import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Order } from "types";

const GET_ORDERS = gql`
    query GetOrders {
        getOrders {
            _id
            orderItems {
                _id
                product {
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
                
                quantity
                createdAt
                updatedAt
            }
            status
            totalPrice
            customer {
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
            shippingAddress1
            shippingAddress2
            phone
            city
            zip
            country
            createdAt
            updatedAt
        }
    }
`;

type GetOrdersData = {
    getOrders: Order[];
};

const useOrders = () => {
    return useQuery<GetOrdersData>(GET_ORDERS);
}

export default useOrders;