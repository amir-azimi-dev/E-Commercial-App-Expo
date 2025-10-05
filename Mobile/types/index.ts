type Product = {
    _id: string;
    title: string;
    description: string;
    richDescription: string;
    image: string;
    images: string[];
    brand: string;
    price: number;
    category: {
        _id: string;
        title: string;
        color: string;
        icon: string;
        image: string;
        createdAt: string;
        updatedAt: string;
    };
    countInStock: number;
    rating: number;
    reviewsCount: number;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
};

export {
    Product
};