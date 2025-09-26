import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    color: {
        type: String,
        require: true
    },
    icon: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    }
}, {
    timestamps: true,
    autoCreate: true
});

const CategoryModel = mongoose.model("Category", categorySchema);

type Category = InferSchemaType<typeof categorySchema>;
export type CategoryDocument = HydratedDocument<Category>;

export default CategoryModel;