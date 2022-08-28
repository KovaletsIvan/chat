import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import SingUpPage from "./pages/SingUpPage/SingUpPage";
import ChatPage from "./pages/ChatPage/ChatPage";

import RequiredAuth from "./hoc/RequiredAuth";
import LoginAccess from "./hoc/LoginAccess";

import "./App.scss";

function App() {
  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <Routes>
        <Route
          path="/"
          element={
            <LoginAccess>
              <LoginPage />
            </LoginAccess>
          }
        />
        <Route
          path="chat"
          element={
            <RequiredAuth>
              <ChatPage />
            </RequiredAuth>
          }
        />
        <Route path="singup" element={<SingUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
