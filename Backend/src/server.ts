import dotenv from "dotenv";
import cors, { CorsRequest } from "cors";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import connectToDB from "./db/connection";
import { authorizeUser } from "./utils/jwt";
import upload from "./middlewares/multer";
import path from "path";

dotenv.config();

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 3000;

app.use(cors<CorsRequest>());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(process.cwd(), "public", "uploads")));

app.post(
    "/upload",
    upload.fields([{ name: "image", maxCount: 1 }, { name: "images", maxCount: 10 }]),
    (req, res) => {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const imageFile = files["image"]?.[0]?.filename || null;
        const otherImages = files["images"]?.map(file => file.filename) || [];

        res.json({ image: imageFile, images: otherImages });
    }
);

const startServer = async (): Promise<void> => {
    await server.start();
    app.use("/graphql", expressMiddleware(server, {
        context: async ({ req }) => {
            const authHeader = req.headers.authorization || "";
            const token = authHeader.replace("Bearer ", "");

            const user = await authorizeUser(token);
            return user ? { user } : { user: null };
        }
    }));

    await connectToDB();

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Apollo Server: ${host}:${port}/graphql`);
    });
};

startServer();