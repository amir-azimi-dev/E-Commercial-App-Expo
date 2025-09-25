import { GraphQLError } from "graphql";
import UserModel, { UserDocument } from "../../db/models/user";
import { RegisterUserParams } from "../types/user";
import { hash } from "../../utils/hash";

const registerUser = async (_: unknown, { name, email, password }: RegisterUserParams): Promise<any | UserDocument> => {
    try {
        const data = { name, email, password: hash(password) };
        const newUserData = await UserModel.create(data);

        return newUserData;

    } catch (error: any) {
        if (error.code === 11000) {
            throw new GraphQLError("Email is already registered!", {
                extensions: {
                    field: "email",
                    code: "BAD_USER_INPUT"
                }
            });
        }

        throw new GraphQLError(error);
    }
};

export {
    registerUser
};