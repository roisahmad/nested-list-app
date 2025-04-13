import { StyleSheet, TouchableOpacity } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { useFetchCategory } from "@/hooks/useFetchCategory";
import {
  JokesItem,
  useFetchCategoryChild,
} from "@/hooks/useFetchCategoryChild";
import Dialog from "@/components/Dialog";

const ChildComponent = ({
  data,
  loading,
  onMore,
  onShow,
}: {
  data: JokesItem[];
  loading: boolean;
  onMore: () => void;
  onShow: (child: string) => void;
}) => {
  return (
    <ThemedView>
      {loading ? (
        <ThemedView style={styles.center}>
          <ThemedText>Loading...</ThemedText>
        </ThemedView>
      ) : (
        <>
          {data?.length > 0 ? (
            <>
              {data?.map((el: JokesItem, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    paddingVertical: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ddd",
                  }}
                  onPress={() => onShow(el?.joke)}
                >
                  <ThemedText>{el?.joke}</ThemedText>
                </TouchableOpacity>
              ))}
              <ThemedView style={[styles.center, { marginTop: 16 }]}>
                <TouchableOpacity onPress={onMore}>
                  <ThemedText type="link">Add More</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </>
          ) : (
            <ThemedText>Data not found</ThemedText>
          )}
        </>
      )}
    </ThemedView>
  );
};

export default function TabTwoScreen() {
  const {
    isLoading: loadingCategoryData,
    fetchedData: categoryData,
    loadData: loadCategoryData,
  } = useFetchCategory();

  const {
    isLoading: loadingCategoryChildData,
    fetchedData: categoryChildData,
    dataList: categoryChild,
    loadData: loadCategoryChildData,
  } = useFetchCategoryChild();

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [categoryChildList, setCategoryChildList] = useState<JokesItem[]>([]);

  const [childType, setChildType] = useState<string>("single");
  const [childAmount, setChildAmount] = useState<number>(5);

  const [showChild, setShowChild] = useState<boolean>(false);
  const [selectedChild, setSelectedChild] = useState<string>("");

  useEffect(() => {
    loadCategoryData();
  }, []);

  useEffect(() => {
    if (categoryData?.categories) {
      setCategoryList(categoryData.categories);
    }
  }, [categoryData]);

  useEffect(() => {
    if (categoryChildData?.jokes) {
      setCategoryChildList(categoryChild);
    }
  }, [categoryChildData]);

  const handleOpenChild = async (category: string, index: number) => {
    loadCategoryChildData(category, { type: childType, amount: childAmount });
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleAddMoreChild = async (category: string) => {
    loadCategoryChildData(category, {
      type: childType,
      amount: childAmount,
    });
  };

  const handleShowChild = (child: string) => {
    {
      setShowChild(true);
      setSelectedChild(child);
    }
  };

  const handleMoveToTop = (index: number) => {
    setCategoryList((prevList) => {
      const newList = [...prevList];
      const [selected] = newList.splice(index, 1);
      newList.unshift(selected);
      return newList;
    });
  };

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D84040", dark: "#A31D1D" }}
        headerImage={
          <ThemedText lightColor="#fff" darkColor="#fff" type="subtitle">
            Nested List
          </ThemedText>
        }
      >
        {loadingCategoryData ? (
          <ThemedView style={styles.center}>
            <ThemedText>Loading...</ThemedText>
          </ThemedView>
        ) : (
          <>
            {categoryList?.length > 0 ? (
              <>
                {categoryList.map((el: string, index: number) => (
                  <Collapsible
                    title={el}
                    key={el}
                    top={index === 0}
                    isOpen={openIndex === index}
                    onClick={() => handleOpenChild(el, index)}
                    onMove={() => handleMoveToTop(index)}
                  >
                    <ChildComponent
                      data={categoryChildList}
                      loading={loadingCategoryChildData}
                      onShow={handleShowChild}
                      onMore={() => handleAddMoreChild(el)}
                    />
                  </Collapsible>
                ))}
              </>
            ) : (
              <ThemedText>Data not found</ThemedText>
            )}
          </>
        )}

        <Dialog open={showChild} onClose={() => setShowChild(false)}>
          <ThemedText>{selectedChild}</ThemedText>
        </Dialog>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
