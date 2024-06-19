/* eslint-disable */
import React, { useEffect, useRef, useState, useCallback } from "react";

import { Text, Box, IconButton, Image } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { Spinner, useToast } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import { Input } from "@chakra-ui/input";
import axios from "axios";

import "./styles.css";
import ScrollableChat from "./ScrollableChat";

import { InputGroup } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSmile } from "react-icons/bs";

import Lottie from "react-lottie";
import animationData from "../animations/typing Animation1-Lottie JSon.json";
import io from "socket.io-client";

//require("dotenv").config();

const ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://konversify-x-bit-mesra.onrender.com"
    : "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const toast = useToast();
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log(messages);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    //eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
      }
      //if (!notification.includes(newMessageRecieved)) {
      //setNotification([newMessageRecieved, ...notification]);
      //setFetchAgain(!fetchAgain);
      //}
      else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const sendMessage = async (event) => {
    // Check if the event is a click event on the "send button" or an "Enter" key is pressed
    if (
      (event.currentTarget.className.includes("send-button") &&
        newMessage.trim()) ||
      (event.key === "Enter" && newMessage.trim())
    ) {
      socket.emit("stop typing", selectedChat._id);
      try {
        let messageToSend = newMessage; // Keep the message as the file name initially

        // Check if the message contains a file name and replace it with the file URL
        if (file && newMessage.includes(file.name)) {
          messageToSend = newMessage.replace(file.name, image); // Replace file name with image URL
        }

        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: messageToSend, // Send the modified message
            chatId: selectedChat,
          },
          config
        );
        console.log(data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // Typing Indicator Logic;
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  /////////////////////////////////////   Emoji Picker Logic STARTs here   //////////////////////////////////////////
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id !== "emoji-open") {
        if (
          emojiPickerRef.current &&
          !emojiPickerRef.current.contains(event.target)
        ) {
          setShowEmojiPicker(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const handleEmojiModal = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage((newMessage) => newMessage + emoji.native);
  };
  /////////////////////////////////////   Emoji Picker Logic ENDS here  //////////////////////////////////////////

  const [file, setFile] = useState();
  const fileInputAttach = useRef();
  const [image, setImage] = useState("");

  /////////// UPLOAD File Function STARTs here //////////

  const uploadFile = useCallback(
    async (data) => {
      try {
        const config = {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const response = await axios.post("/api/upload", data, config);

        if (response.status === 200) {
          toast({
            title: "Success!",
            description: "File uploaded successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return response; // return the response
        } else {
          throw new Error("File upload failed");
        }
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to upload the file",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        throw error; // throw the error again
      }
    },
    [user.token, toast]
  );

  /////////// UPLOAD File Function ENDS here//////////

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          let imageUrl = await uploadFile(data); // Capture the imageUrl returned by uploadFile
          console.log(imageUrl);
          setImage(imageUrl.data); // Store the imageUrl in state
          //setNewMessage((newMessage) => newMessage + " " + imageUrl.data);
        } catch (error) {
          console.error("Failed to upload file:", error);
        }
      }
    };
    getImage();
  }, [file, uploadFile]);

  const handleFileUpload = (e) => {
    //alert("file uploaded");
    console.log(e);
    setFile(e.target.files[0]);
    setNewMessage((newMessage) => newMessage + " " + e.target.files[0].name);
    //setNewMessage((newMessage) => newMessage + " " + image);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchMessages={fetchMessages}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {isTyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}

              <InputGroup>
                <IconButton
                  aria-label="Attach a File"
                  icon={<AttachmentIcon />}
                  variant="filled"
                  bg="#E0E0E0"
                  onClick={() => fileInputAttach.current.click()}
                />
                <Input
                  ref={fileInputAttach}
                  type="file"
                  multiple
                  onChange={(e) => handleFileUpload(e)}
                  variant="filled"
                  bg="#E0E0E0"
                  style={{ display: "none" }}
                />
                <Input
                  variant="filled"
                  bg="#E0E0E0"
                  placeholder="Enter a message.."
                  value={newMessage}
                  onChange={typingHandler}
                />

                <IconButton
                  aria-label="Add an Emoji"
                  icon={
                    <BsEmojiSmile
                      title="Emoji"
                      id="emoji-open"
                      onClick={handleEmojiModal}
                    />
                  }
                  variant="filled"
                  bg="#E0E0E0"
                />
                {showEmojiPicker && (
                  <div
                    className="absolute bottom-24 left-16 z-40"
                    display="flex"
                    ref={emojiPickerRef}
                  >
                    <Picker data={data} onEmojiSelect={handleEmojiClick} />
                  </div>
                )}
                <IconButton
                  className="send-button"
                  aria-label="Send Message Icon"
                  icon={
                    <Image
                      src="https://cdn-icons-png.flaticon.com/128/10426/10426419.png"
                      boxSize="24px"
                    />
                  }
                  variant="filled"
                  bg="#E0E0E0"
                  onClick={sendMessage}
                />
              </InputGroup>
            </FormControl>
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
