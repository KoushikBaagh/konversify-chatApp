/* eslint-disable-next-line */
import React, { useState, useEffect } from "react";

import Signup from "../components/authentication/Signup";

import Login from "../components/authentication/Login";

import { Box, Container } from "@chakra-ui/react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  // const history = useHistory();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("userInfo"));
  //   if (user) history.push("/chats");
  // }, [history]);

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
      { email: "jane@example.com" },
      { email: "koushik@example.com" },
    ];
    setUsers(fetchedUsers);
  }, []);

  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     try {
  //       const user = JSON.parse(userInfo);
  //       if (user) history.push("/chats");
  //     } catch (error) {
  //       console.error("Error parsing userInfo:", error);
  //     }
  //   }
  // }, [history]);

  return (
    // <div>
    //   Its Homepage Koushik
    //   <Signup></Signup>
    //   <Login></Login>
    // </div>

    <Container maxW="xl" bg="blue.600" color="white" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg="white"
        color={"black"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <text
          style={{
            fontSize: "4xl",
            fontFamily: "Roboto",
            fontWeight: "bold",
          }}
        >
          Konversify APP
        </text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        {/* 2nd Box */}
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
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

      <Box
        backgroundColor="black"
        padding="10px"
        margin="10px"
        color={"white"}
        fontSize={"sm"}
        bgSize={"sm"}
      >
        <Text fontWeight="bold">
          Use the following Emails to check out the App
          <br /> (Password for both the emails is 123456):
        </Text>
        <ul style={{ listStylePosition: "inside" }}>
          {users.map((user, index) => (
            <li key={index}>{user.email}</li>
          ))}
        </ul>
      </Box>

      <Box
        backgroundColor="white"
        padding="5px"
        margin="5px"
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

      <Box fontSize={"sm"} bgSize={"sm"}>
        <Text>© 2024 Konversify. All Rights Reserved.</Text>
      </Box>
    </Container>
  );
};

export default Homepage;
