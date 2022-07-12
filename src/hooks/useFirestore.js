import { useReducer, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

let initialState = {
  document: null,
  error: null,
  isPending: false,
  success: false,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "IS_ERROR":
      return { ...state, error: true, isPending: false, success: false };
    case "CRUD_DOC":
      return {
        document: action.payload,
        isPending: false,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};

export const useFirestore = (collect) => {
  const [isCancelled, setIsCancelled] = useState(false);

  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      // Add a new document with a generated id.
      const createdAt = serverTimestamp();
      const docRef = await addDoc(collection(db, collect), {
        ...doc,
        createdAt,
      });
      console.log("Document written with ID: ", docRef.id);
      if (!isCancelled) {
        dispatch({ type: "CRUD_DOC", payload: docRef });
      }
    } catch (error) {
      if (!isCancelled) {
        dispatch({ type: "IS_ERROR", payload: error.message });
      }
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const docDel = await deleteDoc(doc(db, collect, id));

      if (!isCancelled) {
        dispatch({ type: "CRUD_DOC", payload: docDel });
      }
    } catch (error) {
      if (!isCancelled) {
        dispatch({ type: "IS_ERROR", payload: error.message });
      }
    }
  };

  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
