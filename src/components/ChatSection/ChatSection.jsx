import React from "react";

import ContactInfo from "./ContactInfo/ContactInfo";
import Chat from "./Chat/Chat";
import TextInput from "./TextInput/TextInput";

import "./ChatSection.scss";

const ChatSection = () => {
  return (
    <div className="chat">
      <ContactInfo />
      <Chat />
      <TextInput />
    </div>
  );
};

export default ChatSection;
