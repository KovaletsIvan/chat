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

  const sendMessage = async () => {
    const washingtonRef = doc(db, "contacts", uid);
    await updateDoc(washingtonRef, {
      messages: [...messages, { to: message, date: Date.now() }],
    }).then(() => {
      getDocs(collection(db, "contacts"))
        .then((resp) => {
          const arr = [];
          resp.forEach((doc) => {
            arr.push(doc.data());
          });
          return arr;
        })
        .then((data) => {
          dispatch(getList(data));
          setMessage("");
        });
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
            updateDoc(washingtonRef, {
              messages: data,
              lastMessageDate: Date.now(),
            });
          })
          .then(() => {
            setTimeout(function () {
              getDocs(collection(db, "contacts"))
                .then((resp) => {
                  const arr = [];
                  resp.forEach((doc) => {
                    arr.push(doc.data());
                  });
                  return arr;
                })
                .then((data) => dispatch(getList(data)));
            }, 15000);
          });
      });
  };

  return (
    <div className="textform">
      <form className="form-area">
        <input
          className="textinput"
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={handleChanges}
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
