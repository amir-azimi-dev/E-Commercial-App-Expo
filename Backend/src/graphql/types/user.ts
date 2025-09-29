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

export type { RegisterUserParams, LoginUserParams };
export { UserTypeDef };