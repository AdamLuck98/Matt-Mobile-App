import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Button,
  BackHandler
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTranslation } from "react-i18next";
import { theme } from "../../theme";
import images from "../../assets/images/index";
import CommonHeader from "../../components/CommonHeader";
import ScreensButton from "../../components/ScreenButtom";
import { Caption, SubTitle, Title } from "../../components/Typography";
import { fetchUserData, useOrderData } from "./Queries/useOrderData";
import useUserInfo from "../../hooks/useUserInfo";
import OrderList from "./Component/OrderList";
import { Spinner } from "native-base";
import NoData from "./Component/NoData";
import { FONT_GOOGLE_BARLOW_SEMIBOLD } from "../../constants/fonts";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import { useDispatch } from "react-redux";
import { FefatchorderAction } from "../../redux/reducers/Fefatchorder/Action";
import { useSelector } from 'react-redux';
import { useQueryClient } from "react-query";
import { QueryKeys } from "../../utils/QueryKeys";
import { useFocusEffect } from "@react-navigation/native";
import OrderSearchCard from "./Component/OrderSearchCard";


function OrdersList(props: any) {
  const { navigation } = props;
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [listData, setListData] = useState([]);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState(1);
  const [lastsort, setlastsort] = useState(1);
  const [sortSerch, setSortSerch] = useState("");
  const [serchKey, setSerchKey] = useState("");
  const [isError, setError] = useState(false);
  const [filterByName, setfilterByName] = useState("Waiting");
  const [activeWait, setActiveWait] = useState(true);
  const [activeProgress, setActiveProgress] = useState(false);
  const [activeReady, setActiveReady] = useState(false);
  const [activeClose, setActiveClose] = useState(false);
  const [searched, setSearched] = useState(false);
  const refatchorder = useSelector((state) => state?.FefatchorderReducer)
  const userdata = useUserInfo();
  const lang = t("common:lang");
  const flatlistRef = useRef<FlatList>(null);
  const queryClient = useQueryClient()

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.goBack();
        setSerchKey("");
        dispatch(FefatchorderAction(true));
        // queryClient.removeQueries([QueryKeys.orderScreen])
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  function handleWaiting() {
    setActiveWait(true);
    setActiveProgress(false);
    setActiveReady(false);
    setActiveClose(false);
  }

  function handleProgress() {
    setActiveWait(false);
    setActiveProgress(true);
    setActiveReady(false);
    setActiveClose(false);
  }

  function handleReady() {
    setActiveWait(false);
    setActiveProgress(false);
    setActiveReady(true);
    setActiveClose(false);
  }

  function handleClose() {
    setActiveWait(false);
    setActiveProgress(false);
    setActiveReady(false);
    setActiveClose(true);
  }

  const handlePrintRecipt = () => {
    let ordernumber = listData?.map((ordr: any) => {
      return ordr.order_number
    });
    const idorder = ordernumber?.toString()
    if (lang === "English") {
      InAppBrowser.open("https://" +
        userdata?.userInfo?.UserName +
        ".kizbin.com/buyers/print_sreceipt.php?cmd=print&order_number=" +
        idorder +
        "&lang=en",
        {
          dismissButtonStyle: "cancel",
          preferredBarTintColor: "#453AA4",
          preferredControlTintColor: "white",
          readerMode: false,
          animated: true,
          modalPresentationStyle: "overFullScreen",
          modalTransitionStyle: "coverVertical",
          modalEnabled: true,
          enableBarCollapsing: true,
          showTitle: false,
          toolbarColor: "transparent",
          secondaryToolbarColor: "black",
          navigationBarColor: "black",
          navigationBarDividerColor: "white",
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          animations: {
            startEnter: "slide_in_right",
            startExit: "slide_out_left",
            endEnter: "slide_in_left",
            endExit: "slide_out_right",
          },
        }
      );
    }
    else {
      InAppBrowser.open("https://" +
        userdata?.userInfo?.UserName +
        ".kizbin.com/seller/print_sreceipt.php?cmd=print&order_number=" +
        idorder +
        "&lang=es",
        {
          dismissButtonStyle: "cancel",
          preferredBarTintColor: "#453AA4",
          preferredControlTintColor: "white",
          readerMode: false,
          animated: true,
          modalPresentationStyle: "overFullScreen",
          modalTransitionStyle: "coverVertical",
          modalEnabled: true,
          enableBarCollapsing: true,
          showTitle: false,
          toolbarColor: "transparent",
          secondaryToolbarColor: "black",
          navigationBarColor: "black",
          navigationBarDividerColor: "white",
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          animations: {
            startEnter: "slide_in_right",
            startExit: "slide_out_left",
            endEnter: "slide_in_left",
            endExit: "slide_out_right",
          },
        }
      );
    }
  }

  const fetchMoreData = async () => {
    console.log("more order called");
    setTimeout(async () => {
      // console.log("api called");
      const pageCount = page + 1;
      try {
        const response = await fetchUserData({
          do: "GetOrders",
          userid: userdata?.userInfo?.UserId || "",
          Current_Page: pageCount,
          showstat: sortBy,
          search: sortSerch,
        });
        setPage(pageCount);
        // console.log("order data more>>>>", JSON.stringify(response, null, 2))

        setListData([...listData, ...response?.InventoryData]);
        // console.log("page no>>>", page);
      } catch (error) {
        setError(true);
      }
    }, 500);
  };

  const fetchMoreDataByFilter = async (sort: number) => {
    setSortBy(sort);
    // setPage(0)
    setSerchKey('')
    try {
      const data = {
        do: "GetOrders",
        userid: userdata?.userInfo?.UserId || "",
        showstat: sort,
        search: "",
        Current_Page: 0,
      };
      const response = await fetchUserData(data);
      setListData(response?.InventoryData);
    } catch (error) {
      setError(true);
    }
  };
  const fetchMoreDataBySerch = async (serch: string) => {
    console.log("search called")
    setSortSerch(serch);
    setPage(0)
    try {
      const data = {
        do: "GetOrders",
        userid: userdata?.userInfo?.UserId || "",
        showstat: lastsort,
        search: serch,
        Current_Page: 0,
      };
      console.log("search request>>", JSON.stringify(data, null, 2));

      const response = await fetchUserData(data);
      console.log("search response>>", JSON.stringify(response, null, 2));
      if (response?.ResponseCode == "1") {
        setSearched(true);
      }
      setListData(response?.InventoryData);
      setLength(response?.InventoryData.length);
    } catch (error) {
      setError(true);
    }
  };
  // console.log("search response>>", JSON.stringify(listData, null, 2))

  const data = {
    do: "GetOrders",
    userid: userdata?.userInfo?.UserId || "",
    Current_Page: 0,
    showstat: sortBy,
    search: "",
  };

  const {
    isLoading,
    data: OrderData,
    isError: orderError,
    refetch,
  } = useOrderData(data);

  // console.log("order data without hook>>", JSON.stringify(OrderData), "called")
  const [length, setLength] = useState(OrderData?.stat_wait);

  useEffect(() => {
    if (OrderData && page === 1) {
      setListData(OrderData?.InventoryData);
    } else if (OrderData) {
      setListData(OrderData?.InventoryData);
      setLength(OrderData?.stat_wait);
    }
  }, [OrderData]);



  const handlegoback = () => {
    navigation.goBack();
    setSerchKey("");
    dispatch(FefatchorderAction(true));
    // queryClient.removeQueries([QueryKeys.orderScreen])
  }

  const scrollToIndex = () => {
    if (listData != undefined) {
      let index = 0;
      flatlistRef.current?.scrollToIndex({ index: index });
    }
  };

  const handleWaitOrder = () => {
    handleWaiting();
    fetchMoreDataByFilter(1);
    setlastsort(1)
    setfilterByName("Waiting");
    setSearched(false)
  }

  const handleProgressOrder = () => {
    handleProgress();
    fetchMoreDataByFilter(2);
    setlastsort(2)
    setfilterByName("In Progress");
    setSearched(false)
  }

  const handleReadyOrder = () => {
    handleReady();
    fetchMoreDataByFilter(5);
    setlastsort(5)
    setfilterByName("Ready");
    setSearched(false)
  }

  const handleClosedOrder = () => {
    handleClose();
    fetchMoreDataByFilter(3);
    setlastsort(3)
    setfilterByName("Closed");
    setSearched(false)
  }

  useEffect(() => {
    if (filterByName === 'Waiting') {
      handleWaitOrder();
    } else if (filterByName === 'In Progress') {
      handleProgressOrder();
    } else if (filterByName === 'Ready') {
      handleReadyOrder();
    } else if (filterByName === 'Closed') {
      handleClosedOrder();
    }
  }, [filterByName])

  useEffect(() => {
    if (refatchorder === true) {
      fetchMoreDataByFilter(lastsort);
    }
    dispatch(FefatchorderAction(false))

  }, [refatchorder])

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader headerBg={images.HEADER_BG_YELLOW} goback={() => handlegoback()} />
      <View style={styles.orderTypeBox}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.orderTypeBtn,
            {
              backgroundColor: activeWait
                ? theme.colors.appWhite[800]
                : theme.colors.appWhite[100],
            },
          ]}
          onPress={() => {
            handleWaitOrder();
            scrollToIndex();
            if (listData != undefined) {
              setLength(OrderData?.stat_wait)
            }
            setPage(0);
          }}
        >
          <View
            style={[
              styles.NumOfOrder,
              { backgroundColor: theme.colors.primary[500] },
            ]}
          >
            {isLoading ? <Spinner size={20} color={theme.colors.appWhite[100]} /> : <Caption style={styles.orderTypeBtnText}>{OrderData?.stat_wait ? OrderData?.stat_wait : 0}</Caption>}
          </View>
          <SubTitle style={styles.orderTypeText}>
            {t("common:WAITING")}
          </SubTitle>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.orderTypeBtn,
            {
              backgroundColor: activeProgress
                ? theme.colors.appWhite[800]
                : theme.colors.appWhite[100],
            },
          ]}
          onPress={() => {
            handleProgressOrder();
            scrollToIndex()
            if (listData != undefined) {
              setLength(OrderData?.stat_process)
            }
            setPage(0);
          }}
        >
          <View
            style={[
              styles.NumOfOrder,
              { backgroundColor: theme.colors.yellow[400] },
            ]}
          >
            {isLoading ? <Spinner size={20} color={theme.colors.appWhite[100]} /> : <Caption style={styles.orderTypeBtnText}>{OrderData?.stat_process ? OrderData?.stat_process : 0}</Caption>}
          </View>
          <SubTitle style={styles.orderTypeText}>
            {t("common:IN_PROGRESS")}
          </SubTitle>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.orderTypeBtn,
            {
              backgroundColor: activeReady
                ? theme.colors.appWhite[800]
                : theme.colors.appWhite[100],
            },
          ]}
          onPress={() => {
            handleReadyOrder();
            scrollToIndex()
            if (listData != undefined) {
              setLength(OrderData?.stat_ready)
            }
            setPage(0);
          }}
        >
          <View
            style={[
              styles.NumOfOrder,
              { backgroundColor: theme.colors.green[400] },
            ]}
          >
            {isLoading ? <Spinner size={20} color={theme.colors.appWhite[100]} /> : <Caption style={styles.orderTypeBtnText}>{OrderData?.stat_ready ? OrderData?.stat_ready : 0}</Caption>}
          </View>
          <SubTitle style={styles.orderTypeText}>{t("common:READY")}</SubTitle>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          style={[
            styles.orderTypeBtn,
            {
              backgroundColor: activeClose
                ? theme.colors.appWhite[800]
                : theme.colors.appWhite[100],
            },
          ]}
          onPress={() => {
            handleClosedOrder();
            scrollToIndex();
            if (listData != undefined) {
              setLength(OrderData?.stat_closed)
            }
            setPage(0);
          }}
        >
          <View
            style={[
              styles.NumOfOrder,
              { backgroundColor: theme.colors.red[900] },
            ]}
          >
            {isLoading ? <Spinner size={20} color={theme.colors.appWhite[100]} /> : <Caption style={styles.orderTypeBtnText}>{OrderData?.stat_closed ? OrderData?.stat_closed : 0}</Caption>}
          </View>
          <SubTitle style={styles.orderTypeText}>{t("common:CLOSED")}</SubTitle>
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.input}
            value={serchKey}
            onFocus={() => setSerchKey('')}
            placeholder={t("common:serach_order")}
            placeholderTextColor={theme.colors.gray[300]}
            onChangeText={(text) => {
              setSerchKey(text);
            }}
          />
          <View style={styles.searchicon}>
            <TouchableOpacity
              onPress={() => {
                fetchMoreDataBySerch(serchKey);
              }}
            >
              <AntDesign
                name="search1"
                color={theme.colors.black[0]}
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>

        {isLoading ? <View style={styles.loadingcontainer}>
          <Spinner size={30} />
        </View> :
          <FlatList
            data={listData && listData}
            renderItem={({ item, index }) => {
              return (
                <View key={index}>
                  {searched ? <OrderSearchCard renderItem={item} filterName={filterByName} refetch={refetch} resetSearch={setSerchKey} /> :
                    <OrderList renderItem={item} filterName={filterByName} refetch={refetch} resetSearch={setSerchKey} />}
                </View>
              );
            }}
            ref={flatlistRef}
            onEndReached={fetchMoreData}
            ListFooterComponent={
              // listData ? !isError ? <ActivityIndicator /> : null : <NoData />
              listData ? listData.length != length ? <ActivityIndicator /> : null : <NoData />
            }
          />
        }

      </View>

      {OrderData == undefined ? null :
        <View style={styles.printBtn}>
          <ScreensButton
            btnTitle={t("common:PRINT_RECEIPT")}
            bgcolor={theme.colors.black[0]}
            iconName={""}
            onPress={handlePrintRecipt}
          />
        </View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderTypeBox: {
    backgroundColor: theme.colors.appWhite[100],
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  NumOfOrder: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 360,
  },
  orderTypeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '25%',
  },
  orderTypeBtnText: {
    color: theme.colors.appWhite[100]
  },
  orderTypeText: {
    marginTop: 5,
    fontSize: 11,
    textAlign: 'center',
    textTransform: 'capitalize'
  },
  subContainer: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 10,
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.appWhite[800],
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.appWhite[100]
  },
  input: {
    height: 40,
    flex: 10,
    fontFamily: FONT_GOOGLE_BARLOW_SEMIBOLD
  },
  searchicon: {
    flex: 2,
    alignItems: 'center',
  },
  order: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    elevation: 5,
    backgroundColor: theme.colors.appWhite[100]
  },
  leftContent: {
    paddingLeft: 10,
    paddingVertical: 10,
    width: '55%',
  },
  rightContent: {
    paddingRight: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '45%',

  },
  dateTimebox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%'
  },
  datetime: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primary[500]
  },
  orderNoPickup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  orderNo: {
    fontSize: 12,
    backgroundColor: theme.colors.black[0],
    color: '#fff',
    fontWeight: '500',
    borderRadius: 10,
    paddingVertical: 5,
    textAlign: 'center',
    width: '65%',
  },
  pickup: {
    textTransform: 'capitalize',
    color: theme.colors.black[0],
    fontSize: 15,
    fontWeight: '600'
  },
  orderStatus: {
    fontSize: 12,
    backgroundColor: theme.colors.primary[500],
    color: '#fff',
    fontWeight: '500',
    borderRadius: 10,
    paddingVertical: 5,
    textAlign: 'center',
    width: '65%',
    marginVertical: 5,
    textTransform: 'capitalize'
  },
  printBtn: {
    paddingVertical: 5,
    backgroundColor: theme.colors.black[0]
  },
  loadingcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

});
export default OrdersList;
