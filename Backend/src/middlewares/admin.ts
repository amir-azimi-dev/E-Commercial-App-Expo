import { GraphQLError } from "graphql";
import isAuthorizedMiddleware from "./authorized";

const isAdminMiddleware = (resolver: Function) => (parent: any, args: any, context: any, info: any) => {
    isAuthorizedMiddleware(resolver)(parent, args, context, info);

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