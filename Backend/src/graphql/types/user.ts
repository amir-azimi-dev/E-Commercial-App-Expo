type RegisterUserParams = {
    name: string;
    email: string;
    password: string;
};

const UserTypeDef = `#graphql
    type User {
        _id: ID!,
        name: String!,
        email: String!
    }
`;

export type { RegisterUserParams };
export { UserTypeDef };