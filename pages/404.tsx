import React from "react";
import { Flex, Heading } from "@chakra-ui/react";
import Layout from "../components/Layout";

const Custom404 = () => {
  return (
    <Layout pageTitle="Not Found">
      <Flex h="80vh" alignItems={"center"} justifyContent="center">
        <Heading>This page is not found!</Heading>
      </Flex>
    </Layout>
  );
};

export default Custom404;
