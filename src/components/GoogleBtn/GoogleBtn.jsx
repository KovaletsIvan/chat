import { useDispatch } from "react-redux";

import { useNavigate } from "react-router";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import { auth } from "../../firebase-config";
import { db } from "../../firebase-config";

import { logIn } from "../../store/clices/loginSlicer";

import "./GoogleBtn.scss";

const GoogleBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();

  const handleSingin = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        const { email, uid, displayName, photoURL } = user;
        localStorage.setItem("isAuth", !!user.uid);
        dispatch(logIn({ email, uid, displayName, photoURL }));
        navigate("/chat", { replace: true });

        setDoc(doc(db, "userData", uid), {
          email,
          uid,
          displayName,
          photoURL,
        });
      })
      .catch(console.error);
  };
  return (
    <span className="btn btn-danger" onClick={handleSingin}>
      Google
    </span>
  );
};

export default GoogleBtn;
