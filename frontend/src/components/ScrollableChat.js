import React from "react";
import ScrollableFeed from "react-scrollable-feed";
// import { FaRegFilePdf } from "react-icons/fa6";
// <FaRegFilePdf />
import "./styles.css";
import {
  isLastMessage,
  isSameSender,
  isSameUser,
  isSameSenderMargin,
} from "../config/ChatLogics";
import { Avatar, Tooltip } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  // const formatTime24Hour = (timestamp) => {
  //   const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
  //   let hours = date.getHours();
  //   let minutes = date.getMinutes();
  //   minutes = minutes < 10 ? "0" + minutes : minutes;
  //   return hours + ":" + minutes;
  // };

  return (
    <ScrollableFeed className="scrollable-chat" forceScroll={true}>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content.endsWith(".pdf") ? (
                <a href={m.content} download>
                  <img
                    className="pdf-icon"
                    src="https://cdn-icons-png.flaticon.com/128/136/136522.png"
                    alt="PDF"
                  />
                  <span>{m.content.split("/").pop().replace(/^\d+-/, "")}</span>
                </a>
              ) : m.content.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
                <a href={m.content} download>
                  <img
                    style={{
                      width: 100,
                      height: "100%",
                      objectFit: "cover",
                      padding: 1,
                    }}
                    src={m.text ? m.text : m.content}
                    alt={m.text}
                  />
                </a>
              ) : (
                m.content
              )}
              {/* {m.content} */}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
