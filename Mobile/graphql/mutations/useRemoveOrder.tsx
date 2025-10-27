import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Order } from "types";

const REMOVE_ORDER = gql`
    mutation ($id: ID!) {
        removeOrder(id: $id) {
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

type RemoveOrderVars = {
    id: string;
};

type RemoveOrderData = {
    removeOrder: Order;
};

const useRemoveOrder = () => {
    return useMutation<RemoveOrderData, RemoveOrderVars>(REMOVE_ORDER);
}

export default useRemoveOrder;