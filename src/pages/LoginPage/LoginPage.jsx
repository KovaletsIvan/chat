import React, { useState, useEffect } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../../firebase-config";


import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import GoogleBtn from "../../components/GoogleBtn/GoogleBtn";
import GitBtn from "../../components/GitBtn/GitBtn";

import { logIn } from "../../store/clices/loginSlicer";

import "./LoginPage.scss";

export const LoginPage = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) return user.uid;
    });
  }, []);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const { email, uid, displayName, photoURL } = user;
        dispatch(logIn({ email, uid, displayName, photoURL }));
        navigate("/chat", { replace: true });
      })
      .catch(console.error);
  };


  const { email, password } = userData;

  return (
    <form className="form d-flex flex-column">
      <h4 className="">Log in</h4>
      <div className="form-group mt-4 position-relative">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <span className="need">
          Need an account?
          <span
            className="text text-success"
            role="button"
            onClick={() => navigate("/singup")}
          >
            {"  "}
            Sing up
          </span>
        </span>
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

      <div className="form-group mt-4">
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
      <button
        className="btn btn-success mt-3 mr-3 d-block col-12"
        style={{ minWidth: "75px" }}
        onClick={(e) => {
          e.preventDefault();
          handleLogin(email, password);
          setUserData({
            email: "",
            password: "",
          });
        }}
      >
        Login
      </button>

      <span className="d-blok mx-auto text-secondary">Or login with</span>
      <div className="d-flex justify-content-center" style={{ gap: "20px" }}>
        <GoogleBtn />
        <GitBtn />
      </div>
    </form>
  );
};

export default LoginPage;
