import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";
declare const userSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    autoCreate: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    phone: string;
    isAdmin: boolean;
    street: string;
    apartment: string;
    city: string;
    zip: string;
    country: string;
    name?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    phone: string;
    isAdmin: boolean;
    street: string;
    apartment: string;
    city: string;
    zip: string;
    country: string;
    name?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    autoCreate: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    phone: string;
    isAdmin: boolean;
    street: string;
    apartment: string;
    city: string;
    zip: string;
    country: string;
    name?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const UserModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    phone: string;
    isAdmin: boolean;
    street: string;
    apartment: string;
    city: string;
    zip: string;
    country: string;
    name?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    phone: string;
    isAdmin: boolean;
    street: string;
    apartment: string;
    city: string;
    zip: string;
    country: string;
    name?: string | null;
}, {}, {
    timestamps: true;
    autoCreate: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    phone: string;
    isAdmin: boolean;
    street: string;
    apartment: string;
    city: string;
    zip: string;
    country: string;
    name?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    autoCreate: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    phone: string;
    isAdmin: boolean;
    street: string;
    apartment: string;
    city: string;
    zip: string;
    country: string;
    name?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    phone: string;
    isAdmin: boolean;
    street: string;
    apartment: string;
    city: string;
    zip: string;
    country: string;
    name?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    autoCreate: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    phone: string;
    isAdmin: boolean;
    street: string;
    apartment: string;
    city: string;
    zip: string;
    country: string;
    name?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
type User = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<User> & {
    createdAt: Date;
    updatedAt: Date;
};
export default UserModel;
//# sourceMappingURL=user.d.ts.map