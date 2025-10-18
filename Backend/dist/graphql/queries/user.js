"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.getUser = exports.getUsers = void 0;
const graphql_1 = require("graphql");
const user_1 = __importDefault(require("../../db/models/user"));
const mongoose_1 = __importDefault(require("mongoose"));
const getUsers = async () => {
    try {
        return user_1.default.find({}, { password: 0 });
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.getUsers = getUsers;
const getUser = async (_, { id }) => {
    try {
        if (!mongoose_1.default.isValidObjectId(id))
            throw new graphql_1.GraphQLError("Invalid entry!");
        const userData = await user_1.default.findById(id, { password: 0 });
        if (!userData)
            throw new graphql_1.GraphQLError("Category not found!");
        return userData;
    }
    catch (error) {
        throw new graphql_1.GraphQLError(error);
    }
};
exports.getUser = getUser;
const getMe = async (_, __, context) => {
    return context.user;
};
exports.getMe = getMe;
//# sourceMappingURL=user.js.map