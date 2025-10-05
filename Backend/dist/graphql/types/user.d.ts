type RegisterUserParams = {
    name: string;
    email: string;
    password: string;
    phone: string;
    street?: string;
    apartment?: string;
    city?: string;
    zip?: string;
    country?: string;
};
type LoginUserParams = {
    identifier: string;
    password: string;
};
declare const UserTypeDef = "#graphql\n    type User {\n        _id: ID!,\n        name: String!,\n        email: String!,\n        phone: String!,\n        isAdmin: String!,\n        street: String,\n        apartment: String,\n        city: String,\n        zip: String,\n        country: String,\n        createdAt: Date!,\n        updatedAt: Date!\n    }\n";
declare const AuthTypeDef = "#graphql\n    type Auth {\n        user: User!,\n        token: String!\n    }\n";
export type { RegisterUserParams, LoginUserParams };
export { UserTypeDef, AuthTypeDef };
//# sourceMappingURL=user.d.ts.map