/* eslint-disable */
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Chatpage = () => {
//   const [chats, setChats] = useState([]);

//   const fetchChats = async () => {
//     const { data } = await axios.get("/api/chat");

//     //console.log(data); // comment this line later
//     setChats(data);
//   };
//   useEffect(() => {
//     fetchChats();
//   }, []);

//   return (
//     <div>
//       {chats.map((chat) => (
//         <div key={chat._id}>{chat.chatName}</div>
//       ))}
//     </div>
//   );
// };

/*                              // Error Code 401 of axios : Solved
import React, { useEffect, useState } from "react";
import axios from "axios";

const Chatpage = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      const { data } = await axios.get("/api/chat").then(function (response) {
        // handle success
        // console.log(response); // comment this line later
        setChats(response.data);
      });
    } catch (error) {
      // handle error
      console.log(error);
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};*/

// LECTURE 11
import { Box } from "@chakra-ui/layout";
import React from "react";
import { useState } from "react";
//import { useEffect } from "react";
// import axios from "axios";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
