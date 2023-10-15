import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useState } from "react";

export const useFireStore = (collection) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const get = async (id) => {
    try {
      setLoading(true);
      const docSnap = await getDoc(doc(db, "users", id));
      setData(docSnap.data());
      setLoading(false);
    } catch (err) {
      setError("An error occurred");
      setLoading(false);
    }
  };
  const setDocWithId = (id, data) => {
    return setDoc(doc(db, collection, id), data);
  };

  return { setDocWithId, get, data, loading, error };
};
