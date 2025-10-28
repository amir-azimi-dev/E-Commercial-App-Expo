import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Order } from "types";

const GET_USER_ORDERS = gql`
    query GetUserOrders {
        getUserOrders {
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

type GetUserOrdersData = {
    getUserOrders: Order[];
};

const useUserOrders = () => {
    return useQuery<GetUserOrdersData>(GET_USER_ORDERS);
}

export default useUserOrders;