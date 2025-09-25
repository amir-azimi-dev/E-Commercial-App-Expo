import mongoose, { InferRawDocType } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
}, {
    timestamps: true,
    autoCreate: true
});

const UserModel = mongoose.model("User", userSchema);

export type UserDocument = InferRawDocType<typeof userSchema>;
export default UserModel;