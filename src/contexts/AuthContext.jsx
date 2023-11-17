import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, collection, doc } from "firebase/firestore";
import { useFireStore } from "../hooks/useFireStore";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setDocWithId } = useFireStore("users");
  const { get } = useFireStore("users");

  useEffect(() => {
    return onAuthStateChanged(auth, () => {
      setCurrentUser(auth.currentUser);
      setLoading(false);
    });
  }, []);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.addScope("email");
  googleProvider.addScope("profile");

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult();
    console.log(credential);
    const token = credential.accessToken;
    console.log(token);
  };

  const updateUserInfo = (id, firstName, lastName, username) => {
    return setDocWithId(id, {
      firstName,
      lastName,
      username,
    });
  };

  const logOut = () => {
    return signOut(auth);
  };

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signUp,
        logOut,
        updateUserInfo,
        login,
        signInWithGoogle,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
export default AuthContextProvider;
