"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const isAuthorizedMiddleware = (resolver) => (parent, args, context, info) => {
    if (!context.user) {
        throw new graphql_1.GraphQLError("Unauthorized", {
            extensions: {
                code: "UNAUTHENTICATED",
                http: { status: 401 }
            }
        });
    }
    return resolver(parent, args, context, info);
};
exports.default = isAuthorizedMiddleware;
//# sourceMappingURL=authorized.js.map