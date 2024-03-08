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
  Button,
} from "react-native";

import {
  NativeBaseProvider,
  Actionsheet,
  useDisclose,
  Box,
  Spinner,
} from "native-base";

import { useTranslation } from "react-i18next";
import images from "../../../../assets/images/index";
import { theme } from "../../../../theme";
import ScreensTitle from "../../../../components/ScreenTitle";
import CommonHeader from "../../../../components/CommonHeader";
import SearchResultCards from "../SearchResultCards";
import { SubTitle } from "../../../../components/Typography";
import useUserInfo from "../../../../hooks/useUserInfo";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOutStock, useOutStock } from "./queries/useOutStock";
import { showDetail } from "../../../../redux/reducers/SerchScreenReducer/Action";

interface Iprops {
  previousscreen: string;
}

function OutStock(props: any) {
  const { navigation, route } = props;
  const { t, i18n } = useTranslation();
  const [isError, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [listData, setListData] = useState([]);
  const userdata = useUserInfo();
  const [sortBy, setSortBy] = useState(1);
  const serchdata = useSelector((state) => state?.SerchScreenSort);
  const [selfLoading, SetSelfLoading] = useState(true);
  const [orderItems, setOrderItems] = useState("");
  const [nav, setNav] = useState(route?.params?.previousscreen)
  const lang = t("common:lang");
  const dispatch = useDispatch();

  const {
    isLoading,
    data: dashData,
    refetch,
  } = useOutStock({
    do: "GetOutStk",
    osname: Platform.OS === "android" ? "and" : "ios",
    userid: userdata?.userInfo?.UserId || "",
    maincat: serchdata?.categoryKey,
    subcat_1: serchdata?.detailsKey,
    subcat_2: "",
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

  const fetchMoreData = async () => {
    setTimeout(async () => {
      const pageCount = page + 1;
      try {
        const response = await fetchOutStock({
          do: "GetOutStk",
          osname: Platform.OS === "android" ? "and" : "ios",
          userid: userdata?.userInfo?.UserId || "",
          maincat: serchdata?.categoryKey,
          subcat_1: serchdata?.detailsKey,
          subcat_2: "",
          tags: serchdata?.StockKey,
          stock_no: serchdata?.StockNumber,
          listype: 1,
          associate: 0,
          sortby: sortBy,
          Current_Page: page,
          barcode: serchdata?.barcodeKey,
          size: "",
          color: "",
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
  };

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

  useEffect(() => {
    setPage(1);
  }, [sortBy]);


  useEffect(() => {
    refetch();
    setPage(1);
  }, [serchdata]);

  const handlegoback = () => {
    SetSelfLoading(true);
    navigation.goBack();
    setPage(1);
    dispatch(showDetail(0))
  };

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
          <ScreensTitle title={t("common:Out_Of_Stock")} />
          <View style={styles.subContainer}>

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
                      previousScreen={"OutStock"}
                      loading={isLoading}
                    />
                  </View>
                );
              }}
              onEndReachedThreshold={0.5}
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

export default OutStock;
