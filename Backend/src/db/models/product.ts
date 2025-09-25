import mongoose, { HydratedDocument, InferRawDocType, InferSchemaType } from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    image: {
        type: String,
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    autoCreate: true
});

const ProductModel = mongoose.model("Product", productSchema);

type Product = InferSchemaType<typeof productSchema>;
export type ProductDocument = HydratedDocument<Product>;

export default ProductModel;