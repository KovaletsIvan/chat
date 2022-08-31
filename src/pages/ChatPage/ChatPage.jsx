import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { auth,db } from "../../firebase";

import User from "../../components/User/User";
import ContactList from "../../components/ContactList/ContactList";
import ChatSection from "../../components/ChatSection/ChatSection";

import { getList } from "../../store/clices/contactListSlicer";
import { logIn } from "../../store/clices/loginSlicer";

import "./ChatPage.scss";

const ChatPage = () => {
  const dispatch = useDispatch();
 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid } = user;
        const docRef = query(
          collection(db, "userData"),
          where("uid", "==", uid)
        );
        getDocs(docRef).then((resp) => {
          resp.forEach((doc) => dispatch(logIn(doc.data())));
        });
      }
    });
  }, [dispatch]);

  const getContactsData = () => {
    getDocs(collection(db, "contacts"))
      .then((resp) => {
        const arr = [];
        resp.forEach((doc) => {
          arr.push(doc.data());
        });
        return arr;
      })
      .then((data) => dispatch(getList(data)));
  };

  useEffect(() => getContactsData(), []);

  return (
    <div className="chat-page">
      <div className="bar">
        <User />
        <ContactList />
      </div>
      <ChatSection />
    </div>
  );
};
export default ChatPage;
