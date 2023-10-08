'use client';
import React from 'react';
import { Flex } from '@chakra-ui/react';
import UploadTabs from '@/components/UploadTabs';

const MainPage = () => {
	return (
		<Flex minHeight={'100vh'} width="100vw">
			<UploadTabs />
		</Flex>
	);
};

export default MainPage;
