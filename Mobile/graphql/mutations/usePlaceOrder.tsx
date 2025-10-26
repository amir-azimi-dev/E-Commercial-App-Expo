import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Category, Order } from "types";

const PLACE_ORDER = gql`
    mutation ($orderItems: [OrderItemInput!]!, $shippingAddress1: String!, $shippingAddress2: String, $phone: String!, $city: String!, $zip: String!, $country: String!) {
        placeOrder(orderItems: $orderItems, shippingAddress1: $shippingAddress1, shippingAddress2: $shippingAddress2, phone: $phone, city: $city, zip: $zip, country: $country) {
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

type PlaceOrderVars = {
    orderItems: { product: string, quantity: number }[];
    shippingAddress1: string;
    shippingAddress2: string;
    phone: string;
    city: string;
    zip: string;
    country: string;
};

type PlaceOrderData = {
    placeOrder: Order;
};

const usePlaceOrder = () => {
    return useMutation<PlaceOrderData, PlaceOrderVars>(PLACE_ORDER);
}

export default usePlaceOrder;