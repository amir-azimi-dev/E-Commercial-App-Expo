import { GraphQLError } from "graphql";
import UserModel, { UserDocument } from "../../db/models/user";
import mongoose from "mongoose";

const getUsers = async (): Promise<UserDocument[]> => {
    try {
        return UserModel.find({}, { password: 0 });

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

const getUser = async (_: unknown, { id }: { id: string }): Promise<UserDocument> => {
    try {
        if (!mongoose.isValidObjectId(id)) throw new GraphQLError("Invalid entry!");

        const userData = await UserModel.findById(id, { password: 0 });
        if (!userData) throw new GraphQLError("Category not found!");

        return userData;

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

export {
    getUsers,
    getUser
};