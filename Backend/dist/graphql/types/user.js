"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTypeDef = exports.UserTypeDef = void 0;
const UserTypeDef = `#graphql
    type User {
        _id: ID!,
        name: String!,
        email: String!,
        phone: String!,
        isAdmin: String!,
        street: String,
        apartment: String,
        city: String,
        zip: String,
        country: String,
        createdAt: Date!,
        updatedAt: Date!
    }
`;
exports.UserTypeDef = UserTypeDef;
const AuthTypeDef = `#graphql
    type Auth {
        user: User!,
        token: String!
    }
`;
exports.AuthTypeDef = AuthTypeDef;
//# sourceMappingURL=user.js.map