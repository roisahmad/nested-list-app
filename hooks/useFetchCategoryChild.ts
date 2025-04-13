import { getCategoryApi, getCategoryChildApi } from "@/api/CategoryApi";
import { useState } from "react";

interface JokesItem {
  id: number;
  category: string;
  joke: string;
  type: string;
}

interface JokesData {
  error: boolean;
  amount: number;
  jokes: JokesItem[];
}

const useFetchCategoryChild = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<JokesData>({
    error: false,
    amount: 5,
    jokes: [],
  });
  const [dataList, setDataList] = useState<JokesItem[]>([]);

  const fetchApi = async (
    category: string,
    params: { type: string; amount: number }
  ) => {
    try {
      setIsLoading(true);
      const result = await getCategoryChildApi(category, params);
      if (result?.status === 200) {
        const data = result?.data;

        setFetchedData(data);
        setDataList((prev) => [...prev, ...result?.data?.jokes]);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching category data", error);
      setIsLoading(false);
      setFetchedData({
        error: true,
        amount: 5,
        jokes: [],
      });
    }
  };

  const loadData = (
    category: string,
    params: { type: string; amount: number }
  ) => {
    fetchApi(category, params);
  };

  return {
    isLoading,
    fetchedData,
    dataList,
    loadData,
  };
};

export { useFetchCategoryChild, JokesData, JokesItem };
