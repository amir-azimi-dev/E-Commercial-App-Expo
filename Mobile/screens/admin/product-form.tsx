import { useEffect, useReducer, useState } from "react";
import { ActivityIndicator, Alert, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import { useRoute } from "@react-navigation/native";
import Button from "components/modules/Button";
import useCategories from "graphql/queries/useCategories";
import useIsAdmin from "utils/useIsAdmin";
import { ProductFormScreenRouteProps } from "types/navigation";

type FormState = {
    title: string;
    description: string;
    richDescription: string;
    image: string;
    images: string;
    brand: string;
    price: string;
    category: string;
    countInStock: string;
    rating: string;
    isFeatured: boolean;
};

type ActionTypes = keyof FormState;
type Action = { type: "initiateValues", payload: FormState } | { type: Exclude<ActionTypes, "isFeatured">, payload: string } | { type: "isFeatured", payload: boolean };

const initialState = {
    title: "",
    description: "",
    richDescription: "",
    image: "",
    images: "",
    brand: "",
    price: "",
    category: "",
    countInStock: "",
    rating: "",
    isFeatured: false
};

const reducer = (state: FormState, action: Action) => {
    switch (action.type) {
        case "initiateValues": {
            return action.payload;
        }
        case "title": {
            return { ...state, title: action.payload };
        }
        case "description": {
            return { ...state, description: action.payload };
        }
        case "richDescription": {
            return { ...state, richDescription: action.payload };
        }
        case "image": {
            return { ...state, image: action.payload };
        }
        case "images": {
            return { ...state, images: action.payload };
        }
        case "brand": {
            return { ...state, brand: action.payload };
        }
        case "price": {
            return { ...state, price: action.payload };
        }
        case "category": {
            return { ...state, category: action.payload };
        }
        case "countInStock": {
            return { ...state, countInStock: action.payload };
        }
        case "rating": {
            return { ...state, rating: action.payload };
        }
        case "isFeatured": {
            return { ...state, isFeatured: action.payload };
        }
        default: {
            return state;
        }
    }
};

const ProductFormScreen = () => {
    const isAdmin = useIsAdmin();

    const [formState, dispatch] = useReducer(reducer, initialState);
    const { data: categories, loading, error } = useCategories();

    const productData = useRoute<ProductFormScreenRouteProps>().params?.product;

    useEffect(() => {
        if (!productData) return;

        const { title, description, richDescription, image, images, brand, price, category, countInStock, rating, isFeatured } = productData;

        dispatch({
            type: "initiateValues", payload: {
                title,
                description,
                richDescription,
                image,
                images: images[0],
                brand,
                price: price.toString(),
                category: category._id,
                countInStock: countInStock.toString(),
                rating: rating.toString(),
                isFeatured
            }
        });

    }, [productData]);

    const changeInputHandler = (field: Exclude<ActionTypes, "isFeatured">, newValue: string) => {
        dispatch({ type: field, payload: newValue });
    };

    const changeIsFeaturedCheckboxHandler = (newValue: boolean) => {
        dispatch({ type: "isFeatured", payload: newValue });
    };

    const submitHandler = (): void => {
        // ...
    };

    const removeProductHandler = (): void => {
        Alert.alert(
            "Warning",
            "Are you sure you want to 'REMOVE' the product?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Remove", style: "destructive", onPress: () => removeProduct() }
            ]
        );
    };

    const removeProduct = () => {
        // ...
    };

    if (isAdmin === null || loading) return <ActivityIndicator size="large" className="flex-1" />;
    if (isAdmin === false) return;
    if (error) return <Text className="mt-5 font-bold text-2xl text-center">Error While Fetching Data!</Text>;
    if (!categories?.getCategories.length) return <Text className="mt-5 font-bold text-2xl text-center">please add a category first!</Text>;

    return (
        <ScrollView className="flex-1 p-8 bg-slate-200">
            <View className="mb-4">
                <Text className="mb-1 font-semibold">Title</Text>
                <TextInput
                    placeholder="Title"
                    value={formState.title}
                    onChangeText={changeInputHandler.bind(this, "title")}
                    inputMode="text"
                    className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                />
            </View>
            <View className="mb-4">
                <Text className="mb-1 font-semibold">Description</Text>
                <TextInput
                    placeholder="Description"
                    value={formState.description}
                    onChangeText={changeInputHandler.bind(this, "description")}
                    inputMode="text"
                    className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                />
            </View>
            <View className="mb-4">
                <Text className="mb-1 font-semibold">Rich Description</Text>
                <TextInput
                    placeholder="Rich Description"
                    value={formState.richDescription}
                    onChangeText={changeInputHandler.bind(this, "richDescription")}
                    inputMode="text"
                    className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                />
            </View>
            <View className="mb-4">
                <Text className="mb-1 font-semibold">Image</Text>
                <TextInput
                    placeholder="Image"
                    value={formState.image}
                    onChangeText={changeInputHandler.bind(this, "image")}
                    inputMode="text"
                    className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                />
            </View>
            <View className="mb-4">
                <Text className="mb-1 font-semibold">Images</Text>
                <TextInput
                    placeholder="Images"
                    value={formState.images}
                    onChangeText={changeInputHandler.bind(this, "images")}
                    inputMode="text"
                    className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                />
            </View>
            <View className="mb-4">
                <Text className="mb-1 font-semibold">Brand</Text>
                <TextInput
                    placeholder="Brand"
                    value={formState.brand}
                    onChangeText={changeInputHandler.bind(this, "brand")}
                    inputMode="text"
                    className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                />
            </View>
            <View className="mb-4">
                <Text className="mb-1 font-semibold">Price</Text>
                <TextInput
                    placeholder="Price"
                    value={formState.price}
                    onChangeText={changeInputHandler.bind(this, "price")}
                    inputMode="text"
                    className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                />
            </View>
            <View className="mb-4">
                <Text className="mb-1 font-semibold">Category</Text>

                <View className={`bg-white border border-pink-500 rounded-lg text-lg ${Platform.select({ ios: "p-3" })}`}>
                    <Picker
                        selectedValue={formState.category}
                        onValueChange={changeInputHandler.bind(this, "category")}>
                        {categories.getCategories.map(category => <Picker.Item key={category._id} label={category.title} value={category._id} />)}
                    </Picker>
                </View>

            </View>
            <View className="mb-4">
                <Text className="mb-1 font-semibold">Count in Stock</Text>
                <TextInput
                    placeholder="Count in Stock"
                    value={formState.countInStock}
                    onChangeText={changeInputHandler.bind(this, "countInStock")}
                    inputMode="numeric"
                    className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                />
            </View>
            <View className="mb-4">
                <Text className="mb-1 font-semibold">Rating</Text>
                <TextInput
                    placeholder="Rating"
                    value={formState.rating}
                    onChangeText={changeInputHandler.bind(this, "rating")}
                    inputMode="numeric"
                    className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                />
            </View>
            <View className="flex-row items-center gap-x-1 mb-4">
                <Checkbox
                    value={formState.isFeatured}
                    onValueChange={changeIsFeaturedCheckboxHandler.bind(this)}
                />
                <Text className="font-bold" onPress={() => changeIsFeaturedCheckboxHandler(!formState.isFeatured)}>Featured</Text>
            </View>

            <View className="mb-12">
                <Button title="Submit" onPress={submitHandler} />
                {productData && (
                    <Pressable onPress={removeProductHandler}>
                        {({ pressed }) => (
                            <Text className={`mt-4 font-semibold text-center text-red-500 ${pressed ? "opacity-50" : "opacity-100"}`}>
                                Remove Product
                            </Text>
                        )}
                    </Pressable>
                )}
            </View>
        </ScrollView>
    );
};

export default ProductFormScreen;