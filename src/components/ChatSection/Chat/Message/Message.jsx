import { useEffect, useState } from "react";

import { ref, getDownloadURL } from "firebase/storage";

import { storage } from "../../../../firebase-config";

import user from "../../../../images/user.png";

import "./Message.scss";

const Message = ({ contact }) => {
  const [userUrl, setUserUrl] = useState();

  useEffect(() => getUserImage());

  const getUserImage = () => {
    if (contact)
      getDownloadURL(ref(storage, `contact-photos/${contact.photoName}`)).then(
        (url) => setUserUrl(url)
      );
  };

  const data = contact ? contact.messages : [];

  const image = userUrl ? userUrl : user;

  const getDate = (date) => {
    return new Date(date).toLocaleString('en-US') ;
  };

  return (
    <>
      {data.map((sms) =>
        sms.from ? (
          <li key={sms.date} className="message from">
            <img className="imgfrom" src={image} alt="..."></img>
            <div className="infofrom">
              <span className="textfrom">{sms.from}</span>
              <span className="date datefrom">{getDate(Number(sms.date))}</span>
            </div>
          </li>
        ) : (
          <li key={sms.date} className="message to">
            <div className="infofrom">
              <span className="textto">{sms.to}</span>
              <span className="date dateto">{getDate(Number(sms.date))}</span>
            </div>
          </li>
        )
      )}
    </>
  );
};
export default Message;
