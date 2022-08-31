import { useDispatch } from "react-redux";

import { signOut } from "firebase/auth";

import { auth } from "../../firebase";

import { useAuth } from "../../hook/useAuth";

import { logOut } from "../../store/clices/loginSlicer";
import { removeList } from "../../store/clices/contactListSlicer";
import { searchContact } from "../../store/clices/searchSlicer";

import imgUser from "../../images/user.png";
import check from "../../images/check.png";
import search from "../../images/search.png";

import "./User.scss";

const User = () => {
  const dispatch = useDispatch();
  const { displayName, photoURL } = useAuth();

  const handleChanges = (e) => {
    dispatch(searchContact(e.target.value));
  };

  const singOut = () => {
    localStorage.removeItem("isAuth");
    signOut(auth)
      .then(() => {
        dispatch(logOut());
        dispatch(removeList());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const userImg = photoURL ? photoURL : imgUser;

  return (
    <div className="header">
      <img className="check" src={check} alt="..."></img>
      <img className="user-photo" src={userImg} alt="userImage"></img>
      <span className="user-name">{displayName}</span>
      <span className="logout" role="btn" onClick={singOut}>
        &times;
      </span>
      <span className="position-relative">
        <img className="search" src={search} alt="..."/>
        <input
          type="text"
          name="text"
          className="input"
          placeholder="Search or start new chat"
          onChange={(e) => {
            handleChanges(e);
          }}
        />
      </span>
    </div>
  );
};

export default User;
