import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    richDescription: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    images: [{
        type: String
    }],
    brand: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 300
    },
    rating: {
        type: Number,
        default: 5,
        min: 0,
        max: 5
    },
    reviewsCount: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    autoCreate: true
});

const ProductModel = mongoose.model("Product", productSchema);

type Product = InferSchemaType<typeof productSchema>;
export type ProductDocument = HydratedDocument<Product>;

export default ProductModel;