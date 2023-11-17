import {
  collection,
  setDoc,
  doc,
  getDoc,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useState } from "react";

export const useFireStore = (col) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const get = async (id) => {
    const docSnap = await getDoc(doc(db, col, id));
    return { ...docSnap.data(), id: docSnap.id };
  };
  const getFromReference = async (docRef) => {
    const docSnap = await getDoc(docRef);
    return { ...docSnap.data(), id: docSnap.id };
  };
  const writeDoc = async (data) => {
    return addDoc(collection(db, col), data);
  };
  const setDocWithId = (id, data) => {
    return setDoc(doc(db, col, id), data);
  };
  const getCollection = () => {
    return getDocs(collection(db, col));
  };
  const snapshotListener = (id, callback) => {
    return onSnapshot(doc(db, col, id), callback);
  };

  return {
    getFromReference,
    setDocWithId,
    get,
    writeDoc,
    getCollection,
    snapshotListener,
    data,
    loading,
    error,
  };
};
