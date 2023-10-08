'use client';

import ChatComponent from '@/components/ChatComponent';
import { Box } from '@chakra-ui/react';
const ChatPage = () => {
	return (
		<Box overflowY={'scroll'} maxHeight={'100vh'} overflowX={'hidden'}>
			<ChatComponent />
		</Box>
	);
};

export default ChatPage;
