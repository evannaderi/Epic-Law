'use client';

import ChatComponent from '@/components/ChatComponent';
import { Flex } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
const ChatPage = ({ chatID, noChat }) => {
	return (
		<>
			{/* <Navbar /> */}
			<Flex
				overflowY={'scroll'}
				maxHeight={'calc(100vh-100px)'}
				overflowX={'hidden'}
				justifyContent={'center'}
			>
				<ChatComponent chatID={chatID} noChat={noChat} />
			</Flex>
		</>
	);
};

export default ChatPage;
