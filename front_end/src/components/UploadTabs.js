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
	Textarea,
	Spacer,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

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
			{big ? (
				<Textarea
					placeholder={placeholder}
					onChange={handleChange}
					value={value}
					variant={'filled'}
					background={'#d9d9d9'}
					height="200px"
				/>
			) : (
				<Input
					placeholder={placeholder}
					onChange={handleChange}
					value={value}
					variant={'filled'}
					background={'#d9d9d9'}
					height="50px"
				/>
			)}
		</Flex>
	);
};

const CustomFileUpload = ({
	placeholder,
	name,
	file,
	setFile,
	file_type,
	caseID,
}) => {
	const [submitting, setSubmitting] = useState(false);
	const handleSubmit = async (event) => {
		event.preventDefault();
		setSubmitting(true);
		const formData = new FormData();
		formData.append('doc', file);
		console.log('submitted');
		try {
			const response = await fetch(
				`http://localhost:8080/case/${caseID}/upload/${file_type}`,
				{
					method: 'POST',
					body: formData,
				}
			);

			if (response.ok) {
				console.log('Files uploaded successfully');
			} else {
				console.error('File upload failed', response.statusText);
			}
			setSubmitting(false);
			// console.log('Files uploaded successfully');
			// console.log(formData);
		} catch (error) {
			console.error('Error during file upload', error);
		}
	};

	return (
		<form encType="multipart/form-data" onSubmit={handleSubmit}>
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
				<Button
					visibility={file ? 'visible' : 'hidden'}
					colorScheme="red"
					disabled={submitting}
					type="submit"
				>
					{submitting ? 'Uploading...' : 'Upload'}
				</Button>
			</Flex>
		</form>
	);
};

const UploadNewCase = ({ formData, setStep, setCaseID }) => {
	const [caseNumber, setCaseNumber] = useState('');
	const [clientName, setClientName] = useState('');
	const [description, setDescription] = useState('');

	const onSubmit = async (event) => {
		event.preventDefault();
		// formData.append('case_number', caseNumber);
		// formData.append('client_name', clientName);
		// formData.append('description', description);
		const req = {
			case_number: caseNumber,
			client_name: clientName,
			description: description,
			title: 'Car Crash on Road',
			client_email: 'morgan@gmail.com',
			severity: 0,
			categories: ['Car Crash'],
		};
		try {
			console.log(JSON.stringify(req));
			const response = await fetch('http://localhost:8080/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(req),
			});

			if (response.ok) {
				const data = await response.json();
				setCaseID(data.id);
				setStep(1);
			} else {
				console.error('File upload failed', response.statusText);
			}
			// console.log('Files uploaded successfully');
			// console.log(formData);
		} catch (error) {
			console.error('Error during file upload', error);
		}
		console.log('submitted');
	};

	return (
		<form onSubmit={onSubmit}>
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
				<Button height="70px" width="200px" colorScheme="red" type="submit">
					NEXT
				</Button>
			</Flex>
		</form>
	);
};

const UpdateCase = ({ setStep, caseID }) => {
	const [medicalRecs, setMedicalRecs] = useState();
	const [policeReport, setPoliceReport] = useState();
	const [insurancePolicy, setInsurancePolicy] = useState();
	const [wageLost, setWageLost] = useState();
	const [diary, setDiary] = useState();
	const [witnessStatements, setWitnessStatements] = useState();
	const [correspondence, setCorrespondence] = useState();
	const router = useRouter();

	const handleBack = () => {
		setStep(0);
	};
	return (
		<Flex flexDir={'column'} padding="32px">
			<CustomFileUpload
				placeholder={'Medical Records'}
				name={'Medical Records'}
				file={medicalRecs}
				setFile={setMedicalRecs}
				file_type={'medical_records'}
				caseID={caseID}
			/>
			<CustomFileUpload
				placeholder={'Police Report'}
				name={'Police Report'}
				file={policeReport}
				setFile={setPoliceReport}
				file_type={'police_report'}
				caseID={caseID}
			/>
			<CustomFileUpload
				placeholder={'Insurance Policy'}
				name={'Insurance Policy'}
				file={insurancePolicy}
				setFile={setInsurancePolicy}
				file_type={'insurance_policy'}
				caseID={caseID}
			/>
			<CustomFileUpload
				placeholder={'Wage Lost Information'}
				name={'Wage Lost Information'}
				file={wageLost}
				setFile={setWageLost}
				file_type={'wage_lost'}
				caseID={caseID}
			/>
			<CustomFileUpload
				placeholder={'Personal Diary'}
				name={'Personal Diary'}
				file={diary}
				setFile={setDiary}
				file_type={'diary'}
				caseID={caseID}
			/>
			<CustomFileUpload
				placeholder={'Witness Statements'}
				name={'Witness Statements'}
				file={witnessStatements}
				setFile={setWitnessStatements}
				file_type={'witness_statements'}
				caseID={caseID}
			/>
			<CustomFileUpload
				placeholder={'Correspondence'}
				name={'Correspondence'}
				file={correspondence}
				setFile={setCorrespondence}
				file_type={'correspondence'}
				caseID={caseID}
			/>
			<Flex marginTop="32px">
				<Button
					height="70px"
					width="200px"
					colorScheme="red"
					onClick={handleBack}
					margin="0 16px"
				>
					PREVIOUS
				</Button>
				<Spacer />
				<Button
					height="70px"
					width="200px"
					colorScheme="red"
					type="submit"
					margin="0 16px"
					onClick={() => router.push(`/chats/${caseID}`)}
				>
					CASE ANALYSIS
				</Button>
			</Flex>
		</Flex>
	);
};

const UploadTabs = () => {
	const globalFormData = new FormData();
	const [step, setStep] = useState(0);
	const [caseID, setCaseID] = useState('');
	return (
		<Flex width="100%" padding="100px 128px">
			<Tabs
				variant="enclosed"
				backgroundColor={'#CCD0D3'}
				width={'100%'}
				borderRadius={'35px'}
				index={step}
			>
				<TabList>
					<Tab border="none" height="80px" width={'50%'}>
						<Text fontWeight={'700'} fontSize={'30'}>
							Upload new case
						</Text>
					</Tab>
					<Tab border="none" height="80px" width={'50%'}>
						<Text fontWeight={'700'} fontSize={'30'}>
							Additional information
						</Text>
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<UploadNewCase
							formData={globalFormData}
							setStep={setStep}
							setCaseID={setCaseID}
						/>
					</TabPanel>
					<TabPanel>
						<UpdateCase
							formData={globalFormData}
							setStep={setStep}
							caseID={caseID}
						/>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	);
};

export default UploadTabs;
