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

  const lastDateMessage = list.sort(
    (a, b) => b.lastMessageDate - a.lastMessageDate
  );

  const listToRender = text ? filteredList : lastDateMessage;

  console.log(lastDateMessage);

  return (
    <ul className="contacts_lists list-unstyled">
      {listToRender.map((contact) => (
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
