"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express5_1 = require("@as-integrations/express5");
const typeDefs_1 = __importDefault(require("./graphql/typeDefs"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const connection_1 = __importDefault(require("./db/connection"));
const jwt_1 = require("./utils/jwt");
const multer_1 = __importDefault(require("./middlewares/multer"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const server = new server_1.ApolloServer({ typeDefs: typeDefs_1.default, resolvers: resolvers_1.default });
const app = (0, express_1.default)();
const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "public", "uploads")));
app.post("/upload", multer_1.default.fields([{ name: "image", maxCount: 1 }, { name: "images", maxCount: 10 }]), (req, res) => {
    const files = req.files;
    const imageFile = files["image"]?.[0]?.filename || null;
    const otherImages = files["images"]?.map(file => file.filename) || [];
    res.json({ image: imageFile, images: otherImages });
});
const startServer = async () => {
    await server.start();
    app.use("/graphql", (0, express5_1.expressMiddleware)(server, {
        context: async ({ req }) => {
            const authHeader = req.headers.authorization || "";
            const token = authHeader.replace("Bearer ", "");
            const user = await (0, jwt_1.authorizeUser)(token);
            return user ? { user } : { user: null };
        }
    }));
    await (0, connection_1.default)();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Apollo Server: ${host}:${port}/graphql`);
    });
};
startServer();
//# sourceMappingURL=server.js.map