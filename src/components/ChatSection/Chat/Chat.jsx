import { useEffect, useRef } from "react";

import { useSelector } from "react-redux";

import Message from "./Message/Message";

import { useContacts } from "../../../hook/useContacts";

import "./Chat.scss";

const Chat = () => {
  const list = useContacts();

  const bottomRef = useRef(null);

  const contactId = useSelector((state) => state.contact.contact);

  const [data] = list.filter((data) => data.uid === contactId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <div className="chat-field">
      <ul className="chat-field__list">
        <Message contact={data} />
      </ul>
      <div ref={bottomRef}></div>
    </div>
  );
};

export default Chat;
