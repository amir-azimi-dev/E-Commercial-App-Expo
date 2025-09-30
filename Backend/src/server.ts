import dotenv from "dotenv";
import cors, { CorsRequest } from "cors";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import connectToDB from "./db/connection";
import { authorizeUser } from "./utils/jwt";
import { UserDocument } from "./db/models/user";

dotenv.config();

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
const host = process.env.HOST || "http://localhost";
const port = process.env.PORT || 3000;

app.use(cors<CorsRequest>());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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