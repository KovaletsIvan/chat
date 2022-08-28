import { useSelector } from "react-redux";

export const useAuth = () => {
  const { uid, displayName, email, photoURL } = useSelector(
    (state) => state.loginData.userData
  );
  return {
    isLogin: !!email,
    uid,
    displayName,
    email,
    photoURL,
  };
};
