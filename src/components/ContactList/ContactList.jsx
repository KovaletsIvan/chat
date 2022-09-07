
import Contacts from "../ContactList/Contacts/Contacts";

import "./ContactList.scss";

export const ContactList = ({
  contactListClass,
  toggleContactList,
  toggleContactListClass,
}) => {

  return (
    <div className={`list ${contactListClass}`}>
      <h3 className="text-info py-4 px-2">Chats</h3>
      <Contacts
        toggleContactListClass={toggleContactListClass}
        toggleContactList={toggleContactList}
      />
    </div>
  );
};

export default ContactList;
