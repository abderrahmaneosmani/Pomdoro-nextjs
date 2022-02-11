import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "@firebase/auth";
import React, { useEffect, useContext, useState, createContext } from "react";
import { auth } from "../services/firebaseConfig";

const AuthContext = createContext({
  currentUser: null,
  signIn: () => Promise,
  singUp: () => Promise,
  signInWithGoogle: () => Promise,
  logout: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {}, [currentUser]);

  function singUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
  }

  function logout() {
    return signOut(auth);
  }

  const value = { currentUser, signIn, singUp, signInWithGoogle, logout };

  return (
    <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
  );
}
