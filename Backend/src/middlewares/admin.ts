import { GraphQLError } from "graphql";

const isAdminMiddleware = (resolver: Function) => (parent: any, args: any, context: any, info: any) => {
    if (!context.user) {
        throw new GraphQLError("Unauthorized", { extensions: { code: "UNAUTHENTICATED", http: { status: 401 } } });
    }

    if (!context.user.isAdmin) {
        throw new GraphQLError("Forbidden", {
            extensions: {
                code: "FORBIDDEN",
                http: { status: 403 }
            }
        });
    }

    return resolver(parent, args, context, info);
};

export default isAdminMiddleware;