import Contacts from "../ContactList/Contacts/Contacts";

import "./ContactList.scss";

export const ContactList = () => {
  return (
    <div className="list">
      <h3 className="text-info py-4 px-2">Chats</h3>
      <Contacts />
    </div>
  );
};

export default ContactList;
