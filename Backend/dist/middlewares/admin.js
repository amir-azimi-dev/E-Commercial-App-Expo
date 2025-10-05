"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const isAdminMiddleware = (resolver) => (parent, args, context, info) => {
    if (!context.user) {
        throw new graphql_1.GraphQLError("Unauthorized", { extensions: { code: "UNAUTHENTICATED", http: { status: 401 } } });
    }
    if (!context.user.isAdmin) {
        throw new graphql_1.GraphQLError("Forbidden", {
            extensions: {
                code: "FORBIDDEN",
                http: { status: 403 }
            }
        });
    }
    return resolver(parent, args, context, info);
};
exports.default = isAdminMiddleware;
//# sourceMappingURL=admin.js.map