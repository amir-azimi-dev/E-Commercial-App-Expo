import { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, ActivityIndicator, FlatList } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import useProducts from "graphql/queries/useProducts";
import { Product } from "types";
import ProductCard from "components/modules/admin/ProductCard";
import { AdminStackProps } from "types/navigation";
import useIsAdmin from "utils/useIsAdmin";
import Button from "components/modules/Button";

const ProductsScreen = () => {
    const isAdmin = useIsAdmin();

    const { data: products, loading, error } = useProducts({});
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchedTitle, setSearchedTitle] = useState<string>("");

    const navigation = useNavigation<AdminStackProps>();
    const isFocused = useIsFocused();

    useLayoutEffect(() => {
        if (!isFocused) return;

        navigation.getParent()?.setOptions({
            headerSearchBarOptions: {
                placeholder: 'Search...',
                onChangeText: (event: { nativeEvent: { text: string } }) => setSearchedTitle(event.nativeEvent.text)
            },
        });

    }, [isFocused]);

    useEffect(() => {
        if (!products?.getProducts.length) return;

        if (!searchedTitle.trim()) return setFilteredProducts(products.getProducts);

        const filteredProduct = products?.getProducts.filter(product => product.title.match(new RegExp(searchedTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")));
        setFilteredProducts(filteredProduct);

    }, [searchedTitle, products]);

    const navigateToCreateProductScreenHandler = (): void => {
        navigation.getParent()?.navigate("ProductForm");
    };

    if (isAdmin === null || loading) return <ActivityIndicator size="large" className="flex-1" />;
    if (error) return <Text className="mt-5 font-bold text-2xl text-center">Error While Fetching Data!</Text>;
    if (isAdmin === false) return;


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

            <View className="mt-auto mb-5">
                <Button title="Create New Product" color="#0e960e" onPress={navigateToCreateProductScreenHandler} />
            </View>
        </View>
    );
};

export default ProductsScreen;