/* eslint-disable-next-line */
import React, { useState, useEffect } from "react";

import Signup from "../components/authentication/Signup";

import Login from "../components/authentication/Login";
import logo from "./BIT-Mesra-Alumni-LOGO.png"; // Import the image
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Box,
  Container,
  Flex,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      if (user) history.push("/chats");
    } catch (error) {
      console.error("Error parsing userInfo:", error);
    }
  }, [history]);

  useEffect(() => {
    // Fetch users from your API or local storage
    // This is just a placeholder, replace it with your actual data fetching method
    const fetchedUsers = [
      { email: "mca40057.22@bitmesra.ac.in" },
      { email: "mca40056.22@bitmesra.ac.in" },
    ];
    setUsers(fetchedUsers);
  }, []);

  return (
    <Box
      display={{ base: "block", md: "flex" }}
      bg="transparent"
      minH="100vh"
      p={5}
    >
      {/* <div>
        Its Homepage Koushik
        <Signup></Signup>
        <Login></Login>
      </div> */}

      {isLargerThan768 ? (
        <>
          <FirstContainer users={users} />
          <SecondContainer />
        </>
      ) : (
        <>
          <SecondContainer />
          <FirstContainer users={users} />
        </>
      )}
    </Box>
  );
};

const FirstContainer = ({ users }) => {
  return (
    <Container
      maxW="xl"
      bg="transparent"
      color="white"
      centerContent
      flex="1"
      marginTop={{ base: "1rem", md: "23rem" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        // backgroundColor="black"
        backgroundColor="rgba(0, 0, 0, 0.7)"
        padding="5px"
        margin="10px"
        m="50px 0 15px 0"
        color={"white"}
        fontSize={"sm"}
        bgSize={"sm"}
      >
        <Text fontWeight="bold">
          Use the following Emails to check out and TEST the App
          <br /> Note: Video Sending Feature has been turned off
          <br /> due to storage issues in the database.
          <br /> Only PDF and image files can be sent.
          <br /> (Password for both the emails is 123456):
        </Text>
        <ul style={{ listStylePosition: "inside" }}>
          {users.map((user, index) => (
            <li key={index}>{user.email}</li>
          ))}
        </ul>
      </Box>

      <Box
        textAlign="center"
        // backgroundColor="white"
        padding="5px"
        margin="1px"
        color={"black"}
        fontSize={"sm"}
        bgSize={"sm"}
      >
        <Text>
          "NOTE: There are some compatibility issues, which I will Fix in due
          time : If at any point there occurs a blank page, do refresh the
          website."
        </Text>
      </Box>
    </Container>
  );
};

const SecondContainer = () => {
  return (
    <Container maxW="xl" bg="transparent" color="white" centerContent flex="1">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        p={3}
        bg="rgba(128, 128, 128, 0.5)" // grey color with 50% transparency
        color={"black"}
        w="100%"
        m="50px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        // width="calc(100% + 1px)" // Increase the width by 10px
        // height="calc(100% + 1px)" // Increase the height by 10px
      >
        <Box
          textAlign="center"
          bg="rgba(0, 0, 0, 0.7)" // black color with 70% opacity
          borderRadius="lg"
          borderWidth="1px"
        >
          <Flex alignItems="center">
            <Image
              src={logo} // Replace with your image path
              alt="BITMAA Logo" // Replace with your alt text
              boxSize="50px" // Adjust as needed
              marginRight="1rem" // Adjust as needed
            />
            <Text
              style={{
                fontSize: "4xl",
                fontFamily: "Roboto",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Konversify - A communicative platform for BIT Alumni
            </Text>
          </Flex>
        </Box>

        <Box
          bg="rgba(0, 0, 0, 0.7)" // black color with 70% opacity
          w="100%"
          p={4}
          borderRadius="lg"
          borderWidth="1px"
        >
          {/* 2nd Box */}
          <Tabs isFitted variant="soft-rounded" colorScheme="red">
            <TabList mb="1em">
              <Tab width="50%" color={"whitesmoke"}>
                Login
              </Tab>
              <Tab width="50%" color={"whitesmoke"}>
                Sign Up
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box fontSize={"sm"} bgSize={"sm"}>
          <Text fontWeight="bold">© 2024 Konversify. All Rights Reserved.</Text>
        </Box>
      </Box>
    </Container>
  );
};

export default Homepage;
