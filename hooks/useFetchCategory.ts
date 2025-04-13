import { getCategoryApi } from "@/api/CategoryApi";
import { useState } from "react";

interface CategoryAlias {
  alias: string;
  resolved: string;
}

interface CategoryItem {
  error: boolean;
  categories: string[];
  categoryAlias: CategoryAlias[];
  timestamp: number;
}

const useFetchCategory = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<CategoryItem>({
    error: false,
    categories: [],
    categoryAlias: [],
    timestamp: 0,
  });

  const fetchApi = async () => {
    try {
      setIsLoading(true);
      const result = await getCategoryApi();
      if (result?.status === 200) {
        const data = result?.data;

        setFetchedData(data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching category data", error);
      setIsLoading(false);
      setFetchedData({
        error: true,
        categories: [],
        categoryAlias: [],
        timestamp: 0,
      });
    }
  };

  const loadData = () => {
    fetchApi();
  };

  return {
    isLoading,
    fetchedData,
    loadData,
  };
};

export { useFetchCategory, CategoryItem };
