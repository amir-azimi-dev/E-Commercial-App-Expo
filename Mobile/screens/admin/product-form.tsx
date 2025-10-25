import { useEffect, useReducer, useState } from "react";
import { ActivityIndicator, Alert, Image, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import Checkbox from "expo-checkbox";
import useCategories from "graphql/queries/useCategories";
import useCreateProduct from "graphql/mutations/useCreateProduct";
import { useApolloClient } from "@apollo/client/react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Button from "components/modules/Button";
import useIsAdmin from "utils/useIsAdmin";
import { AdminStackParentProps, ProductFormScreenRouteProps } from "types/navigation";
import { Toast } from "toastify-react-native";
import useEditProduct from "graphql/mutations/useEditProduct";
import useRemoveProduct from "graphql/mutations/useRemoveProduct";

type FormState = {
    title: string;
    description: string;
    richDescription: string;
    image: string;
    images: string[];
    brand: string;
    price: string;
    category: string;
    countInStock: string;
    rating: string;
    isFeatured: boolean;
    reviewsCount: string;
};

type ActionTypes = keyof FormState;
type Action = { type: "initiateValues", payload: FormState } |
{ type: Exclude<ActionTypes, "isFeatured" | "images">, payload: string } |
{ type: "images", payload: string[] } |
{ type: "isFeatured", payload: boolean };

const initialState = {
    title: "",
    description: "",
    richDescription: "",
    image: "",
    images: [],
    brand: "",
    price: "",
    category: "",
    countInStock: "",
    rating: "",
    isFeatured: false,
    reviewsCount: "1"
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
        case "reviewsCount": {
            return { ...state, rating: action.payload };
        }
        default: {
            return state;
        }
    }
};

const ProductFormScreen = () => {
    const isAdmin = useIsAdmin();

    const [image, setImage] = useState<string | null>(null);
    const [formState, dispatch] = useReducer(reducer, initialState);
    const { data: categories, loading, error } = useCategories();

    const client = useApolloClient();
    const refetchProducts = () => client.refetchQueries({ include: ["GetProducts"] });

    const navigation = useNavigation<AdminStackParentProps>();
    const productData = useRoute<ProductFormScreenRouteProps>().params?.product;

    const [createProduct, { loading: isCreating }] = useCreateProduct();
    const [editProduct, { loading: isEditing }] = useEditProduct();
    const [removeProduct, { loading: isRemoving }] = useRemoveProduct();

    useEffect(() => {
        if (!productData) return;

        const { title, description, richDescription, image, images, brand, price, category, countInStock, rating, isFeatured, reviewsCount } = productData;

        dispatch({
            type: "initiateValues", payload: {
                title,
                description,
                richDescription,
                image,
                images: images,
                brand,
                price: price.toString(),
                category: category._id,
                countInStock: countInStock.toString(),
                rating: rating.toString(),
                isFeatured,
                reviewsCount: reviewsCount.toString()
            }
        });

    }, [productData]);

    useEffect(() => {
        if (!categories) return;
        changeInputHandler("category", categories.getCategories[0]._id);

    }, [categories]);

    const changeInputHandler = (field: Exclude<ActionTypes, "isFeatured" | "images">, newValue: string) => {
        dispatch({ type: field, payload: newValue });
    };

    // const changeImagesHandler = (newValue: string[]) => {
    //     dispatch({ type: "images", payload: newValue });
    // };

    const changeIsFeaturedCheckboxHandler = (newValue: boolean) => {
        dispatch({ type: "isFeatured", payload: newValue });
    };

    const pickImageHandler = async (): Promise<void> => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [2, 3],
            quality: 1,
        });

        if (!result.canceled) {
            return setImage(result.assets[0].uri);
        }

        setImage(null);
    };

    const submitHandler = async (): Promise<void> => {
        if (isCreating || isEditing || isRemoving) return;

        if (
            !formState.title.trim() ||
            !formState.description.trim() ||
            isNaN(+formState.price) ||
            !formState.category ||
            isNaN(+formState.countInStock)
        ) {
            return Alert.alert("Invalid Entry!", "Please fill the form correctly.");
        }

        const imagesData = await uploadImages();

        if (imagesData === false) {
            return Toast.show({
                type: "error",
                text1: "Error",
                text2: "Error While uploading file (files)! Please try again.",
                position: "top",
                useModal: true
            });
        }

        const data = {
            title: formState.title,
            description: formState.description,
            richDescription: formState.richDescription,
            brand: formState.brand,
            price: formState.price,
            category: formState.category,
            countInStock: formState.countInStock,
            rating: formState.rating,
            isFeatured: formState.isFeatured,
            image: imagesData?.image || "",
            images: imagesData?.images || [],
            reviewsCount: formState.reviewsCount
        }

        productData ? editProductHandler(productData._id, data) : createProductHandler(data);
    };

    const uploadImages = async (): Promise<{ image?: string, images?: string[] } | false | undefined> => {
        if (!image && !formState.images.length) return undefined;

        const formData = new FormData();

        [image, ...formState.images].forEach((uri, index) => {
            const filename = uri?.split("/").pop();
            const match = filename && /\.\w+$/.exec(filename);
            const type = match ? `image/${match}` : undefined;

            if (!type) return;

            const fieldName = (image && !index) ? "image" : "images";
            image && formData.append(fieldName, { uri, name: filename, type } as any);
        });


        const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URI}/upload`, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: formData
        });

        if (!response.ok) return false;

        return response.json();
    };

    const createProductHandler = async (productData: FormState): Promise<void> => {
        try {
            const { price, countInStock, rating, reviewsCount } = productData;
            const manipulatedProductData = { ...productData, price: +price, countInStock: +countInStock, rating: +rating, reviewsCount: +reviewsCount };

            const { data: responseData } = await createProduct({ variables: manipulatedProductData });
            const data = responseData?.createProduct;

            if (!data?._id) throw new Error("");

            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Product Created successfully.",
                position: "top",
                onHide: () => {
                    refetchProducts();
                    navigation.goBack();
                }
            });

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: `Error While Creating the Product! Please try again. ${error}`,
                position: "top",
                useModal: true
            });
        }
    };

    const editProductHandler = async (productId: string, productData: FormState): Promise<void> => {
        try {
            const { price, countInStock, rating, reviewsCount } = productData;
            const manipulatedProductData = { id: productId, ...productData, price: +price, countInStock: +countInStock, rating: +rating, reviewsCount: +reviewsCount };

            const { data: responseData } = await editProduct({ variables: manipulatedProductData });
            const data = responseData?.editProduct;

            if (!data?._id) throw new Error("Product not found!");

            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Product Edited successfully.",
                position: "top",
                onHide: () => {
                    refetchProducts();
                    navigation.goBack();
                }
            });

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: `Error While Editing the Product! Please try again. ${error}`,
                position: "top",
                useModal: true
            });
        }
    };

    const removeProductHandler = (): void => {
        if (isCreating || isEditing || isRemoving || !productData) return;

        Alert.alert(
            "Warning",
            "Are you sure you want to 'REMOVE' the product?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Remove", style: "destructive", onPress: () => deleteProduct(productData._id) }
            ]
        );
    };

    const deleteProduct = async (productId: string): Promise<void> => {
        try {
            const { data: responseData } = await removeProduct({ variables: { id: productId } });
            const data = responseData?.removeProduct;

            if (!data?._id) throw new Error("Product not found!");

            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Product Removed successfully.",
                position: "top",
                onHide: () => {
                    refetchProducts();
                    navigation.goBack();
                }
            });

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: `Error While Removing the Product! Please try again. ${error}`,
                position: "top",
                useModal: true
            });
        }
    };

    if (isAdmin === null || loading) return <ActivityIndicator size="large" className="flex-1" />;
    if (isAdmin === false) return;
    if (error) return <Text className="mt-5 font-bold text-2xl text-center">Error While Fetching Data!</Text>;
    if (!categories?.getCategories.length) return <Text className="mt-5 font-bold text-2xl text-center">please add a category first!</Text>;

    const defaultProductImage = require("~/../assets/box.png");
    const productImage = productData?.image && `${Platform.select({ ios: process.env.EXPO_PUBLIC_STATIC_BASE_URL, android: process.env.EXPO_PUBLIC_ANDROID_STATIC_BASE_URL })}/${productData.image}`;

    return (
        <ScrollView className="flex-1 p-8 bg-slate-200">
            <View className="relative w-72 max-w-full mx-auto border-2 border-gray-300 rounded-full aspect-square" style={{ borderWidth: 10 }}>
                <Image
                    source={(image || productImage) ? { uri: image || productImage } : defaultProductImage}
                    className="w-full h-full rounded-full"
                />
                <Pressable onPress={pickImageHandler} className="absolute right-2 bottom-2 rounded-full overflow-hidden aspect-square">
                    {({ pressed }) => (
                        <View className="p-3 bg-gray-400" style={{ opacity: pressed ? 0.5 : 1 }}>
                            <FontAwesome name="camera" color="#fff" size={16} />
                        </View>
                    )}
                </Pressable>
            </View>
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
                <View className="flex-row flex-wrap justify-between gap-3">
                    {[1, 2, 3, 4, 5].map(rate => (
                        <Pressable key={rate} onPress={changeInputHandler.bind(this, "rating", rate.toString())}>
                            {({ pressed }) => (
                                <View
                                    className="justify-center items-center p-3 rounded-lg size-16"
                                    style={{ opacity: pressed ? 0.5 : 1, backgroundColor: rate === +formState.rating ? "#2833d0" : "#404040" }}
                                >
                                    <Text className="font-bold text-white">{rate}</Text>
                                </View>
                            )}
                        </Pressable>
                    ))}
                </View>
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