import { Text, Pressable, View, Button as DefaultButton, Platform, ButtonProps, StyleSheet } from "react-native";

interface AppButtonProps extends ButtonProps {
    textColor?: string;
}

const AndroidButton = ({ title, color: backgroundColor, textColor, ...props }: AppButtonProps) => (
    <View className="rounded-md overflow-hidden" style={styles.container}>
        <Pressable
            android_ripple={{ color: "#c1c1c16a", foreground: true }}
            className="items-center px-3 py-2"
            style={{ backgroundColor: backgroundColor || "#00aeef" }}
            {...props}
        >
            <Text className="font-semibold" style={{ color: textColor || "#fff" }}>{title}</Text>
        </Pressable>
    </View>
);

const IOSButton = (props: ButtonProps) => (
    <DefaultButton {...props} />
);

const Button = Platform.OS === "ios" ? IOSButton : AndroidButton;

export default Button;

const styles = StyleSheet.create({
    container: {
        boxShadow: "3px 3px 5px #00000055"
    }
});