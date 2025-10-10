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
    createdAt: string;
    updatedAt: string;
};

export type ProductPreview = Pick<Product, "_id" | "title" | "image" | "price" | "countInStock">;

type Category = {
    _id: string;
    title: string;
    color: string;
    icon: string;
    image: string;
    createdAt: string;
    updatedAt: string;
};

export {
    Product,
    Category
};