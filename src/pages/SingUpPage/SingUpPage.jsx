import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import { auth, db } from "../../firebase";

import { logIn } from "../../store/clices/loginSlicer";

import "./SingUpPage.scss";

const SingUpPage = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSingIn = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const { email, uid, displayName, photoURL } = user;
        dispatch(logIn({ email, uid, displayName, photoURL }));
        navigate("/chat", { replace: true });
        setDoc(doc(db, "userData", uid), {
          email,
          uid,
          displayName,
          photoURL,
        });
      })
      .catch((error) => console.log(error));
  };

  const { email, password } = userData;

  return (
    <form className="form d-flex flex-column col-4" style={{ gap: "20px" }}>
      <h4>Sing Up</h4>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>

        <input
          type="email"
          className="form-control"
          name="email"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          name="password"
          id="exampleInputPassword1"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <span className="text" role="button" onClick={() => navigate("/")}>
        I am already registered.
      </span>
      <button
        className="btn btn-success mt-3 mr-3 d-block m-auto col-12"
        onClick={(e) => {
          e.preventDefault();
          handleSingIn(email, password);
          setUserData({
            email: "",
            password: "",
          });
        }}
      >
        Sing Up
      </button>
    </form>
  );
};

export default SingUpPage;
