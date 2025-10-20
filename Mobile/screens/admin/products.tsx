import { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, ActivityIndicator, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useProducts from "graphql/queries/useProducts";
import { Product } from "types";
import ProductCard from "components/modules/admin/ProductCard";

const ProductsScreen = () => {
    const { data: products, loading, error } = useProducts({});
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchedTitle, setSearchedTitle] = useState<string>("");

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
        if (!products?.getProducts.length) return;

        if (!searchedTitle.trim()) return setFilteredProducts(products.getProducts);

        const filteredProduct = products?.getProducts.filter(product => product.title.match(new RegExp(searchedTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")));
        setFilteredProducts(filteredProduct);

    }, [searchedTitle, products]);

    if (loading) return <ActivityIndicator size="large" className="flex-1" />;
    if (error) return <Text className="mt-5 font-bold text-2xl text-center">Error While Fetching Data!</Text>;

    return (
        <View className="flex-1 px-5 bg-slate-200">
            {!filteredProducts.length && (
                <Text className="mt-8 font-bold text-2xl text-center">No Product Found!</Text>
            )}

            <FlatList
                data={filteredProducts}
                renderItem={({ item, index }) => <ProductCard {...item} index={index} />}
                keyExtractor={product => product._id}
                contentContainerStyle={{ rowGap: 12 }}
                className="-mx-4 my-3 px-1"
            />
        </View>
    );
};

export default ProductsScreen;