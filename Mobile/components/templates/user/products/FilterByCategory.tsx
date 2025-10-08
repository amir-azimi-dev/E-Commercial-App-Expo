import { Dispatch, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Category } from "../../../../types";

const testCategories = [
    {
        "_id": "68d683782f2799fb2c870d57",
        "title": "computer",
        "color": "#444",
        "icon": "icon-computer",
        "image": "",
        "createdAt": "2025-09-26T12:13:44.401Z",
        "updatedAt": "2025-09-26T12:57:12.840Z"
    },
    {
        "_id": "68d683782f2799fb2c870d58",
        "title": "computer 2",
        "color": "#00ff00",
        "icon": "icon-computer",
        "image": "",
        "createdAt": "2025-09-26T12:13:44.401Z",
        "updatedAt": "2025-09-26T12:57:12.840Z"
    }
];

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
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        setCategories(testCategories);

        return () => setCategories([]);

    }, []);

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

    return (
        <ScrollView
            className="-mx-5 mt-8 p-4 bg-white"
            bounces
            horizontal
        >
            <View className="flex-row items-center gap-x-1 my-auto">
                {[allCategory, ...categories].map(category => (
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