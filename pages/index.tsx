import type { NextPage } from "next";
import Layout from "../components/Layout";

import { Box, Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Blog from "../artifacts/contracts/Blog.sol/Blog.json";
import { contractAddress, ownerAddress } from "../config";
import { useAccount } from "../context";

interface HomeProps {
  posts: any[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  const { account } = useAccount();
  const router = useRouter();

  const navigate = async () => {
    router.push("/create-post");
  };

  console.log(posts);

  return (
    <Layout pageTitle="Home">
      <Box>
        {posts.map((post, index) => (
          <Box key={index}>bla</Box>
        ))}
        {account === ownerAddress && posts && !posts.length && (
          <Button>Create your first post!</Button>
        )}
      </Box>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps() {
  // detect .. depending on the network.
  let provider;

  if (process.env.ENVIRONMENT === "local") {
    provider = new ethers.providers.JsonRpcProvider();
  } else if (process.env.ENVIRONMENT === "testnet") {
    provider = new ethers.providers.JsonRpcProvider(
      "https://rpc-mumbai.matic.today"
    );
  } else {
    provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com/");
  }

  const contract = new ethers.Contract(contractAddress, Blog.abi, provider);
  const data = await contract.fetchPosts();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(data)),
    },
  };
}
