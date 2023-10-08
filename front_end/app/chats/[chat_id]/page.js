'use client';

import ChatPage from '@/final_pages/ChatPage';
import { Flex, Box } from '@chakra-ui/react';
import { useParams } from 'next/navigation';

const Page = () => {
	const { chat_id } = useParams();
	return <ChatPage chatID={chat_id} />;
};

export default Page;
