type Product = {
    _id: string;
    title: string;
    description: string;
    richDescription: string;
    image: string;
    images: string[];
    brand: string;
    price: number;
    category: Category;
    countInStock: number;
    rating: number;
    reviewsCount: number;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type ProductPreview = Pick<Product, "_id" | "title" | "image" | "price" | "countInStock">;

type Category = {
    _id: string;
    title: string;
    color: string;
    icon: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
};

type User = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    isAdmin: boolean;
    street?: string;
    apartment?: string;
    city?: string;
    zip?: string;
    country?: string;
    createdAt: Date;
    updatedAt: Date;
};

type Auth = {
    user: User;
    token: string;
};

export {
    Product,
    Category,
    User,
    Auth
};