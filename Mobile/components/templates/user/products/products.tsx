import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Product } from "../../../../types";
import ProductCard from "../../../modules/user/ProductCard";
import { useNavigation } from "@react-navigation/native";
import Banners from "./Banners";
import FilterByCategory from "./FilterByCategory";

const testProducts = [
    {
        "_id": "68d7d4cb1e39357d53fb80b5",
        "title": "product title 1",
        "description": "product description",
        "richDescription": "",
        "image": "5363044a-3434-4ea9-9f1a-31a5f8a8f51b-1759759479362.webp",
        "images": [
            "932d7441-cc5d-4573-9369-286ee6f67afe-1759759479362.jpg",
            "61b986c9-3d8f-45de-8c37-19c7eb53d4c9-1759759475896.jpg"
        ],
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
    }
];

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
    const [searchedTitle, setSearchedTitle] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                placeholder: 'Search...',
                onChangeText: (event: { nativeEvent: { text: string } }) => setSearchedTitle(event.nativeEvent.text)
            },
        });

    }, []);

    useEffect(() => {
        setProducts(testProducts);
        setFilteredProducts(testProducts);

        return () => {
            setProducts([]);
            setFilteredProducts([]);
            setVisibleProducts([]);
            setSearchedTitle("");
            setSelectedCategories([]);
        };
    }, []);

    useEffect(() => {
        if (!products.length) return;

        if (!searchedTitle.trim()) return setFilteredProducts(products);

        const filteredProduct = products.filter(product => product.title.match(new RegExp(searchedTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")));
        setFilteredProducts(filteredProduct);

    }, [searchedTitle, products]);

    useEffect(() => {
        if (!filteredProducts.length) return setVisibleProducts([]);
        if (!selectedCategories.length) return setVisibleProducts(filteredProducts);

        const visibleProducts = filteredProducts.filter(product => selectedCategories.includes(product.category._id));
        setVisibleProducts(visibleProducts);

    }, [selectedCategories, filteredProducts]);

    return (
        <View className="flex-1 pb-4">
            {!searchedTitle.trim() && (
                <Banners
                    banners={[
                        "5363044a-3434-4ea9-9f1a-31a5f8a8f51b-1759759479362.webp",
                        "932d7441-cc5d-4573-9369-286ee6f67afe-1759759479362.jpg",
                        "61b986c9-3d8f-45de-8c37-19c7eb53d4c9-1759759475896.jpg",
                        "5363044a-3434-4ea9-9f1a-31a5f8a8f51b-1759759479362.webp",
                        "932d7441-cc5d-4573-9369-286ee6f67afe-1759759479362.jpg"
                    ]}
                />
            )}

            <View className="mb-8">
                <FilterByCategory selectedCategories={selectedCategories} onSelectCategory={setSelectedCategories} />
            </View>

            {!visibleProducts.length && (
                <Text className="font-bold text-2xl text-center">No Product Found!</Text>
            )}

            <FlatList
                data={visibleProducts}
                renderItem={({ item }) => <ProductCard {...item} />}
                keyExtractor={item => item._id}
                contentContainerStyle={{ rowGap: 10 }}
                columnWrapperStyle={{ columnGap: 10 }}
                numColumns={2}
                className="flex-1 -mx-4 my-3 px-4"
            />
        </View>
    );
};

export default Products;