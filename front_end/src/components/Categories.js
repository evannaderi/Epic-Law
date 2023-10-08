import { Tag, Flex } from "@chakra-ui/react";

const categories = () => {
  return (
    <Flex justifyContent="center">
      <Tag
        size="sm"
        borderRadius="50px" // Use a high value to make the Tag oval
        bg="teal.500"
        color="white"
        mx={2}
      >
        Teal
      </Tag>
    </Flex>
  );
};

export default categories;
