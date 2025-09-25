import { GraphQLError } from "graphql";
import UserModel, { UserDocument } from "../../db/models/user";
import { RegisterUserParams } from "../types/user";
import { compare, hash } from "../../utils/hash";

const registerUser = async (_: unknown, { name, email, password }: RegisterUserParams): Promise<UserDocument> => {
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

const loginUser = async (_: unknown, { email, password }: RegisterUserParams): Promise<UserDocument> => {
    const userData = await UserModel.findOne({ email });
    if (!userData) throw new GraphQLError("User Not Found!")

    const isPasswordCorrect = compare(password, userData.password)
    if (!isPasswordCorrect) throw new GraphQLError("Invalid Credentials!")

    return userData;
};

export {
    registerUser,
    loginUser
};