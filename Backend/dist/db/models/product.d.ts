import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";
declare const productSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
    autoCreate: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    richDescription: string;
    image: string;
    images: string[];
    brand: string;
    price: number;
    category: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
    countInStock: number;
    rating: number;
    reviewsCount: number;
    isFeatured: boolean;
    description?: string | null;
    title?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    richDescription: string;
    image: string;
    images: string[];
    brand: string;
    price: number;
    category: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
    countInStock: number;
    rating: number;
    reviewsCount: number;
    isFeatured: boolean;
    description?: string | null;
    title?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    autoCreate: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    richDescription: string;
    image: string;
    images: string[];
    brand: string;
    price: number;
    category: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
    countInStock: number;
    rating: number;
    reviewsCount: number;
    isFeatured: boolean;
    description?: string | null;
    title?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
declare const ProductModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    richDescription: string;
    image: string;
    images: string[];
    brand: string;
    price: number;
    category: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
    countInStock: number;
    rating: number;
    reviewsCount: number;
    isFeatured: boolean;
    description?: string | null;
    title?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    richDescription: string;
    image: string;
    images: string[];
    brand: string;
    price: number;
    category: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
    countInStock: number;
    rating: number;
    reviewsCount: number;
    isFeatured: boolean;
    description?: string | null;
    title?: string | null;
}, {}, {
    timestamps: true;
    autoCreate: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    richDescription: string;
    image: string;
    images: string[];
    brand: string;
    price: number;
    category: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
    countInStock: number;
    rating: number;
    reviewsCount: number;
    isFeatured: boolean;
    description?: string | null;
    title?: string | null;
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
    richDescription: string;
    image: string;
    images: string[];
    brand: string;
    price: number;
    category: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
    countInStock: number;
    rating: number;
    reviewsCount: number;
    isFeatured: boolean;
    description?: string | null;
    title?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    richDescription: string;
    image: string;
    images: string[];
    brand: string;
    price: number;
    category: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
    countInStock: number;
    rating: number;
    reviewsCount: number;
    isFeatured: boolean;
    description?: string | null;
    title?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
    autoCreate: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    richDescription: string;
    image: string;
    images: string[];
    brand: string;
    price: number;
    category: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
    countInStock: number;
    rating: number;
    reviewsCount: number;
    isFeatured: boolean;
    description?: string | null;
    title?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
type Product = InferSchemaType<typeof productSchema>;
export type ProductDocument = HydratedDocument<Product> & {
    createdAt: Date;
    updatedAt: Date;
};
export default ProductModel;
//# sourceMappingURL=product.d.ts.map