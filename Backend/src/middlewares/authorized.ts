import { GraphQLError } from "graphql";

const isAuthorizedMiddleware = (resolver: Function) => (parent: any, args: any, context: any, info: any) => {
    if (!context.user) {
        throw new GraphQLError("Unauthorized", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 }
            }
        });
    }

    return resolver(parent, args, context, info);
};

export default isAuthorizedMiddleware;