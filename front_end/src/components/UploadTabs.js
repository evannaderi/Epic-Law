import React, { useState } from "react";
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
} from "@chakra-ui/react";
import FileDropzone from "./FileDropzone";
import UploadPage from "./UploadPage";

const CustomInput = ({ value, setValue, placeholder, name, big }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  return (
    <Flex length="80%" alignItems={big ? "flex-start" : "center"} margin="12px">
      <Flex width="350px" padding="0 0 0 30px">
        <Text fontSize={"20px"} fontWeight={"700"}>
          {name}
        </Text>
      </Flex>
      <Input
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        variant={"filled"}
        background={"#d9d9d9"}
        height={big ? "200px" : "50px"}
      />
    </Flex>
  );
};

const CustomFile = ({ value, setValue, placeholder, name }) => {
  return (
    <Flex length="80%" alignItems={"center"} margin="12px">
      <Flex width="350px" padding="0 0 0 30px">
        <Text fontSize={"20px"} fontWeight={"700"}>
          {name}
        </Text>
      </Flex>
      <Input
        placeholder={placeholder}
        onChange={(newVal) => setValue(newVal)}
        value={value}
        variant={"filled"}
        background={"#d9d9d9"}
        height={"50px"}
      />
    </Flex>
  );
};

const UploadNewCase = () => {
  const [caseNumber, setCaseNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const onSubmit = () => {
    console.log("submitted");
  };
  return (
    <Flex flexDir={"column"} padding="32px">
      <CustomInput
        value={caseNumber}
        setValue={setCaseNumber}
        placeholder={"case number"}
        name={"case number"}
      />
      <CustomInput
        value={clientName}
        setValue={setClientName}
        placeholder={"John Smith"}
        name={"client name"}
      />
      <CustomInput
        value={description}
        setValue={setDescription}
        placeholder={"A short description here..."}
        name={"brief description"}
        big
      />
      <Button height="70px" width="200px" colorScheme="red">
        submit
      </Button>
    </Flex>
  );
};

const UpdateCase = () => {
  const [medicalRecs, setMedicalRecs] = useState([]);
  const [policeReport, setPoliceReport] = useState([]);
  const [insurancePolicy, setInsurancePolicy] = useState([]);
  const [wageLost, setWageLost] = useState([]);
  const [diary, setDiary] = useState([]);
  const [witnessStatements, setWitnessStatements] = useState([]);
  const [correspondence, setCorrespondence] = useState([]);
  const [caseNumber, setCaseNumber] = useState("");

  const onSubmit = () => {
    const allFiles = [
      ...medicalRecs,
      ...policeReport,
      ...insurancePolicy,
      ...wageLost,
      ...diary,
      ...witnessStatements,
      ...correspondence,
    ];

    // You can now send the 'allFiles' array to your API
    // Replace this with your API endpoint and logic

    console.log("updated");
  };
  return (
    <Flex flexDir={"column"} padding="32px">
      <CustomInput
        value={caseNumber}
        setValue={setCaseNumber}
        placeholder={"Case Number"}
        name={"Case Number"}
      />
      <CustomFile
        value={medicalRecs}
        setValue={setMedicalRecs}
        FileDropzone={<UploadPage />}
        placeholder={"Medical Records"}
        name={"Medical Records"}
      />
      <CustomFile
        value={policeReport}
        setValue={setPoliceReport}
        FileDropzone={<UploadPage />}
        placeholder={"Police Report"}
        name={"Police Report"}
      />
      <CustomFile
        value={insurancePolicy}
        setValue={setInsurancePolicy}
        FileDropzone={<UploadPage />}
        placeholder={"Insurance Policy"}
        name={"Insurance Policy"}
        big
      />
      <CustomFile
        value={wageLost}
        setValue={setWageLost}
        FileDropzone={<UploadPage />}
        placeholder={"Wage Lost Information"}
        name={"Wage Lost Information"}
        big
      />
      <CustomFile
        value={diary}
        setValue={setDiary}
        FileDropzone={<UploadPage />}
        placeholder={"Personal Diary"}
        name={"Personal Diary"}
        big
      />
      <CustomFile
        value={witnessStatements}
        setValue={setWitnessStatements}
        FileDropzone={<UploadPage />}
        placeholder={"Witness Statements"}
        name={"Witness Statements"}
        big
      />
      <CustomFile
        value={correspondence}
        setValue={setCorrespondence}
        FileDropzone={<UploadPage />}
        placeholder={"Correspondence"}
        name={"Correspondence"}
        big
      />
      <Button height="70px" width="200px" colorScheme="red">
        CASE ANALYSIS
      </Button>
    </Flex>
  );
};

const UploadTabs = () => {
  return (
    <Flex width="100%" padding="100px 128px">
      <Tabs
        variant="enclosed"
        backgroundColor={"#CCD0D3"}
        width={"100%"}
        borderRadius={"35px"}
      >
        <TabList>
          <Tab border="none" height="80px" width={"50%"}>
            <Text fontWeight={"700"} fontSize={"30"}>
              Upload new case
            </Text>
          </Tab>
          <Tab border="none" height="80px" width={"50%"}>
            <Text fontWeight={"700"} fontSize={"30"}>
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
