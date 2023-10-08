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

const CustomInput = ({ value, setValue, placeholder, name, big }) => {
  return (
    <Flex length="80%" alignItems={big ? "flex-start" : "center"} margin="12px">
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
  const [medicalRecs, setMedicalRecs] = useState(null);
  const [policeReport, setPoliceReport] = useState(null);
  const [insurancePolicy, setInsurancePolicy] = useState(null);
  const [wageLost, setWageLost] = useState(null);
  const [diary, setDiary] = useState(null);
  const [witnessStatements, setWitnessStatements] = useState(null);
  const [correspondence, setCorrespondence] = useState(null);
  const onSubmit = () => {
    console.log("updated");
  };
  return (
    <Flex flexDir={"column"} padding="32px">
      <CustomFile
        value={medicalRecs}
        setValue={setMedicalRecs}
        placeholder={"Medical Records"}
        name={"Medical Records"}
      />
      <CustomFile
        value={policeReport}
        setValue={setPoliceReport}
        placeholder={"Police Report"}
        name={"Police Report"}
      />
      <CustomFile
        value={insurancePolicy}
        setValue={setInsurancePolicy}
        placeholder={"Insurance Policy"}
        name={"Insurance Policy"}
        big
      />
      <CustomFile
        value={wageLost}
        setValue={setWageLost}
        placeholder={"Wage Lost Information"}
        name={"Wage Lost Information"}
        big
      />
      <CustomFile
        value={diary}
        setValue={setDiary}
        placeholder={"Personal Diary"}
        name={"Personal Diary"}
        big
      />
      <CustomFile
        value={witnessStatements}
        setValue={setWitnessStatements}
        placeholder={"Witness Statements"}
        name={"Witness Statements"}
        big
      />
      <CustomFile
        value={correspondence}
        setValue={setCorrespondence}
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
