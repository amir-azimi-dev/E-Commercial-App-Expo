import { PropsWithChildren } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider as ApolloClientProvider } from "@apollo/client/react";
import { Platform } from "react-native";


const client = new ApolloClient({
    link: new HttpLink({ uri: Platform.select({ ios: process.env.EXPO_PUBLIC_GRAPHQL_URI!, android: process.env.EXPO_PUBLIC_ANDROID_GRAPHQL_URI }) }),
    cache: new InMemoryCache()
});

const ApolloProvider = ({ children }: PropsWithChildren) => {
    return (
        <ApolloClientProvider client={client}>
            {children}
        </ApolloClientProvider>
    );
};

export default ApolloProvider;