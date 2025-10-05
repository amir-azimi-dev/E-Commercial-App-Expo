import { UserDocument } from "../db/models/user";
declare const generateToken: (payload: object | string) => string | false;
declare const authorizeUser: (token: string) => Promise<UserDocument | null | false>;
export { generateToken, authorizeUser };
//# sourceMappingURL=jwt.d.ts.map