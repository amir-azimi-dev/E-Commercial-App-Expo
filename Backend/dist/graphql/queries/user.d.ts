import { UserDocument } from "../../db/models/user";
declare const getUsers: () => Promise<UserDocument[]>;
declare const getUser: (_: unknown, { id }: {
    id: string;
}) => Promise<UserDocument>;
declare const getMe: (_: unknown, __: unknown, context: any) => Promise<UserDocument>;
export { getUsers, getUser, getMe };
//# sourceMappingURL=user.d.ts.map