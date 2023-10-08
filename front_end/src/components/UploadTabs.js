'use client';

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
	FormLabel,
} from '@chakra-ui/react';
// import FileDropzone from './FileDropzone';
import UploadPage from './UploadPage';

const CustomInput = ({ value, setValue, placeholder, name, big }) => {
	const handleChange = (event) => {
		const newValue = event.target.value;
		setValue(newValue);
	};

	return (
		<Flex length="80%" alignItems={big ? 'flex-start' : 'center'} margin="12px">
			<Flex width="350px" padding="0 0 0 30px">
				<Text fontSize={'20px'} fontWeight={'700'}>
					{name}
				</Text>
			</Flex>
			<Input
				placeholder={placeholder}
				onChange={handleChange}
				value={value}
				variant={'filled'}
				background={'#d9d9d9'}
				height={big ? '200px' : '50px'}
			/>
		</Flex>
	);
};

const CustomFileUpload = ({ placeholder, name, file, setFile }) => {
	return (
		<Flex length="80%" alignItems={'center'} margin="12px">
			<Flex width="350px" padding="0 0 0 30px">
				<Text fontSize={'20px'} fontWeight={'700'}>
					{name}
				</Text>
			</Flex>
			<FormLabel htmlFor={`${name}-input`} width={'100%'}>
				<Box
					background={'#d9d9d9'}
					height={'50px'}
					width={'80%'}
					display="flex"
					alignItems={'center'}
					padding="8px"
					borderRadius={'8px'}
				>
					{file ? file.name : placeholder}
				</Box>
				<Input
					type="file"
					accept=".pdf,.png,.jpeg"
					id={`${name}-input`}
					hidden
					onChange={(event) => setFile(event.target?.files[0])}
				/>
			</FormLabel>
		</Flex>
	);
};

const UploadNewCase = () => {
	const [caseNumber, setCaseNumber] = useState('');
	const [clientName, setClientName] = useState('');
	const [description, setDescription] = useState('');
	const onSubmit = (event) => {
		event.preventDefault();
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

const UpdateCase = () => {
	const [medicalRecs, setMedicalRecs] = useState();
	const [policeReport, setPoliceReport] = useState();
	const [insurancePolicy, setInsurancePolicy] = useState();
	const [wageLost, setWageLost] = useState();
	const [diary, setDiary] = useState();
	const [witnessStatements, setWitnessStatements] = useState();
	const [correspondence, setCorrespondence] = useState();
	const [caseNumber, setCaseNumber] = useState('');

	// const onSubmit = () => {
	// 	const allFiles = [
	// 		...medicalRecs,
	// 		...policeReport,
	// 		...insurancePolicy,
	// 		...wageLost,
	// 		...diary,
	// 		...witnessStatements,
	// 		...correspondence,
	// 	];

	// 	// You can now send the 'allFiles' array to your API
	// 	// Replace this with your API endpoint and logic

	// 	console.log('updated');

	// };

	const onSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData();

		formData.append('medical_records', medicalRecs);
		formData.append('police_report', policeReport);
		formData.append('insurance_policy', insurancePolicy);
		formData.append('wage_lost', wageLost);
		formData.append('diary', diary);
		formData.append('witness_statements', witnessStatements);
		formData.append('correspondence', correspondence);

		try {
			const response = await fetch('/api/test', {
				method: 'POST',
				body: formData,
			});

			if (response.ok) {
				console.log('Files uploaded successfully');
			} else {
				console.error('File upload failed', response.statusText);
			}
			// console.log('Files uploaded successfully');
			// console.log(formData);
		} catch (error) {
			console.error('Error during file upload', error);
		}
	};

	return (
		<form onSubmit={(event) => onSubmit(event)}>
			<Flex flexDir={'column'} padding="32px">
				<CustomFileUpload
					FileDropzone={<UploadPage />}
					placeholder={'Medical Records'}
					name={'Medical Records'}
					file={medicalRecs}
					setFile={setMedicalRecs}
				/>
				<CustomFileUpload
					placeholder={'Police Report'}
					name={'Police Report'}
					file={policeReport}
					setFile={setPoliceReport}
				/>
				<CustomFileUpload
					placeholder={'Insurance Policy'}
					name={'Insurance Policy'}
					file={insurancePolicy}
					setFile={setInsurancePolicy}
				/>
				<CustomFileUpload
					placeholder={'Wage Lost Information'}
					name={'Wage Lost Information'}
					file={wageLost}
					setFile={setWageLost}
				/>
				<CustomFileUpload
					placeholder={'Personal Diary'}
					name={'Personal Diary'}
					file={diary}
					setFile={setDiary}
				/>
				<CustomFileUpload
					placeholder={'Witness Statements'}
					name={'Witness Statements'}
					big
					file={witnessStatements}
					setFile={setWitnessStatements}
				/>
				<CustomFileUpload
					placeholder={'Correspondence'}
					name={'Correspondence'}
					big
					file={correspondence}
					setFile={setCorrespondence}
				/>
				<Button height="70px" width="200px" colorScheme="red" type="submit">
					CASE ANALYSIS
				</Button>
			</Flex>
		</form>
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
							Upload new case
						</Text>
					</Tab>
					<Tab border="none" height="80px" width={'50%'}>
						<Text fontWeight={'700'} fontSize={'30'}>
							Update existing case
						</Text>
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<UploadNewCase />
					</TabPanel>
					<TabPanel>
						<UpdateCase />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	);
};

export default UploadTabs;
