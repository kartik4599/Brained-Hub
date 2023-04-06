import {
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  Container,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthPage = () => {
  return (
    <Container maxW={"xl"} centerContent>
      {/* <Box
        display="flex"
        justifyContent="center"
        backgroundColor={"whiteAlpha.500"}
        borderRadius={"5"}
        width={"100%"}
        margin={"40px 0px 10px 0"}
        borderWidth={"1px"}
        p={3}>
        <Text fontSize={"3xl"} fontFamily={"work sans"}>
          Chat-Box
        </Text>
      </Box> */}
      <Box
        display="flex"
        justifyContent="center"
        backgroundColor={"whiteAlpha.500"}
        borderRadius={"5"}
        width={"100%"}
        boxShadow="2xl"
        my={10}
        borderWidth={"1px"}
        p={3}>
        <Tabs variant="soft-rounded" colorScheme="teal">
          <TabList>
            <Tab width={"100%"}>Login</Tab>
            <Tab width={"100%"}>SignUp</Tab>
          </TabList>
          <TabPanels w="100%">
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default AuthPage;
