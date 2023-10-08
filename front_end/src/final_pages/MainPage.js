'use client';
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import UploadTabs from '@/components/UploadTabs';
import Navbar from '@/components/Navbar';

const MainPage = () => {
	return (
		<Box overflowX={'hidden'}>
			<Navbar />
			<Flex minHeight={'100vh'} width="100vw">
				<UploadTabs />
			</Flex>
		</Box>
	);
};

export default MainPage;
