import { useRef } from "react";

import { useSelector } from "react-redux";

import Message from "./Message/Message";

import { useContacts } from "../../../hook/useContacts";

import "./Chat.scss";
import { useEffect } from "react";

const Chat = () => {
  const list = useContacts();

  const ref = useRef();

  useEffect(() => window.scrollTo(0, 0));

  const contactId = useSelector((state) => state.contact.contact);

  const [data] = list.filter((data) => data.uid === contactId);

  return (
    <div ref={ref} className="chat-field">
      <ul className="chat-field__list">
        <Message contact={data} />
      </ul>
    </div>
  );
};

export default Chat;
