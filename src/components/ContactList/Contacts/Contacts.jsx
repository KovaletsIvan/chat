import { useSelector } from "react-redux";

import Contact from "../Contact/Contact";

import { useContacts } from "../../../hook/useContacts";

import "./Contacts.scss";

const Contacts = () => {
  const text = useSelector((state) => state.search.searchData);

  const list = useContacts();

  const filteredList = list
    .slice()
    .filter((contact) =>
      contact.name.toLowerCase().includes(text.toLowerCase())
    );

  return (
    <ul className="contacts_lists list-unstyled">
      {filteredList.map((contact) => (
        <Contact
          key={contact.uid}
          uid={contact.uid}
          name={contact.name}
          messages={contact.messages}
          photoName={contact.photoName}
        />
      ))}
    </ul>
  );
};

export default Contacts;
