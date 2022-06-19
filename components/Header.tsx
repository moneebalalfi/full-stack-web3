import {
  Avatar,
  Button,
  Flex,
  Heading,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useAccount } from "../context";

const Header = () => {
  const { account, connect } = useAccount();
  return (
    <Flex
      bg="blue.200"
      p={6}
      justifyContent="space-between"
      alignItems={"center"}
    >
      <NextLink href="/">
        <HStack spacing={4} cursor="pointer">
          <Avatar src="/logos/main-logo.jpeg" size="lg" />
          <Heading>Web3 Blog</Heading>
        </HStack>
      </NextLink>

      {!account ? (
        <Button onClick={connect}>Connect 🚀</Button>
      ) : (
        <HStack spacing={{ base: 2, md: 4 }}>
          {/* If the signed in user is the contract owner, we
            show the create post button
          */}
          <NextLink href="/create-post" passHref>
            <Button as={Link}>Create post</Button>
          </NextLink>
          <Menu placement="bottom-start">
            <MenuButton as={Button} colorScheme="blue">
              Account
            </MenuButton>
            <MenuList>
              <MenuGroup title="ID">
                <MenuItem>{account}</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </HStack>
      )}
    </Flex>
  );
};

export default Header;
