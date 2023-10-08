'use client';

import ChatComponent from '@/components/ChatComponent';
import { Box } from '@chakra-ui/react';
const ChatPage = ({ chatID }) => {
	return (
		<Box overflowY={'scroll'} maxHeight={'100vh'} overflowX={'hidden'}>
			<ChatComponent chatID={chatID} />
		</Box>
	);
};

export default ChatPage;
