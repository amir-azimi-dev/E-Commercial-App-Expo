import jwt from "jsonwebtoken";

const generateToken = (payload: object | string): string | false => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: "7d" });

    } catch (error) {
        console.log(error);
        return false;
    }
};


const decodeToken = (token: string): object | string | false => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY!);

    } catch (error) {
        console.log(error);
        return false;
    }
};



export { generateToken, decodeToken };