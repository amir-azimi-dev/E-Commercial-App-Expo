import { PropsWithChildren, useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { ApolloProvider as ApolloClientProvider } from "@apollo/client/react";
import { Platform } from "react-native";
import { useAppSelector } from "redux/store";


const httpLink = new HttpLink({ uri: Platform.select({ ios: process.env.EXPO_PUBLIC_GRAPHQL_URI!, android: process.env.EXPO_PUBLIC_ANDROID_GRAPHQL_URI }) });

const ApolloProvider = ({ children }: PropsWithChildren) => {
    const token = useAppSelector(state => state.user.token);

    const client = useMemo(() => {
        const authLink = new SetContextLink(({ headers }) => {
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : ""
                }
            };
        })

        const client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        });

        return client;

    }, [token]);



    return (
        <ApolloClientProvider client={client}>
            {children}
        </ApolloClientProvider>
    );
};

export default ApolloProvider;