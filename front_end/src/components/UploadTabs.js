import React, { useState } from 'react';
import {
	Tabs,
	Flex,
	Text,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Input,
	Button,
	Box,
	Grid,
} from '@chakra-ui/react';

const CustomInput = ({ value, setValue, placeholder, name, big }) => {
	return (
		<Flex length="80%" alignItems={big ? 'flex-start' : 'center'} margin="12px">
			<Flex width="350px" padding="0 0 0 30px">
				<Text fontSize={'20px'} fontWeight={'700'}>
					{name}
				</Text>
			</Flex>
			<Input
				placeholder={placeholder}
				onChange={(newVal) => setValue(newVal)}
				value={value}
				variant={'filled'}
				background={'#d9d9d9'}
				height={big ? '200px' : '50px'}
			/>
		</Flex>
	);
};

const UploadNewCase = () => {
	const [caseNumber, setCaseNumber] = useState('');
	const [clientName, setClientName] = useState('');
	const [description, setDescription] = useState('');
	const onSubmit = () => {
		console.log('submitted');
	};
	return (
		<Flex flexDir={'column'} padding="32px">
			<CustomInput
				value={caseNumber}
				setValue={setCaseNumber}
				placeholder={'case number'}
				name={'case number'}
			/>
			<CustomInput
				value={clientName}
				setValue={setClientName}
				placeholder={'John Smith'}
				name={'client name'}
			/>
			<CustomInput
				value={description}
				setValue={setDescription}
				placeholder={'A short description here...'}
				name={'brief description'}
				big
			/>
			<Button height="70px" width="200px" colorScheme="red">
				submit
			</Button>
		</Flex>
	);
};

const UploadTabs = () => {
	return (
		<Flex width="100%" padding="100px 128px">
			<Tabs
				variant="enclosed"
				backgroundColor={'#CCD0D3'}
				width={'100%'}
				borderRadius={'35px'}
			>
				<TabList>
					<Tab border="none" height="80px" width={'50%'}>
						<Text fontWeight={'700'} fontSize={'30'}>
							upload new case
						</Text>
					</Tab>
					<Tab border="none" height="80px" width={'50%'}>
						<Text fontWeight={'700'} fontSize={'30'}>
							update existing case
						</Text>
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<UploadNewCase />
					</TabPanel>
					<TabPanel>
						<p>two!</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	);
};

export default UploadTabs;
