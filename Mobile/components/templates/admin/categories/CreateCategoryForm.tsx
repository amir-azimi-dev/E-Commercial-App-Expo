import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, useWindowDimensions, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Button from "components/modules/Button";
import { useApolloClient } from "@apollo/client/react";
import useCreateCategory from "graphql/mutations/useCreateCategory";
import { categoryColors } from "db/colors";

// @ts-expect-error: no types for this library
import ColorPalette from "react-native-color-palette";
import { Toast } from "toastify-react-native";


const CreateCategoryForm = () => {
    const [title, setTitle] = useState<string>("");
    const [color, setColor] = useState<string>(categoryColors[0]);

    const [createCategory, { loading }] = useCreateCategory();
    const client = useApolloClient();
    const refetchCategories = () => client.refetchQueries({ include: ["GetCategories"] });

    const { height } = useWindowDimensions();

    const createCategoryHandler = async (): Promise<void> => {
        if (loading) return;

        if (!title.trim()) {
            return Alert.alert("Invalid Entry!", "Please fill all the Inputs.");
        }

        try {
            const { data: responseData } = await createCategory({ variables: { title, color } });
            const data = responseData?.createCategory;

            if (!data?._id) throw new Error("");
            
            Toast.show({
                type: "success",
                text1: "Success",
                text2: "Category created successfully.",
                position: "top"
            });
            
            refetchCategories();

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: `Error While Creating the Category! Please try again. ${error}`,
                position: "top",
                useModal: true
            });
        }
    };

    return (
        <View className="mb-4 pb-4 border-gray-400 border-b" style={{ maxHeight: height / 2.5 }}>
            <ScrollView className="-mx-4 px-4">
                <Text className="font-bold text-2xl text-center">Create New Category</Text>

                <View className="mb-4">
                    <Text className="mb-1 font-semibold">Title</Text>
                    <TextInput
                        placeholder="Category Title"
                        value={title}
                        onChangeText={setTitle}
                        inputMode="text"
                        autoCapitalize="words"
                        className="p-3 bg-white border border-pink-500 rounded-lg text-lg"
                    />
                </View>
                <View className="mb-4">
                    <Text className="mb-1 font-semibold">Color</Text>
                    <ColorPalette
                        onChange={setColor}
                        defaultColor={categoryColors[0]}
                        colors={categoryColors}
                        icon={
                            <FontAwesome name="check" color="#fff" size={20} />
                        }
                    />
                </View>

                <View className="mb-8">
                    <Button title="Submit" onPress={createCategoryHandler} />
                </View>
            </ScrollView>
        </View>
    );
};

export default CreateCategoryForm;