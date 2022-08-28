import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAcBgnd1txdoKLDcQarXOw1QayTbyigtdk",
  authDomain: "chat-a749d.firebaseapp.com",
  projectId: "chat-a749d",
  storageBucket: "chat-a749d.appspot.com",
  messagingSenderId: "442777499088",
  appId: "1:442777499088:web:db0fdf5b08c5e548d275d5"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
