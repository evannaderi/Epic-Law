import React, { useState } from 'react';
import {
	Text,
	Box,
	Flex,
	Grid,
	Input,
	InputGroup,
	InputRightElement,
	IconButton,
	Textarea,
	Heading,
} from '@chakra-ui/react';
import { chatData, caseData } from '../../utils/dummychatdata';
import { ArrowRightIcon } from '@chakra-ui/icons';
import CaseCards from './CaseCards';

const ChatHeader = ({ caseNumber, clientName }) => {
	return (
		<Box
			height="100px"
			borderBottom="1px solid gray"
			padding="16px"
			borderTopRadius={'30px'}
			backgroundColor={'#c8c9cc'}
		>
			<Text fontWeight={'600'} fontSize={'20px'}>
				Case {caseNumber}
			</Text>
			<Text fontSize={'19px'}>{clientName}</Text>
		</Box>
	);
};

const ChatBoxes = ({ role, content }) => {
	if (role == 'system') {
		return null;
	}
	return (
		<Flex
			alignItems={'center'}
			backgroundColor={role == 'user' ? '#36454F' : '#FAFBFF'}
			padding="32px 0"
			justifyContent={'center'}
		>
			<Box width={'50%'}>
				<Text fontSize={'18px'} color={role == 'user' ? '#FFFFFF' : '#000000'}>
					{content}
				</Text>
			</Box>
		</Flex>
	);
};

const ChatInput = () => {
	const [input, setInput] = useState('');
	return (
		<Flex>
			<form>
				<InputGroup
					width={'75%'}
					position={'absolute'}
					bottom="0%"
					margin="32px"
					ml="auto"
					mr="auto"
					left="0"
					right={'0'}
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
				>
					<Textarea
						width={'100%'}
						height="65px"
						maxHeight={'100px'}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Ask Epic AI"
						variant={'filled'}
						colorScheme="gray"
						_focus={{
							backgroundColor: '#ecf2f6',
						}}
						overflowWrap={'wrap'}
					/>
					<IconButton
						colorScheme="red"
						aria-label="Send Message"
						position={'absolute'}
						// marginLeft={'auto'}
						left="93%"
					>
						<ArrowRightIcon />
					</IconButton>
				</InputGroup>
			</form>
		</Flex>
	);
};

const ChatSidebar = ({ activeChatID }) => {
	const cases = [...caseData];
	return (
		<Flex justifyContent={'center'} flexDir={'column'}>
			<Flex margin="128px 0" justifyContent={'center'}>
				<Heading color="white">EPIC LAW AI WHAT</Heading>
			</Flex>
			{cases.map((lawcase, i) => {
				return (
					<CaseCards
						caseNumber={lawcase.caseNumber}
						clientName={lawcase.clientName}
						tag={lawcase.tag}
						key={`case-${i}`}
						active={activeChatID == lawcase.caseNumber}
					/>
				);
			})}
		</Flex>
	);
};

const ChatComponent = ({ chatID }) => {
	const messages = [...chatData.conversation.messages];
	return (
		<Grid
			gridTemplateColumns={'2.5fr 7.5fr'}
			width="100vw"
			height="100vh"
			overflowX={'hidden'}
		>
			<Flex flexDirection={'column'} height="100vh">
				<Box
					overflowY="auto" // Make the Box scrollable
					// height="calc(100% - 65px - 32px)" // Deduct the height of the input and its margin
					// paddingBottom="97px" // Space for the input at the bottom
					backgroundColor={'transparent'}
				>
					<ChatSidebar activeChatID={chatID} />
				</Box>
			</Flex>
			<Flex
				flexDirection={'column'}
				position="relative"
				// border={'2px solid red'}
				// backgroundColor={'#FAFBFF'}
				height="100vh"
			>
				<ChatHeader caseNumber={163} clientName={'John Smith'} />
				<Box
					overflowY="auto" // Make the Box scrollable
					height="calc(100% - 65px - 32px)" // Deduct the height of the input and its margin
					paddingBottom="97px" // Space for the input at the bottom
					backgroundColor={'transparent'}
				>
					{messages.map((message, i) => {
						return (
							<ChatBoxes
								role={message.role}
								content={message.content}
								key={`message-${i}`}
							/>
						);
					})}
				</Box>

				<ChatInput />
			</Flex>
		</Grid>
	);
};

export default ChatComponent;
