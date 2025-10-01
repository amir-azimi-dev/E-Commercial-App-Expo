import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

const orderSchema = new mongoose.Schema({
    orderItems: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: "OrderItem",
            required: true
        }],
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Delivered", "Rejected"],
        default: "Pending"
    },
    totalPrice: {
        type: Number,
        required: true
    },
    customer: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    shoppingAddress1: {
        type: String,
        required: true
    },
    shoppingAddress2: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }

}, {
    timestamps: true,
    autoCreate: true
});

const OrderModel = mongoose.model("Order", orderSchema);

type Order = InferSchemaType<typeof orderSchema>;
export type OrderDocument = HydratedDocument<Order> & {
    createdAt: Date;
    updatedAt: Date;
};

export default OrderModel;