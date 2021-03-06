import db from "../utils/fbinit";
import { useState, useEffect } from "react";

type useFBAddReturn = {
  loading: boolean;
  success: boolean;
  error: string | null;
};

export type Doc = {
  title?: string;
  id: string;
  createdAt: number;
};

const useFBAdd: (
  collection: string,
  doc: Doc,
  callback?: Function
) => useFBAddReturn = (
  collection: string,
  doc: Doc,
  callback?: Function
): useFBAddReturn => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (doc.id) {
      setLoading(true);
      const addDoc = async () => {
        try {
          const docRef = await db.collection(collection).doc(doc.id);
          const docExist = (await docRef.get()).exists;
          if (docExist) {
            setError("File with the same ID already exist");
          } else {
            await docRef.set(doc);
            setLoading(false);
            setSuccess(true);
            if (callback) callback(); // Receive callback for action after success
          }
        } catch (err) {
          setError(err);
        }
      };
      addDoc();
    }
  }, [doc]);
  return { success, error, loading };
};

export default useFBAdd;
