import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";
declare const categorySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    autoCreate: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    title?: string | null;
    color?: string | null;
    icon?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    title?: string | null;
    color?: string | null;
    icon?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    autoCreate: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    title?: string | null;
    color?: string | null;
    icon?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const CategoryModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    title?: string | null;
    color?: string | null;
    icon?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    title?: string | null;
    color?: string | null;
    icon?: string | null;
}, {}, {
    timestamps: true;
    autoCreate: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    title?: string | null;
    color?: string | null;
    icon?: string | null;
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
    image: string;
    title?: string | null;
    color?: string | null;
    icon?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    title?: string | null;
    color?: string | null;
    icon?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    autoCreate: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    image: string;
    title?: string | null;
    color?: string | null;
    icon?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
type Category = InferSchemaType<typeof categorySchema>;
export type CategoryDocument = HydratedDocument<Category> & {
    createdAt: Date;
    updatedAt: Date;
};
export default CategoryModel;
//# sourceMappingURL=category.d.ts.map