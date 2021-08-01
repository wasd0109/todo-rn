import db from "../utils/fbinit";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/core";

type useFBGetAllReturn = {
  loading: boolean;
  data: any[];
  error: string;
};

const useFBGetAll: (
  collection: string,
  shouldRefetch: {}
) => useFBGetAllReturn = (
  collection: string,
  shouldRefetch: {}
): useFBGetAllReturn => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<string>("");
  // TODO Separate isFocused from the hook?
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
  }, [isFocused, shouldRefetch, collection]);
  return { loading, data, error };
};

export default useFBGetAll;
