import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { Product } from "../../../../types";
import ProductCard from "../../../modules/user/ProductCard";
import { useNavigation } from "@react-navigation/native";
import Banners from "./Banners";
import FilterByCategory from "./FilterByCategory";
import useProducts from "graphql/queries/useProducts";

const Products = () => {
    const { data: products, loading, error } = useProducts({});
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
        setFilteredProducts(products?.getProducts || []);

        return () => {
            setFilteredProducts([]);
            setVisibleProducts([]);
            setSearchedTitle("");
            setSelectedCategories([]);
        };
    }, [products]);

    useEffect(() => {
        if (!products?.getProducts.length) return;

        if (!searchedTitle.trim()) return setFilteredProducts(products.getProducts);

        const filteredProduct = products?.getProducts.filter(product => product.title.match(new RegExp(searchedTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")));
        setFilteredProducts(filteredProduct);

    }, [searchedTitle, products]);

    useEffect(() => {
        if (!filteredProducts.length) return setVisibleProducts([]);
        if (!selectedCategories.length) return setVisibleProducts(filteredProducts);

        const visibleProducts = filteredProducts.filter(product => selectedCategories.includes(product.category._id));
        setVisibleProducts(visibleProducts);

    }, [selectedCategories, filteredProducts]);

    if (loading) return <ActivityIndicator size="large" className="flex-1" />;
    if (error) return <Text className="mt-5 font-bold text-2xl text-center">Error While Fetching Data!</Text>;

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