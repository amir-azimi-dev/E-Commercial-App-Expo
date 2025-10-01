import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }

}, {
    timestamps: true,
    autoCreate: true
});

const OrderItemModel = mongoose.model("OrderItem", orderItemSchema);

type OrderItem = InferSchemaType<typeof orderItemSchema>;
export type OrderItemDocument = HydratedDocument<OrderItem> & {
    createdAt: Date;
    updatedAt: Date;
};

export default OrderItemModel;