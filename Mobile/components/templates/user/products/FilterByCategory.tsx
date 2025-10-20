import { Dispatch } from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import useCategories from "graphql/queries/useCategories";
const allCategory = {
    _id: "all",
    title: "All",
    color: "#000"
};

type FilterByCategoryPropsTypes = {
    selectedCategories: string[];
    onSelectCategory: Dispatch<React.SetStateAction<string[]>>;
};

const FilterByCategory = ({ selectedCategories, onSelectCategory }: FilterByCategoryPropsTypes) => {
    const { data: categories, loading, error } = useCategories();

    const getIsSelectedCategory = (categoryId: string): boolean => {
        return (categoryId === "all" && !selectedCategories.length) || (selectedCategories.includes(categoryId));
    };

    const selectCategoryHandler = (categoryId: string): void => {

        if (categoryId === "all") return onSelectCategory([]);

        if (selectedCategories.includes(categoryId)) {
            const newSelectedCategories = selectedCategories.filter(id => id !== categoryId);
            return onSelectCategory(newSelectedCategories);
        }

        onSelectCategory([...selectedCategories, categoryId]);
    };

    if (loading) return (
        <View className="mt-8 p-4 bg-white">
            <ActivityIndicator size="large" />
        </View>
    );
    if (error) return <Text className="mt-5 font-bold text-2xl text-center">Error While Fetching Data!</Text>;

    const categoriesData = categories?.getCategories || [];

    return (
        <ScrollView
            className="-mx-5 mt-8 p-4 bg-white"
            bounces
            horizontal
        >
            <View className="flex-row items-center gap-x-1 my-auto">
                {[allCategory, ...categoriesData].map(category => (
                    <Pressable
                        key={category._id}
                        onPress={() => selectCategoryHandler(category._id)}
                    >
                        {({ pressed }) => (
                            <View className={`rounded-2xl bg-white ${getIsSelectedCategory(category._id) && "border-2 border-neutral-500"}`}>
                                <View
                                    className={`px-4 py-1.5 rounded-xl ${getIsSelectedCategory(category._id) && "border border-white"}`}
                                    style={{ backgroundColor: category.color, opacity: pressed ? 0.7 : 1 }}
                                >
                                    <Text className="font-semibold text-base text-white">{category.title}</Text>
                                </View>
                            </View>
                        )}
                    </Pressable>
                ))}
            </View>
        </ScrollView>
    );
};

export default FilterByCategory;