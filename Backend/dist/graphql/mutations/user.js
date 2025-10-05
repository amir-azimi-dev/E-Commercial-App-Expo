"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUser = exports.loginUser = exports.registerUser = void 0;
const graphql_1 = require("graphql");
const user_1 = __importDefault(require("../../db/models/user"));
const hash_1 = require("../../utils/hash");
const jwt_1 = require("../../utils/jwt");
const mongoose_1 = __importDefault(require("mongoose"));
const registerUser = async (_, { name, email, password, phone, street, apartment, city, zip, country }) => {
    try {
        const isTheFirstUser = !(await user_1.default.countDocuments());
        const data = {
            name,
            email,
            password: (0, hash_1.hash)(password),
            isAdmin: isTheFirstUser,
            phone,
            street,
            apartment,
            city,
            zip,
            country
        };
        const newUserData = await user_1.default.create(data);
        const userToken = (0, jwt_1.generateToken)({ userId: newUserData._id });
        if (!userToken)
            throw new graphql_1.GraphQLError("Error while generating token!");
        return ({ user: newUserData, token: userToken });
    }
    catch (error) {
        if (error.code === 11000) {
            throw new graphql_1.GraphQLError("Email or Phone Number is already registered!", {
                extensions: {
                    field: "email",
                    code: "BAD_USER_INPUT"
                }
            });
        }
        throw new graphql_1.GraphQLError(error);
    }
};
exports.registerUser = registerUser;
const loginUser = async (_, { identifier, password }) => {
    try {
        const userData = await user_1.default.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
        if (!userData)
            throw new graphql_1.GraphQLError("User Not Found!");
        const isPasswordCorrect = (0, hash_1.compare)(password, userData.password);
        if (!isPasswordCorrect)
            throw new graphql_1.GraphQLError("Invalid Credentials!");
        const userToken = (0, jwt_1.generateToken)({ userId: userData._id });
        if (!userToken)
            throw new graphql_1.GraphQLError("Error while generating token!");
        return ({ user: userData, token: userToken });
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.loginUser = loginUser;
const removeUser = async (_, { id }) => {
    try {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new graphql_1.GraphQLError("Invalid entry!");
        const removedUserData = await user_1.default.findByIdAndDelete(id);
        if (!removedUserData)
            throw new graphql_1.GraphQLError("User not found!");
        return removedUserData;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.removeUser = removeUser;
//# sourceMappingURL=user.js.map