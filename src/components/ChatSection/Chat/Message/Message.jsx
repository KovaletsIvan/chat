import user from "../../../../images/user.png";

import "./Message.scss";

const Message = ({ contact }) => {
  const imageUrl = contact ? contact.imageUrl : user;

  const data = contact ? contact.messages : [];

  const getDate = (date) => {
    return new Date(date).toLocaleString("en-US");
  };

  return (
    <>
      {data.map((sms) =>
        sms.from ? (
          <li key={sms.date} className="message from">
            <img className="imgfrom" src={imageUrl} alt="..."></img>
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
