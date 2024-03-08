import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
  BackHandler,
  Text,
  Image,
} from "react-native";

import {
  NativeBaseProvider,
  Actionsheet,
  useDisclose,
  Box,
  Spinner,
} from "native-base";

import { useTranslation } from "react-i18next";
import InAppBrowser from "react-native-inappbrowser-reborn";
import images from "../../../../assets/images/index";
import { theme } from "../../../../theme";
import ScreensTitle from "../../../../components/ScreenTitle";
import CommonHeader from "../../../../components/CommonHeader";
import SearchResultCards from "../SearchResultCards";
import { SubTitle } from "../../../../components/Typography";
import ScreensButton from "../../../../components/ScreenButtom";
import useUserInfo from "../../../../hooks/useUserInfo";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchThisLocation, useThisLocation } from "./queries/useThisLocation";
import Feather from "react-native-vector-icons/Feather";
import { showDetail } from "../../../../redux/reducers/SerchScreenReducer/Action";

interface Iprops {
  previousscreen: string;
}
function Thislocation(props: any) {
  const { navigation, route } = props;
  // const { id, itempass, previousScreen } = route.params;
  const { t, i18n } = useTranslation();
  const [isError, setError] = useState(false);
  const [sortText, setSortText] = useState('newest item');
  const [page, setPage] = useState(1);
  const [listData, setListData] = useState([]);
  const userdata = useUserInfo();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [sortBy, setSortBy] = useState(1);
  const serchdata = useSelector((state) => state?.SerchScreenSort);
  const [selfLoading, SetSelfLoading] = useState(true);

  const [pageCounter, SetpageCounter] = useState(1);
  

  const [nav, setNav] = useState(route?.params?.previousscreen)
  const [orderItems, setOrderItems] = useState("");
  const lang = t("common:lang");
  const dispatch = useDispatch();

  const {
    isLoading,
    data: dashData,
    refetch,
  } = useThisLocation({
    do: "GetShortDescription",
    osname: Platform.OS === "android" ? "and" : "ios",
    userid: userdata?.userInfo?.UserId || "",
    maincat: serchdata?.categoryKey,
    subcat_1: serchdata?.subcategoryKey,
    subcat_2: serchdata?.subcategoryKey2,
    tags: serchdata?.StockKey,
    stock_no: serchdata?.StockNumber,
    listype: 1,
    associate: 0,
    sortby: 1,
    Current_Page: 0,
    barcode: serchdata?.barcodeKey,
    size:serchdata?.size,
    color:serchdata?.color,
  });

  // console.log("response>color", JSON.stringify(dashData, null, 2))

  const fetchMoreData = async () => {
    console.log("total page -->",dashData?.Total_Pages);
    console.log('page',page)
    if(page<=  dashData?.Total_Pages ){
  console.log("working-->")
    setTimeout(async () => {
      const pageCount = page + 1;
    
      try {
        const response = await fetchThisLocation({
          do: "GetShortDescription",
          osname: Platform.OS === "android" ? "and" : "ios",
          userid: userdata?.userInfo?.UserId || "",
          maincat: serchdata?.categoryKey,
          subcat_1: serchdata?.subcategoryKey,
          subcat_2: serchdata?.subcategoryKey2,
          tags: serchdata?.StockKey,
          stock_no: serchdata?.StockNumber,
          listype: 1,
          associate: 0,
          sortby: sortBy,
          Current_Page: page,
          barcode: serchdata?.barcodeKey,
          size:serchdata?.size,
          color:serchdata?.color
        });
        if (response?.ResponseMsg === "NO RESULTS - Try a different search") {
          SetSelfLoading(false);
        }
        setPage(pageCount);
        setListData([...listData, ...response?.InventoryData]);
      } catch (error) {
        setError(true);
      }
    }, 1000);
  }
  else{
    setError(true);
  }

  };

  const fetchMoreDataByFilter = async (sort: number) => {
    console.log("fetch more data by filter");
    setPage(1);
    setSortBy(sort);
    try {
      const response = await fetchThisLocation({
        do: "GetShortDescription",
        osname: Platform.OS === "android" ? "and" : "ios",
        userid: userdata?.userInfo?.UserId || "",
        maincat: serchdata?.categoryKey,
        subcat_1: serchdata?.subcategoryKey,
        subcat_2: serchdata?.subcategoryKey2,
        tags: serchdata?.StockKey,
        stock_no: serchdata?.StockNumber,
        listype: 1,
        associate: 0,
        sortby: sort,
        barcode: serchdata?.barcodeKey,
        size:serchdata?.size,
        color:serchdata?.color,
        Current_Page: 0,
      });
      setListData(response?.InventoryData);
    } catch (error) {
      setError(true);
    }
  };
  // console.log("route?.params?.previousscreen", route?.params?.previousscreen)
  // console.log("showdetail", detail)

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setPage(1);
        SetSelfLoading(true);
        dispatch(showDetail(0))
        navigation.navigate(route?.params?.previousscreen);
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  useEffect(() => {
    if (dashData && page === 1) {
      setListData(dashData?.InventoryData);
    } else if (dashData) {
      setListData(dashData?.InventoryData);
    }
  }, [dashData]);

  // console.log("card data>>", JSON.stringify(dashData?.InventoryData, null, 2))

  useEffect(() => {
    setPage(1);
  }, [sortBy]);

  useEffect(() => {
    refetch();
  }, [sortText]);

  useEffect(() => {
    refetch();
    setPage(1);
  }, [serchdata]);

  const handlegoback = () => {
    SetSelfLoading(true);
    navigation.navigate(nav);
    setPage(1);
    dispatch(showDetail(0))
  };

  // const handlegoback = () => {
  //   navigation.navigate(route?.params?.previousscreen);
  //   SetSelfLoading(true);
  //   // navigation.goBack()
  //   // navigation.navigate("SearchProduct")
  //   setPage(1);
  // };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner size={30} />
      </View>
    );
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <CommonHeader
            headerBg={images.HEADER_BG_SKY}
            goback={() => handlegoback()}
          />
          <ScreensTitle title={t("common:SEARCH_RESULT")} />

          <View style={styles.subContainer}>
            <View style={styles.block}>
              <TouchableOpacity style={styles.filterBtn} onPress={onOpen}>
                <SubTitle style={styles.filterBtnText}>
                  {sortText == 'newest item' ? t("common:Newest_Items_First") : null}
                  {sortText == 'size' ? t("common:SIZE") : null}
                  {sortText == 'color' ? t("common:COLOR") : null}
                  {sortText == 'high to low' ? t("common:PRICE_HIGH_TO_LOW") : null}
                  {sortText == 'low to high' ? t("common:PRICE_LOW_TO_HIGH") : null}
                </SubTitle>
              </TouchableOpacity>
              <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content style={styles.sheetstyle}>
                  <Box w="100%" alignItems="center">
                    <View
                      style={styles.filterSheetBtn}
                    >
                      <SubTitle style={styles.filterBtnText}>
                        {sortText == 'newest item' ? 'Sort By: ' + t("common:Newest_Items_First") : null}
                        {sortText == 'size' ? 'Sort By: ' + t("common:SIZE") : null}
                        {sortText == 'color' ? 'Sort By: ' + t("common:COLOR") : null}
                        {sortText == 'high to low' ? 'Sort By: ' + t("common:PRICE_HIGH_TO_LOW") : null}
                        {sortText == 'low to high' ? 'Sort By: ' + t("common:PRICE_LOW_TO_HIGH") : null}
                      </SubTitle>
                    </View>
                    <View style={styles.sheetblock}>

                      <TouchableOpacity
                        style={styles.filterModalBtn}
                        onPress={() => {
                          setSortText('newest item');
                          fetchMoreDataByFilter(1);
                          onClose();
                          refetch();
                        }}
                      >
                        <SubTitle style={styles.filterBtnText}>
                          {t("common:Newest_Items_First")}
                        </SubTitle>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.filterModalBtn}
                        onPress={() => {
                          setSortText("size");
                          fetchMoreDataByFilter(2);
                          onClose();
                          refetch();
                        }}
                      >
                        <SubTitle style={styles.filterBtnText}>
                          {t("common:SIZE")}
                        </SubTitle>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.filterModalBtn}
                        onPress={() => {
                          setSortText("color");
                          fetchMoreDataByFilter(3);
                          onClose();
                          refetch();
                        }}
                      >
                        <SubTitle style={styles.filterBtnText}>
                          {t("common:COLOR")}
                        </SubTitle>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.filterModalBtn}
                        onPress={() => {
                          setSortText("high to low");
                          fetchMoreDataByFilter(5);
                          onClose();
                          refetch();
                        }}
                      >
                        <SubTitle style={styles.filterBtnText}>
                          {t("common:PRICE_HIGH_TO_LOW")}
                        </SubTitle>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.filterModalBtn}
                        onPress={() => {
                          setSortText("low to high");
                          fetchMoreDataByFilter(4);
                          onClose();
                          refetch();
                        }}
                      >
                        <SubTitle style={styles.filterBtnText}>
                          {t("common:PRICE_LOW_TO_HIGH")}
                        </SubTitle>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.width90}>
                      <ScreensButton
                        bgcolor={theme.colors.red[600]}
                        btnTitle={t("common:CANCEL")}
                        iconName=""
                        onPress={onClose}
                      />
                    </View>
                  </Box>
                </Actionsheet.Content>
              </Actionsheet>

              {dashData?.sqty ? (
                <SubTitle style={styles.noOfSearch}>
                  {dashData?.sqty} {t("common:ITEMS")}
                </SubTitle>
              ) : (
                <SubTitle style={styles.noOfSearch}>
                  {dashData?.nqty} {t("common:ITEMS")}
                </SubTitle>
              )}
            </View>

            <FlatList
              data={listData && listData}
              keyboardShouldPersistTaps="always"
              renderItem={({ item, index }) => {
                return (
                  <View key={index}>
                    <SearchResultCards
                      item={item}
                      navigation={navigation}
                      refatch={refetch}
                      previousScreen={"Thislocation"}
                      loading={isLoading}
                    />
                  </View>
                );
              }}
              // onEndReachedThreshold={0.5}
              onEndReached={fetchMoreData}
              ListFooterComponent={
                listData ? (
                  !isError && <ActivityIndicator />
                ) : (
                  <View style={{ alignSelf: "center", margin: 10 }}>
                    <SubTitle>{t('common:NO_RESULT')}</SubTitle>
                  </View>
                )
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: theme.colors.appWhite[800],
  },
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 10,
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.appWhite[800],
  },
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  filterBtn: {
    width: 200,
    borderWidth: 0.5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 7,
  },
  filterBtnText: {
    fontSize: 16,
    textAlign: "center",
    color: theme.colors.black[0],
  },
  sheetblock: {
    width: "90%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: theme.colors.appWhite[100],
  },
  filterModalBtn: {
    padding: 10,
    borderBottomWidth: 0.5,
    marginBottom: 5,
  },
  filterSheetBtn: {
    padding: 10,
    marginBottom: 5,
  },
  noOfSearch: {
    fontSize: 16,
    textTransform: "capitalize",
    color: theme.colors.black[0],
  },
  sheetstyle: {
    backgroundColor: theme.colors.appWhite[800],
  },
  width90: {
    width: "90%",
  },
  loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 300,
  },
});

export default Thislocation;
function previousScreen(previousScreen: any) {
  throw new Error("Function not implemented.");
}

