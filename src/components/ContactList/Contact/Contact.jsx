import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { getContact } from "../../../store/clices/contactSlicer";
import { getUid } from "../../../store/clices/uidSlicer";

import check from "../../../images/check.png";

import user from "../../../images/user.png";

import "./Contact.scss";

const Contact = ({
  name,
  messages,
  photoName,
  uid,
  imageUrl,
  toggleContactListClass,
  toggleContactList,
}) => {
  const [message, setMessage] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dataToShow();
  }, [messages]);

  const getUserId = () => {
    dispatch(getContact(uid));
    dispatch(getUid(uid));
  };

  const dataToShow = () => {
    if (messages) {
      const data = messages.filter((elem) => !!elem.from);
      setMessage(data);
    }
  };

  const image = imageUrl ? imageUrl : user;

  const lastMessageFrom = message.length ? message.reverse()[0].from : "";
  const messageFromDate = message.length
    ? new Date(Number(message.reverse()[0].date)).toLocaleString("en-US", {
        day: "numeric",
        year: "numeric",
        month: "long",
      })
    : null;

  return (
    <li
      className="contact d-flex position-relative"
      onClick={() => {
        getUserId();
        toggleContactListClass();
        toggleContactList();
      }}
    >
      <img className="check-img" src={check} alt="..." />
      <img className="userImage" src={image} alt={photoName} />
      <div>
        <h6>{name}</h6>
        <div className="message-text">{lastMessageFrom}</div>
      </div>
      <p className="message-date">{messageFromDate}</p>
    </li>
  );
};

export default Contact;
