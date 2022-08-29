import { useSelector } from "react-redux";

export const useAuth = () => {
  const { uid, displayName, email, photoURL } = useSelector(
    (state) => state.loginData.userData
  );

  const status = JSON.parse(localStorage.getItem("isAuth"));

  return {
    isLogin: status,
    uid,
    displayName,
    email,
    photoURL,
  };
};
