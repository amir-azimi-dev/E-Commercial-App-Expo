import jwt from "jsonwebtoken";
import UserModel, { UserDocument } from "../db/models/user";

const generateToken = (payload: object | string): string | false => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: "7d" });

    } catch (error) {
        console.log(error);
        return false;
    }
};


const authorizeUser = async (token: string): Promise<UserDocument | null | false> => {
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: string };
        return UserModel.findById(payload.userId);

    } catch (error) {
        console.log(error);
        return false;
    }
};



export { generateToken, authorizeUser };