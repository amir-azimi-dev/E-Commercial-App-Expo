declare const resolvers: {
    Query: {
        getUsers: (parent: any, args: any, context: any, info: any) => any;
        getUser: (parent: any, args: any, context: any, info: any) => any;
        getMe: (_: unknown, __: unknown, context: any) => Promise<import("../db/models/user").UserDocument>;
        getProducts: (_: unknown, { count, categories, onlyFeaturedProducts }: import("./types/product").GetProductsParams) => Promise<import("../db/models/product").ProductDocument[]>;
        getCategories: () => Promise<import("../db/models/category").CategoryDocument[]>;
        getCategory: (_: unknown, { id }: {
            id: string;
        }) => Promise<import("../db/models/category").CategoryDocument>;
        getOrders: (parent: any, args: any, context: any, info: any) => any;
        getOrder: (parent: any, args: any, context: any, info: any) => any;
        getStatistics: (parent: any, args: any, context: any, info: any) => any;
    };
    Mutation: {
        registerUser: (_: unknown, { name, email, password, phone, street, apartment, city, zip, country }: import("./types/user").RegisterUserParams) => Promise<{
            user: import("../db/models/user").UserDocument;
            token: string;
        }>;
        loginUser: (_: unknown, { identifier, password }: import("./types/user").LoginUserParams) => Promise<{
            user: import("../db/models/user").UserDocument;
            token: string;
        }>;
        removeUser: (parent: any, args: any, context: any, info: any) => any;
        createProduct: (parent: any, args: any, context: any, info: any) => any;
        editProduct: (parent: any, args: any, context: any, info: any) => any;
        removeProduct: (parent: any, args: any, context: any, info: any) => any;
        createCategory: (parent: any, args: any, context: any, info: any) => any;
        editCategory: (parent: any, args: any, context: any, info: any) => any;
        removeCategory: (parent: any, args: any, context: any, info: any) => any;
        placeOrder: (parent: any, args: any, context: any, info: any) => any;
        updateOrderStatus: (parent: any, args: any, context: any, info: any) => any;
        removeOrder: (parent: any, args: any, context: any, info: any) => any;
    };
};
export default resolvers;
//# sourceMappingURL=resolvers.d.ts.map