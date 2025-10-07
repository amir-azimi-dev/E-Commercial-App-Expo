import { Pressable, ScrollView, Text, View } from "react-native";
import { Category } from "../../../../types";
import { useEffect, useState } from "react";

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

type FilterByCategoryPropsTypes = {
    selectedCategories: string[];
    onSelectCategory: (newCategories: string[]) => void;
};

const FilterByCategory = ({ selectedCategories, onSelectCategory }: FilterByCategoryPropsTypes) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        setCategories(testCategories);

        return () => setCategories([]);

    }, []);

    return (
        <ScrollView
            className="-mx-5 mt-8 p-4 bg-white"
            bounces
            horizontal
        >
            <View className="flex-row gap-x-2">
                {categories.map(category => (
                    <Pressable
                        key={category._id}
                        onPress={() => alert("pressed")}
                    >
                        {({ pressed }) => (
                            <View
                                className="px-3 py-1.5 rounded-2xl"
                                style={{ backgroundColor: category.color, opacity: pressed ? 0.7 : 1 }}
                            >
                                <Text className="font-semibold text-base text-white">{category.title}</Text>
                            </View>
                        )}
                    </Pressable>
                ))}
            </View>
        </ScrollView>
    );
};

export default FilterByCategory;