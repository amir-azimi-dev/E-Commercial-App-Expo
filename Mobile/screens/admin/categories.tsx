import { useLayoutEffect } from "react";
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";
import { useApolloClient } from "@apollo/client/react";
import useCategories from "graphql/queries/useCategories";
import useRemoveCategory from "graphql/mutations/useRemoveCategory";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AdminStackProps } from "types/navigation";
import useIsAdmin from "utils/useIsAdmin";
import CreateCategoryForm from "components/templates/admin/categories/CreateCategoryForm";
import CategoryCard from "components/modules/admin/CategoryCard";
import { Toast } from "toastify-react-native";

const CategoriesScreen = () => {
    const isAdmin = useIsAdmin();

    const { data: categories, loading, error } = useCategories();
    const [removeCategory, { loading: isRemovingCategory }] = useRemoveCategory();
    const client = useApolloClient();
    const refetchCategories = () => client.refetchQueries({ include: ["GetCategories"] });

    const navigation = useNavigation<AdminStackProps>();
    const isFocused = useIsFocused();

    useLayoutEffect(() => {
        if (!isFocused) return;

        navigation.getParent()?.setOptions({
            headerSearchBarOptions: undefined
        });

    }, [isFocused]);

    const deleteCategory = async (categoryId: string): Promise<void> => {
        if (loading || isRemovingCategory) return;

        try {
            const { data: responseData } = await removeCategory({ variables: { id: categoryId } });
            const data = responseData?.removeCategory;

            if (!data?._id) throw new Error("");

            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Category removed successfully.",
                position: "top"
            });

            refetchCategories();

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: `Error While Removing the Category! Please try again. ${error}`,
                position: "top",
                useModal: true
            });
        }
    };

    if (isAdmin === null || loading) return <ActivityIndicator size="large" className="flex-1" />;
    if (error) return <Text className="mt-5 font-bold text-2xl text-center">Error While Fetching Data!</Text>;
    if (isAdmin === false) return;

    return (
        <View className="flex-1 px-5 py-8 bg-slate-200">
            <CreateCategoryForm />

            <FlatList
                data={categories?.getCategories}
                renderItem={({ item }) => <CategoryCard {...item} removeCategory={deleteCategory} />}
                keyExtractor={item => item._id}
                contentContainerStyle={{ rowGap: 10 }}
                className="flex-1 -mx-4 my-3 px-4"
            />
        </View>
    );
};

export default CategoriesScreen;