'use client';

import React from 'react';
import { Text, Box, Flex, Tag } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const CaseCards = ({ caseNumber, threadID, clientName, tag, active }) => {
	const router = useRouter();
	const handleClick = () => {
		router.push(`/chats/${caseNumber}`);
	};
	return (
		<Flex
			width="450px"
			height="150px"
			padding="16px"
			flexDirection={'column'}
			backgroundColor={active ? '#cccccc' : '#FAFAFB'}
			margin="12px"
			borderRadius={'15px'}
			onClick={handleClick}
		>
			<Text fontWeight={'700'}>Case {caseNumber}</Text>
			<Text>{clientName}</Text>
			<Tag colorScheme="cyan" width="max-content">
				{tag}
			</Tag>
		</Flex>
	);
};

export default CaseCards;
