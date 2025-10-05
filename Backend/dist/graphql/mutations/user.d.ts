import { UserDocument } from "../../db/models/user";
import { LoginUserParams, RegisterUserParams } from "../types/user";
type AuthPayload = {
    user: UserDocument;
    token: string;
};
declare const registerUser: (_: unknown, { name, email, password, phone, street, apartment, city, zip, country }: RegisterUserParams) => Promise<AuthPayload>;
declare const loginUser: (_: unknown, { identifier, password }: LoginUserParams) => Promise<AuthPayload>;
declare const removeUser: (_: unknown, { id }: {
    id: string;
}) => Promise<UserDocument>;
export { registerUser, loginUser, removeUser };
//# sourceMappingURL=user.d.ts.map