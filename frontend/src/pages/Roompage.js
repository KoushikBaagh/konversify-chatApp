// @ts-nocheck

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Roompage = () => {
  const { roomId } = useParams();

  useEffect(() => {
    const myMeeting = async () => {
      const appID = 1406412054;
      const serverSecret = "dd1ecb16826543b14272e94be03edb35";
      const placeholder = "Enter Your Name";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        placeholder
      );

      // Create instance object from Kit Token.
      //Get the container element
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: document.getElementById("video-call-container"), // Replace with your actual container element
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showPreJoinView: true, // Whether to display the prejoin view. Displayed by default
        branding: {
          logoURL: require("./brand-logo.png"), // The branding LOGO URL.
        },
        showScreenSharingButton: true, // Whether to display the Screen Sharing button. Displayed by default.
      });
    };

    myMeeting();
  }, [roomId]);

  const style = {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    overflow: "auto",
  };

  return (
    <div id="video-call-container" style={style}>
      Roompage{roomId}
    </div>
  );
};

export default Roompage;
