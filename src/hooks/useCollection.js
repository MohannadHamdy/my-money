import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  where,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

export const useCollection = (c, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const q = useRef(_query).current;
  const order = useRef(_orderBy).current;
  useEffect(() => {
    let ref = collection(db, c);

    if (q) {
      ref = query(ref, where(...q));
    }

    if (order) {
      ref = query(ref, orderBy(...order));
    }
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocuments(results);
      },
      (error) => {
        console.log(error);
        setError(error.message);
      }
    );

    return () => unsub();
  }, [c, query, order]);

  return { documents, error };
};
