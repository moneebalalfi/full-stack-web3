import { Container } from "@chakra-ui/react";
import Head from "next/head";
import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  pageTitle: string;
  children: ReactNode;
}

function Layout({ pageTitle, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <Container maxWidth={"container.lg"}>{children}</Container>
    </>
  );
}

export default Layout;
