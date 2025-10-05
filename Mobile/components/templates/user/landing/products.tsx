import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Product } from "../../../../types";
import ProductCard from "../../../modules/user/productCard";

const testProducts = [
    {
        "_id": "68d7d4cb1e39357d53fb80b5",
        "title": "product title 1",
        "description": "product description",
        "richDescription": "",
        "image": "image",
        "images": ["image 1"],
        "brand": "",
        "price": 1000000,
        "category": {
            "_id": "68d683782f2799fb2c870d57",
            "title": "computer",
            "color": "#444",
            "icon": "icon-computer",
            "image": "",
            "createdAt": "2025-09-26T12:13:44.401Z",
            "updatedAt": "2025-09-26T12:57:12.840Z"
        },
        "countInStock": 11,
        "rating": 4,
        "reviewsCount": 2,
        "isFeatured": true,
        "createdAt": "2025-09-27T12:12:59.336Z",
        "updatedAt": "2025-09-27T12:56:40.472Z"
    },
    {
        "_id": "68d7d4cb1e39357d53fb80b3",
        "title": "product title 2",
        "description": "product description",
        "richDescription": "",
        "image": "",
        "images": [],
        "brand": "",
        "price": 1000000,
        "category": {
            "_id": "68d683782f2799fb2c870d57",
            "title": "computer",
            "color": "#444",
            "icon": "icon-computer",
            "image": "",
            "createdAt": "2025-09-26T12:13:44.401Z",
            "updatedAt": "2025-09-26T12:57:12.840Z"
        },
        "countInStock": 11,
        "rating": 4,
        "reviewsCount": 2,
        "isFeatured": true,
        "createdAt": "2025-09-27T12:12:59.336Z",
        "updatedAt": "2025-09-27T12:56:40.472Z"
    },
    {
        "_id": "68d7d4cb1e39357d53fb80b2",
        "title": "product title 3",
        "description": "product description",
        "richDescription": "",
        "image": "",
        "images": [],
        "brand": "",
        "price": 1000000,
        "category": {
            "_id": "68d683782f2799fb2c870d57",
            "title": "computer",
            "color": "#444",
            "icon": "icon-computer",
            "image": "",
            "createdAt": "2025-09-26T12:13:44.401Z",
            "updatedAt": "2025-09-26T12:57:12.840Z"
        },
        "countInStock": 11,
        "rating": 4,
        "reviewsCount": 2,
        "isFeatured": true,
        "createdAt": "2025-09-27T12:12:59.336Z",
        "updatedAt": "2025-09-27T12:56:40.472Z"
    },
    {
        "_id": "68d7d4cb1e39357d53fb80b1",
        "title": "product title 4",
        "description": "product description",
        "richDescription": "",
        "image": "",
        "images": [],
        "brand": "",
        "price": 1000000,
        "category": {
            "_id": "68d683782f2799fb2c870d57",
            "title": "computer",
            "color": "#444",
            "icon": "icon-computer",
            "image": "",
            "createdAt": "2025-09-26T12:13:44.401Z",
            "updatedAt": "2025-09-26T12:57:12.840Z"
        },
        "countInStock": 11,
        "rating": 4,
        "reviewsCount": 2,
        "isFeatured": true,
        "createdAt": "2025-09-27T12:12:59.336Z",
        "updatedAt": "2025-09-27T12:56:40.472Z"
    },
];

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setProducts(testProducts);

        return () => setProducts([]);

    }, []);

    return (
        <View>
            <Text>Products Screen</Text>

            <FlatList
                data={products}
                renderItem={({ item }) => <ProductCard {...item} />}
                keyExtractor={item => item._id}
                horizontal
            />
        </View>
    );
};

export default Products;