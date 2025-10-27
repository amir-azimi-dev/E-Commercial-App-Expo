import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Order } from "types";

const UPDATE_ORDER_STATUS = gql`
    mutation ($id: ID!, $newStatus: String!) {
        updateOrderStatus(id: $id, newStatus: $newStatus) {
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

type UpdateOrderStatusVars = {
    id: string;
    newStatus: string;
};

type UpdateOrderStatusData = {
    updateOrderStatus: Order;
};

const useUpdateOrderStatus = () => {
    return useMutation<UpdateOrderStatusData, UpdateOrderStatusVars>(UPDATE_ORDER_STATUS);
}

export default useUpdateOrderStatus;