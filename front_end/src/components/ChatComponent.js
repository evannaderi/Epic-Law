import React, { useState, useEffect } from 'react';
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
// import { chatData, caseData } from '../../utils/dummychatdata';
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

const ChatInput = ({
	setUserMessage,
	userMessage,
	setMessages,
	chatID,
	inputDisabled,
	setInputDisabled,
	messages,
}) => {
	const handleChat = async (e) => {
		e.preventDefault();
		const msg = userMessage;

		setMessages((prevMessages) => [
			...prevMessages,
			{ role: 'user', content: msg },
		]);
		setUserMessage('');
		setInputDisabled(true);

		const res = await fetch(`http://localhost:8080/case/${chatID}/query`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ query: userMessage }),
		});
		const data = await res.json();
		console.log('from handle input', data);

		setMessages((prevMessages) => [
			...prevMessages,
			data.messages[data.messages.length - 1],
		]);
		setInputDisabled(false);
	};

	return (
		<Flex>
			<form onSubmit={(e) => handleChat(e)}>
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
						value={userMessage}
						onChange={(e) => setUserMessage(e.target.value)}
						placeholder="Ask LegAI a question"
						variant={'filled'}
						colorScheme="gray"
						_focus={{
							backgroundColor: '#ecf2f6',
						}}
						overflowWrap={'wrap'}
						disabled={inputDisabled}
					/>
					<IconButton
						colorScheme="red"
						aria-label="Send Message"
						position={'absolute'}
						// marginLeft={'auto'}
						type="submit"
						left="93%"
						disabled={inputDisabled}
					>
						<ArrowRightIcon />
					</IconButton>
				</InputGroup>
			</form>
		</Flex>
	);
};

const ChatSidebar = ({ activeChatID }) => {
	const [cases, setCases] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('http://localhost:8080/cases');
			const data = await res.json();
			console.log(data);
			setCases(data);
		};
		fetchData();
		return () => {};
	}, []);

	return (
		<Flex justifyContent={'center'} flexDir={'column'}>
			<Flex margin="128px 0" justifyContent={'center'}>
				<Heading color="white">LegAI</Heading>
			</Flex>
			{cases?.map((lawcase, i) => {
				return (
					<CaseCards
						caseNumber={lawcase.case_number}
						clientName={lawcase.client_name}
						tag={lawcase.category}
						key={`case-${i}`}
						active={activeChatID == lawcase.id}
						threadID={lawcase.id}
					/>
				);
			})}
		</Flex>
	);
};

const ChatComponent = ({ chatID, noChat }) => {
	// const messages = [...chatData.conversation.messages];
	const [messages, setMessages] = useState([]);
	const [userMessage, setUserMessage] = useState('');
	const [inputDisabled, setInputDisabled] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const trig = await fetch(`http://localhost:8080/case/${chatID}/process`, {
				method: 'GET',
			});
			console.log(trig);
			const res = await fetch(`http://localhost:8080/case/${chatID}/chat`, {
				method: 'GET',
			});
			const data = await res.json();
			console.log(data);
			setMessages(data.messages);
		};
		if (!noChat) {
			fetchData();
		}
	}, []);
	return (
		<Grid
			gridTemplateColumns={'2.5fr 7.5fr'}
			width="90vw"
			height="100vh"
			overflowX={'hidden'}
		>
			<Flex flexDirection={'column'} height="100vh" margin="0 32px">
				<Box
					overflowY="auto" // Make the Box scrollable
					// height="calc(100% - 65px - 32px)" // Deduct the height of the input and its margin
					paddingBottom="97px" // Space for the input at the bottom
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
				{!noChat ? (
					<>
						<ChatHeader caseNumber={163} clientName={'John Smith'} />
						<Box
							overflowY="auto" // Make the Box scrollable
							height="calc(100% - 65px - 30px)" // Deduct the height of the input and its margin
							paddingBottom="97px" // Space for the input at the bottom
							backgroundColor={'transparent'}
						>
							{messages?.map((message, i) => {
								return (
									<ChatBoxes
										role={message.role}
										content={message.content}
										key={`message-${i}`}
									/>
								);
							})}
						</Box>
						<Box height="25vh" bgColor="rgba(0,0,0,0)" />
						<ChatInput
							setMessages={setMessages}
							userMessage={userMessage}
							setUserMessage={setUserMessage}
							inputDisabled={inputDisabled}
							setInputDisabled={setInputDisabled}
							messages={messages}
							chatID={chatID}
						/>
					</>
				) : (
					<></>
				)}
			</Flex>
		</Grid>
	);
};

export default ChatComponent;
