import ContactInfo from "./ContactInfo/ContactInfo";
import Chat from "./Chat/Chat";
import TextInput from "./TextInput/TextInput";

import "./ChatSection.scss";

const ChatSection = ({
  chatClass,
  toggleContactList,
  toggleChat,
  toggleContactListClass,
}) => {
  return (
    <div className={chatClass}>
      <ContactInfo
        toggleContactList={toggleContactList}
        toggleContactListClass={toggleContactListClass}
        toggleChat={toggleChat}
      />
      <Chat />
      <TextInput />
    </div>
  );
};

export default ChatSection;
