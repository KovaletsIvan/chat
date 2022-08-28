import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { ref, getDownloadURL } from "firebase/storage";

import { storage } from "../../../firebase-config";

import { useContacts } from "../../../hook/useContacts";

import user from "../../../images/user.png";
import check from "../../../images/check.png";

import "./ContactInfo.scss";

const ContactInfo = () => {
  const [userUrl, setUserUrl] = useState();
  const [name, setName] = useState("");

  const contactId = useSelector((state) => state.contact.contact);

  const list = useContacts();

  useEffect(() => getUserImage(), [list]);

  const getUserImage = () => {
    const contact = list.filter((data) => data.uid === contactId);

    if (contact.length) {
      getDownloadURL(
        ref(storage, `contact-photos/${contact[0].photoName}`)
      ).then((url) => {
        setUserUrl(url);
        setName(contact[0].name);
      });
    }
  };
  const image = userUrl ? userUrl : user;

  return (
    <div className="info">
      <div className="position-relative">
        <img className="info_check" src={check} alt="..." />
        <img className="contact_photo" src={image} alt="..." />
      </div>
      <div>{name}</div>
    </div>
  );
};

export default ContactInfo;
