import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    street: {
        type: String,
        default: ""
    },
    apartment: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    zip: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
}, {
    timestamps: true,
    autoCreate: true
});

const UserModel = mongoose.model("User", userSchema);

type User = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<User> & {
    createdAt: Date;
    updatedAt: Date;
};

export default UserModel;