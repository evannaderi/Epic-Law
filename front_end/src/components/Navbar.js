import Link from "next/link";
import {
  Box,
  Flex,
  Spacer,
  Link as ChakraLink,
  Text,
  Button,
} from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box as="nav" bgColor="#36454F" color="white" p={4}>
      <Flex align="center">
        <Link href="/" passHref>
          <ChakraLink>
            <Text fontSize="lg" fontWeight="bold">
              EPIC LAW AI
            </Text>
          </ChakraLink>
        </Link>
        <Spacer />
        <Flex align="center">
          <Link href="/documents" passHref>
            <ChakraLink mr={4}>documents</ChakraLink>
          </Link>
          <Link href="/chat" passHref>
            <ChakraLink mr={4}>chat</ChakraLink>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
