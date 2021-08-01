import db from "../utils/fbinit";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/core";

type FBGetAll = {
  loading: boolean;
  data: any[];
  error: string;
};

const useFBGetAll: (collection: string, shouldRefetch: {}) => FBGetAll = (
  collection: string,
  shouldRefetch: {}
): FBGetAll => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<string>("");
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!collection) return;
    const fetchData = async () => {
      try {
        const docs = await db.collection(collection).get();
        let temp: any[] = [];
        docs.forEach((item) => temp.push(item.data()));
        setData(temp);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [isFocused, shouldRefetch]);
  return { loading, data, error };
};

const fbAdd: (collection: string, doc: {}) => Promise<boolean> = async (
  collection: string,
  doc: {}
): Promise<boolean> => {
  try {
    db.collection(collection).doc(doc.id).set(doc);
    return Promise.resolve(true);
  } catch (err) {
    return Promise.reject(false);
  }
};

export { useFBGetAll, fbAdd };
