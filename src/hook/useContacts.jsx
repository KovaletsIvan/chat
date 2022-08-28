import { useSelector } from "react-redux";

export const useContacts = () => {
  const [...contactList] = useSelector((state) => state.list.contactList);

  return contactList;
};
