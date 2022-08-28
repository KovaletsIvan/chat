import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { signInWithPopup, GithubAuthProvider } from "firebase/auth";

import { collection, getDocs, setDoc, doc } from "firebase/firestore";

import { auth } from "../../firebase-config";
import { db } from "../../firebase-config";

import { logIn } from "../../store/clices/loginSlicer";

import "./GitBtn.scss";

const GitBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new GithubAuthProvider();

  const singInWithGit = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        const { email, uid, displayName, photoURL } = user;
        dispatch(logIn({ email, uid, displayName, photoURL }));
        navigate("/chat", { replace: true });

        getDocs(collection(db, "userData"))
          .then((data) => {
            const arr = [];
            data.forEach((doc) => arr.push(doc.data()));
            return arr;
          })
          .then((resp) => {
            if (!resp.filter((elem) => elem.email === email).length) {
              setDoc(doc(db, "userData", uid), {
                email,
                uid,
                displayName,
                photoURL,
              });
            }
          });
      })
      .catch(console.error);
  };

  return (
    <span
      className="btn btn-dark git"
      onClick={() => {
        singInWithGit();
      }}
    >
      GitHub
    </span>
  );
};
export default GitBtn;
