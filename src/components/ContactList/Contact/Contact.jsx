import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { ref, getDownloadURL } from "firebase/storage";

import { storage } from "../../../firebase-config";

import { getContact } from "../../../store/clices/contactSlicer";
import { getUid } from "../../../store/clices/uidSlicer";

import check from "../../../images/check.png";

import user from "../../../images/user.png";

import "./Contact.scss";

const Contact = ({ name, messages, photoName, uid }) => {
  const [userUrl, setUserUrl] = useState();
  const [message, setMessage] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserImage();
    dataToShow();
  }, [messages]);

  const getUserImage = () => {
    getDownloadURL(ref(storage, `contact-photos/${photoName}`)).then((url) =>
      setUserUrl(url)
    );
  };

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

  const image = userUrl ? userUrl : user;

  const lastMessageFrom = message.length ? message.reverse()[0].from : "";
  const messageFromDate = message.length
    ? new Date(Number(message.reverse()[0].date)).toLocaleString("en-US", {
        day: "numeric",
        year: "numeric",
        month: "long",
      })
    : null;

  return (
    <li className="contact d-flex position-relative" onClick={getUserId}>
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
