type OrderItem = {
    _id: string;
    product: Product;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
};

type Order = {
    _id: string;
    orderItems: OrderItem[];
    status: string;
    totalPrice: number;
    customer: User;
    shippingAddress1: string;
    shippingAddress2: string;
    phone: string;
    city: string;
    zip: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
};

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

type ProductPreview = Pick<Product, "_id" | "title" | "image" | "price" | "countInStock">;

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
    OrderItem,
    Order,
    Product,
    ProductPreview,
    Category,
    User,
    Auth
};