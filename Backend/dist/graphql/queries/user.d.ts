import { UserDocument } from "../../db/models/user";
declare const getUsers: () => Promise<UserDocument[]>;
declare const getUser: (_: unknown, { id }: {
    id: string;
}) => Promise<UserDocument>;
export { getUsers, getUser };
//# sourceMappingURL=user.d.ts.map