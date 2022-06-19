import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { AccountProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AccountProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AccountProvider>
  );
}

export default MyApp;
