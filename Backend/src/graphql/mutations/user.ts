import { GraphQLError } from "graphql";
import UserModel, { UserDocument } from "../../db/models/user";
import { LoginUserParams, RegisterUserParams } from "../types/user";
import { compare, hash } from "../../utils/hash";
import { generateToken } from "../../utils/jwt";

type AuthPayload = {
    user: UserDocument;
    token: string;
};

const registerUser = async (_: unknown, { name, email, password, phone, street, apartment, city, zip, country }: RegisterUserParams): Promise<AuthPayload> => {
    try {
        const isTheFirstUser = !(await UserModel.countDocuments());
        const data = {
            name,
            email,
            password: hash(password),
            isAdmin: isTheFirstUser,
            phone,
            street,
            apartment,
            city,
            zip,
            country
        };

        const newUserData = await UserModel.create(data);

        const userToken = generateToken({ userId: newUserData._id });
        if (!userToken) throw new GraphQLError("Error while generating token!");

        return ({ user: newUserData, token: userToken });

    } catch (error: any) {
        if (error.code === 11000) {
            throw new GraphQLError("Email or Phone Number is already registered!", {
                extensions: {
                    field: "email",
                    code: "BAD_USER_INPUT"
                }
            });
        }

        throw new GraphQLError(error);
    }
};

const loginUser = async (_: unknown, { identifier, password }: LoginUserParams): Promise<AuthPayload> => {
    try {
        const userData = await UserModel.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
        if (!userData) throw new GraphQLError("User Not Found!")

        const isPasswordCorrect = compare(password, userData.password)
        if (!isPasswordCorrect) throw new GraphQLError("Invalid Credentials!")

        const userToken = generateToken({ userId: userData._id });
        if (!userToken) throw new GraphQLError("Error while generating token!");

        return ({ user: userData, token: userToken });

    } catch (error: any) {
        throw new GraphQLError(error);
    }
};

export {
    registerUser,
    loginUser
};