import { useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";
import useCategories from "graphql/queries/useCategories";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AdminStackProps } from "types/navigation";
import useIsAdmin from "utils/useIsAdmin";
import CreateCategoryForm from "components/templates/admin/categories/CreateCategoryForm";
import CategoryCard from "components/modules/admin/CategoryCard";


const CategoriesScreen = () => {
    const isAdmin = useIsAdmin();

    const { data: categories, loading, error } = useCategories();

    const navigation = useNavigation<AdminStackProps>();
    const isFocused = useIsFocused();

    useLayoutEffect(() => {
        if (!isFocused) return;

        navigation.getParent()?.setOptions({
            headerSearchBarOptions: undefined
        });

    }, [isFocused]);

    if (isAdmin === null || loading) return <ActivityIndicator size="large" className="flex-1" />;
    if (error) return <Text className="mt-5 font-bold text-2xl text-center">Error While Fetching Data!</Text>;
    if (isAdmin === false) return;

    return (
        <View className="flex-1 px-5 py-8 bg-slate-200">
            <CreateCategoryForm />

            <FlatList
                data={categories?.getCategories}
                renderItem={({ item }) => <CategoryCard {...item} />}
                keyExtractor={item => item._id}
                contentContainerStyle={{ rowGap: 10 }}
                className="flex-1 -mx-4 my-3 px-4"
            />
        </View>
    );
};

export default CategoriesScreen;