import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useContacts } from "../../../hook/useContacts";

import { getUid } from "../../../store/clices/uidSlicer";
import { getContact } from "../../../store/clices/contactSlicer";

import user from "../../../images/user.png";
import check from "../../../images/check.png";

import "./ContactInfo.scss";

const ContactInfo = () => {
  const [userUrl, setUserUrl] = useState();
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const contactId = useSelector((state) => state.contact.contact);

  const list = useContacts();

  useEffect(() => getUserImage(), [list]);

 
  const getUserImage = () => {
    const contact = list.filter((data) => data.uid === contactId);

    if (contact.length) {
      setUserUrl(contact[0].imageUrl);
      setName(contact[0].name);
      return;
    }
    setUserUrl(
      list[0]?.imageUrl
        ? list.sort((a, b) => b.lastMessageDate - a.lastMessageDate)[0].imageUrl
        : user
    );
    setName(list[0]?.name ? list[0].name : "");
    dispatch(getUid(list[0]?.uid ? list[0].uid : ""));
    dispatch(getContact(list[0]?.uid ? list[0].uid : ""));
  };
  const image = userUrl ? userUrl : user;

  console.log(list);

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
