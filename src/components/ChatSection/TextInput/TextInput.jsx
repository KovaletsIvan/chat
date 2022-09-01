import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { collection, doc, updateDoc, getDocs } from "firebase/firestore";

import { db } from "../../../firebase";

import send from "../../../images/send.png";

import { getList } from "../../../store/clices/contactListSlicer";

import "./TextInput.scss";

const TextInput = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.uidContact);
  const { contactList } = useSelector((state) => state.list);

  const [contact] = contactList
    ? contactList.filter((con) => con.uid === uid)
    : [];

  const messages = contact ? contact.messages : [];

  const handleChanges = (e) => {
    setMessage(e.target.value);
  };

  const getDataToRendr = () =>
    getDocs(collection(db, "contacts")).then((resp) => {
      const arr = [];
      resp.forEach((doc) => {
        arr.push(doc.data());
      });
      return arr;
    });

  const sendMessage = async () => {
    const washingtonRef = doc(db, "contacts", uid);
    await updateDoc(washingtonRef, {
      messages: [...messages, { to: message, date: Date.now() }],
    })
      .then(() => getDataToRendr())
      .then((resp) => {
        dispatch(getList(resp));
        setMessage("");
      });
  };

  const getResponce = () => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((resp) => resp.json())
      .then((res) => res.value)
      .then((joke) => {
        getDocs(collection(db, "contacts"))
          .then((resp) => {
            const arr = [];
            resp.forEach((doc) => {
              if (doc.data().uid === uid) arr.push(doc.data().messages);
            });
            return [...arr, { from: joke, date: Date.now() }].flat();
          })
          .then((data) => {
            const washingtonRef = doc(db, "contacts", uid);
            const delay = Math.floor(
              Math.random() * (15000 - 10000 + 1) + 10000
            );
            setTimeout(() => {
              updateDoc(washingtonRef, {
                messages: data,
                lastMessageDate: Date.now(),
              })
                .then(() => getDataToRendr())
                .then((data) => dispatch(getList(data)));
            }, delay);
          });
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (message) {
        sendMessage();
        getResponce();
      }
    }
  };

  return (
    <div className="textform" onKeyDown={handleKeyPress}>
      <form className="form-area">
        <input
          className="textinput"
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => {
            handleChanges(e);
          }}
        />
        <img
          className="send"
          src={send}
          alt="..."
          onClick={() => {
            if (message) {
              sendMessage();
              getResponce();
            }
          }}
        />
      </form>
    </div>
  );
};

export default TextInput;
