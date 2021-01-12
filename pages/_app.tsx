import "../styles/index.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { LanguageProvider } from "../Context/LangContext";
import "@fortawesome/fontawesome-free/css/all.css";
import { AppContextProvider } from "../Context/AppContextProvider";

export default function MyApp(ctx: any) {
  const apolloClient = useApollo(ctx.pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <AppContextProvider>
        <LanguageProvider localization={ctx.pageProps.localization}>
          <ctx.Component {...ctx.pageProps} />
        </LanguageProvider>
      </AppContextProvider>
    </ApolloProvider>
  );
}
