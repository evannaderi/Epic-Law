import Link from 'next/link';
import {
	Box,
	Flex,
	Spacer,
	Link as ChakraLink,
	Text,
	Button,
} from '@chakra-ui/react';
import Image from 'next/image';

const Navbar = () => {
	return (
		<Flex
			as="nav"
			bgColor="#36454F"
			color="white"
			p={4}
			height={'100px'}
			alignItems={'center'}
			// borderBottom="1px solid #FAAFAB"
		>
			<Link href="/" passHref>
				{/* <ChakraLink>
					<Text fontSize="lg" fontWeight="bold">
						LegAI
					</Text>
				</ChakraLink> */}
				<Box>
					<Image src={'/legailogo.png'} width={200} height={100} />{' '}
				</Box>
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
	);
};

export default Navbar;
