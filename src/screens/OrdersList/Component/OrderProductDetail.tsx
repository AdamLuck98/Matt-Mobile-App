import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Image,
  Linking,
  BackHandler,
  Modal,
  Button,
  Platform,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import CommonHeader from "../../../components/CommonHeader";
import images from "../../../assets/images";
import { theme } from "../../../theme";
import ScreensButton from "../../../components/ScreenButtom";
import useUserInfo from "../../../hooks/useUserInfo";
import useOderMoreData from "../Queries/useOderMoreData";
import {
  Actionsheet,
  Divider,
  ScrollView,
  Spinner,
  useDisclose,
} from "native-base";
import { Caption, SubTitle } from "../../../components/Typography";
import { useTranslation } from "react-i18next";
import setOrderOprations from "../Queries/setOrderOprations";
import { useFocusEffect } from "@react-navigation/native";
import { useQueryClient } from "react-query";
import { QueryKeys } from "../../../utils/QueryKeys";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { FefatchorderAction } from "../../../redux/reducers/Fefatchorder/Action";
import { useDispatch } from "react-redux";

function OrderProductDetail(props: any) {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("OrdersList");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const { navigation, route } = props;
  const userdata = useUserInfo();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [status, setStatus] = useState("");
  const [statusorder, setStatusOrder] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [orderType, setOrderType] = useState("");
  const { t, i18n } = useTranslation();
  const { setOrder } = setOrderOprations();
  const lang = t("common:lang");
  const queryClient = useQueryClient();
  const dispatch = useDispatch()
  const handleSetOrderOprations = async (sortorder: any) => {
    const addpropductData: any = {
      R_userid: userdata?.userInfo?.UserId,
      R_order_number: route?.params?.orderDetails?.order_number,
      R_order_status: sortorder,
    };
    const response: any = await setOrder(addpropductData);
    if (response.ResponseMsg === 'Record Updated') {
      setModalVisible(true)
      dispatch(FefatchorderAction(true))

    }
    // queryClient.invalidateQueries([QueryKeys.orderScreen])
  };

  const {
    isLoading,
    data: OrderData,
    isError: orderError,
    refetch
  } = useOderMoreData({
    do: "GetOrderInfo",
    userid: userdata?.userInfo?.UserId,
    order_number: route?.params?.orderDetails?.order_number,
  });

  const [orderInfo, setOrderInfo] = useState(OrderData ? OrderData?.OrdersInfo : []);


  useEffect(() => {
    refetch()
  }, [route?.params?.orderDetails?.order_number])

  useEffect(() => {
    setOrderInfo(OrderData?.OrdersInfo ? OrderData?.OrdersInfo : undefined);
  }, [OrderData?.OrdersInfo])

  // console.log("api order detail>>>", JSON.stringify(OrderData, null, 2));
  // console.log("api state order detail>>>", JSON.stringify(orderInfo, null, 2));


  useEffect(() => {
    if (route?.params?.orderDetails?.order_status == "1") {
      setStatus(t("common:WAITING"));
      setStatusOrder("w");
    } else if (route?.params?.orderDetails?.order_status == "2") {
      setStatus(t("common:IN_PROGRESS"));
      setStatusOrder("p");
    } else if (route?.params?.orderDetails?.order_status == "3") {
      setStatus(t("common:CLOSED"));
      setStatusOrder("c");
    } else if (route?.params?.orderDetails?.order_status == "5") {
      setStatus(t("common:READY"));
      setStatusOrder("r");
    }
  }, [route?.params?.orderDetails]);

  useEffect(() => {
    if (route?.params?.orderDetails?.order_type == "1") {
      setOrderType("pickup");
    } else if (route?.params?.orderDetails?.order_type == "2") {
      setOrderType("delivery");
    } else if (route?.params?.orderDetails?.order_type == "3") {
      setOrderType("dine-In");
    }
  }, [route?.params?.orderDetails?.order_type]);

  const numberapi = route?.params?.orderDetails?.phone;
  const urlnumber = "tel:";
  const numberToDailer = urlnumber + numberapi;
  const urlmassege = "sms:";
  const numberTomasssge = urlmassege + numberapi;

  const imgHttp = "https://kizbin.com/images_kiz/";
  const userIdName = userdata?.userInfo?.UserName;
  // const rowApiData = OrderData ? OrderData?.OrdersInfo : "";
  // const apiData = Object.assign({}, ...rowApiData);
  // let imgpath = apiData?.image_1;
  const mappHttps = "https://www.google.com/maps/place/";
  // const mappHttps = "https://www.google.com/maps/place/5+Puebla,+Mazatlan,+Sinaloa";

  const userAddress = route?.params?.orderDetails?.address
    ? route?.params?.orderDetails?.address
    : "";
  const userCity = route?.params?.orderDetails?.city ? route?.params?.orderDetails?.city : "";
  const userState = route?.params?.orderDetails?.state ? route?.params?.orderDetails?.state : "";
  const userCountry = route?.params?.orderDetails?.country ? route?.params?.orderDetails?.country : "";
  const userZipCode = route?.params?.orderDetails?.zip_postal ? route?.params?.orderDetails?.zip_postal : "";
  const userFullAddress = userAddress + " " + userCity + " " + userState + " " + userCountry + " " + userZipCode;

  const handleMap = Platform.OS === "ios" ? `maps:0,0?q=${userFullAddress}` : `geo:0,0?q=${userFullAddress}`;

  const handlePrintRecipt = () => {
    if (lang === "English")
      InAppBrowser.open("https://" +
        userdata?.userInfo?.UserName +
        ".kizbin.com/buyers/print_sreceipt.php?cmd=print&order_number=" +
        route?.params?.orderDetails?.order_number +
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

    else {
      InAppBrowser.open("https://" +
        userdata?.userInfo?.UserName +
        ".kizbin.com/buyers/print_sreceipt.php?cmd=print&order_number=" +
        route?.params?.orderDetails?.order_number +
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

  const handlewait = () => {
    setStatus(t("common:WAITING"));
    onClose();
    handleSetOrderOprations(1);
    setStatusOrder("w");
  };

  const handleProgress = () => {
    setStatus(t("common:IN_PROGRESS"));
    onClose();
    handleSetOrderOprations(2);
    setStatusOrder("p");
  };

  const handleReady = () => {
    setStatus(t("common:READY"));
    setStatusOrder("r");
    onClose();
    handleSetOrderOprations(5);
  };

  console.log("handleReady",handleReady)


  const handleClose = () => {
    setStatus(t("common:CLOSED"));
    setStatusOrder("c");
    onClose();
    handleSetOrderOprations(3);
  };

  const handleDelete = () => {
    setStatus(t("common:DELET_THIS_ORDER"));
    onClose();
    handleSetOrderOprations(0);
  };

  const handlegoback = () => {
    navigation.navigate("OrdersList");
  };

  if (isLoading) {
    return (
      <View style={styles.loadingcontainer}>
        <Spinner size={30} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader
        headerBg={images.HEADER_BG_YELLOW}
        goback={() => handlegoback()}
      />
      {/* <Button title='click' onPress={() => console.log('filter>>', route.params.filteringName)} /> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalBorder}>
              <SubTitle style={styles.modalText}>{t('common:SUCCESS')}</SubTitle>
            </View>
            <View style={styles.modalBorder}>
              <Caption style={styles.textStyle}>{t('common:RECORD_UPDATED')}</Caption>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate("OrdersList");
                dispatch(FefatchorderAction(true));
              }}
            >
              <SubTitle style={[styles.textStyle, styles.btnText]}>
                ok
              </SubTitle>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.subContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, paddingTop: 10, paddingBottom: 50 }}>
            <ImageBackground
              source={images.ORDER_BG}
              resizeMode="stretch"
              style={styles.card}
            >
              <View style={[styles.block, { alignItems: "center" }]}>
                <SubTitle style={styles.orderNum}>
                  {orderType} #{route?.params?.orderDetails?.order_number}
                </SubTitle>

                {statusorder == "w" ? (
                  <TouchableOpacity
                    style={[
                      styles.orderStatus,
                      { backgroundColor: theme.colors.primary[500] },
                    ]}
                    onPress={onOpen}
                  >
                    <SubTitle style={styles.btntext}>{status}</SubTitle>
                  </TouchableOpacity>
                ) : null}
                {statusorder == "p" ? (
                  <TouchableOpacity
                    style={[
                      styles.orderStatus,
                      { backgroundColor: theme.colors.yellow[400] },
                    ]}
                    onPress={onOpen}
                  >
                    <SubTitle style={styles.btntext}>{status}</SubTitle>
                  </TouchableOpacity>
                ) : null}

                {statusorder == "r" ? (
                  <TouchableOpacity
                    style={[
                      styles.orderStatus,
                      { backgroundColor: theme.colors.green[400] },
                    ]}
                    onPress={onOpen}
                  >
                    <SubTitle style={styles.btntext}>{status}</SubTitle>
                  </TouchableOpacity>
                ) : null}

                {statusorder == "c" ? (
                  <TouchableOpacity
                    style={[
                      styles.orderStatus,
                      { backgroundColor: theme.colors.red[900] },
                    ]}
                    onPress={onOpen}
                  >
                    <SubTitle style={styles.btntext}>{status}</SubTitle>
                  </TouchableOpacity>
                ) : null}

                <Actionsheet isOpen={isOpen} onClose={onClose}>
                  <Actionsheet.Content style={styles.sheetstyle}>
                    <View style={styles.space} />
                    <Divider my={1} />
                    <TouchableOpacity
                      style={styles.w100}
                      onPress={() => handlewait()}
                    >
                      <SubTitle style={styles.modalbtntext}>
                        {t("common:WAITING")}
                      </SubTitle>
                    </TouchableOpacity>
                    <View style={styles.space} />
                    <Divider my={1} />
                    <TouchableOpacity
                      style={styles.w100}
                      onPress={() => handleProgress()}
                    >
                      <SubTitle style={styles.modalbtntext}>
                        {t("common:IN_PROGRESS")}
                      </SubTitle>
                    </TouchableOpacity>
                    <View style={styles.space} />
                    <Divider my={1} />
                    <TouchableOpacity
                      style={styles.w100}
                      onPress={() => handleReady()}
                    >
                      <SubTitle style={styles.modalbtntext}>
                        {t("common:READY")}
                      </SubTitle>
                    </TouchableOpacity>
                    <View style={styles.space} />
                    <Divider my={1} />
                    <TouchableOpacity
                      style={styles.w100}
                      onPress={() => handleClose()}
                    >
                      <SubTitle style={styles.modalbtntext}>
                        {t("common:CLOSED")}
                      </SubTitle>
                    </TouchableOpacity>
                    <View style={styles.space} />
                    <Divider my={1} />
                    <TouchableOpacity
                      style={styles.w100}
                      onPress={() => handleDelete()}
                    >
                      <SubTitle style={styles.modalbtntext}>
                        {t("common:DELET_THIS_ORDER")}
                      </SubTitle>
                    </TouchableOpacity>
                    <View style={styles.space} />
                    <ScreensButton
                      btnTitle={t("common:CANCEL")}
                      bgcolor={theme.colors.primary[500]}
                      iconName=""
                      onPress={onClose}
                    />
                  </Actionsheet.Content>
                </Actionsheet>
              </View>
              <View style={styles.block}>
                <View style={styles.nameTotalPhone}>
                  <SubTitle style={styles.label}>{t("common:name")}</SubTitle>
                  <SubTitle style={styles.value}>
                    {route?.params?.orderDetails?.contactname}
                  </SubTitle>
                </View>
              </View>
              <View style={[styles.block, { alignItems: "flex-start" }]}>
                <View style={styles.nameTotalPhone}>
                  <SubTitle style={styles.label}>
                    {t("common:order_value")}
                  </SubTitle>
                  <SubTitle style={styles.value}>
                    ${route?.params?.orderDetails?.order_value}
                  </SubTitle>
                </View>
                <View style={styles.time}>
                  <SubTitle style={styles.label}>{t("common:time")}</SubTitle>
                  <SubTitle style={styles.value}>
                    {route?.params?.orderDetails?.dlvrytime}
                  </SubTitle>
                </View>
              </View>
              <View style={[styles.block, { alignItems: "center" }]}>
                <View style={styles.nameTotalPhone}>
                  <SubTitle style={styles.label}>{t("common:phone")}</SubTitle>
                  <SubTitle style={styles.value}>
                    {route?.params?.orderDetails?.phone}
                  </SubTitle>
                </View>
                <View style={styles.iconBox}>
                  <View style={styles.icon}>
                    <FontAwesome
                      name="phone"
                      color={theme.colors.appWhite[100]}
                      size={20}
                      onPress={() => {
                        Linking.openURL(numberToDailer);
                      }}
                    />
                  </View>
                  <View style={styles.icon}>
                    <Ionicons
                      name="chatbox"
                      color={theme.colors.appWhite[100]}
                      size={18}
                      onPress={() => {
                        Linking.openURL(numberTomasssge);
                      }}
                    />
                  </View>
                </View>
              </View>

              {orderType == "delivery" ? (
                <View style={styles.addressblock}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <View style={styles.nameTotalPhone}>
                      <SubTitle style={styles.label}>
                        {t("common:Address")}
                      </SubTitle>
                    </View>
                    <View style={styles.address}>
                      <Caption style={styles.addressValue}>
                        {route?.params?.orderDetails?.address}
                      </Caption>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <View style={styles.nameTotalPhone}>
                      <SubTitle style={styles.label}>
                        {t("common:City")}
                      </SubTitle>
                    </View>
                    <View style={styles.address}>
                      <Caption style={styles.addressValue}>
                        {route?.params?.orderDetails?.city}
                      </Caption>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <View style={styles.nameTotalPhone}>
                      <SubTitle style={styles.label}>
                        {t("common:State_Prov")}
                      </SubTitle>
                    </View>
                    <View style={styles.address}>
                      <Caption style={styles.addressValue}>
                        {route?.params?.orderDetails?.state}
                      </Caption>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <View style={styles.nameTotalPhone}>
                      <SubTitle style={styles.label}>
                        {t("common:Zip_Postal")}
                      </SubTitle>
                    </View>
                    <View style={styles.address}>
                      <Caption style={styles.addressValue}>
                        {route?.params?.orderDetails?.zip_postal}
                      </Caption>
                    </View>
                  </View>

                  <View style={styles.customerNotesblock}>
                    <View style={styles.notes}>
                      <SubTitle
                        style={[
                          styles.label,
                          { color: theme.colors.appWhite[100] },
                        ]}
                      >
                        {t("common:Customer_Notes")}
                      </SubTitle>
                      <Caption
                        style={[
                          styles.addressValue,
                          { color: theme.colors.appWhite[100] },
                        ]}
                      >
                        {route?.params?.orderDetails?.messages}
                      </Caption>
                    </View>
                  </View>
                </View>
              ) : null}

              {orderType == "delivery" ? (
                <ScreensButton
                  btnTitle={t("common:View_In_Maps")}
                  onPress={() => Linking.openURL(handleMap)}
                  bgcolor={theme.colors.gray[800]}
                  iconName={""}
                />
              ) : null}
            </ImageBackground>

            {orderInfo == undefined ? null :
              orderInfo.map((item: any, index: number) => {
                return (
                  <ImageBackground
                    key={index}
                    source={images.ORDER_BG}
                    resizeMode="stretch"
                    style={[styles.card, styles.paddingupdown]}
                  >
                    <View style={styles.orderDetail}>
                      <View style={styles.imgBox}>
                        <Image
                          source={item?.image_1 ? { uri: item.image_1 } : images.LOGO}
                          resizeMode="contain"
                          style={styles.img}
                        />
                      </View>
                      <View style={styles.detailContent}>
                        <SubTitle style={styles.orderName}>
                          {item?.prodtitle}
                        </SubTitle>
                        <Caption style={styles.orderSubname}>
                          {item?.qty} {t("common:in_stocks")} |
                        </Caption>
                      </View>
                    </View>
                    <View style={styles.moredetailbox}>
                      <View style={styles.moredetail}>
                        <SubTitle style={styles.moredetailText}>
                          {t("common:orders")}
                        </SubTitle>
                        <Caption style={styles.moredetailText}>
                          {item?.qty}
                        </Caption>
                      </View>
                      <View style={styles.moredetail}>
                        <SubTitle style={styles.moredetailText}>
                          {t("common:stock_no")}
                        </SubTitle>
                        <Caption style={styles.moredetailText}>
                          {item?.barcode}
                        </Caption>
                      </View>
                      <View style={styles.moredetail}>
                        <SubTitle style={styles.moredetailText}>
                          {t("common:color")}
                        </SubTitle>
                        <Caption style={styles.moredetailText}>
                          {item?.color}
                        </Caption>
                      </View>
                      <View style={styles.moredetail}>
                        <SubTitle style={styles.moredetailText}>
                          {t("common:size")}
                        </SubTitle>
                        <Caption style={styles.moredetailText}>
                          {item?.size}
                        </Caption>
                      </View>
                    </View>
                    {/* {apiData?.itemnote ? (
                      <View
                        style={{
                          backgroundColor: theme.colors.primary[200],
                          marginTop: 7,
                          marginHorizontal: 10,
                          padding: 7,
                          borderRadius: 5,
                        }}
                      >
                        <View style={styles.notes}>
                          <SubTitle
                            style={[
                              styles.addressValue,
                              { color: theme.colors.appWhite[100] },
                            ]}
                          >
                            {apiData?.itemnote}
                          </SubTitle>
                        </View>
                      </View>
                    ) : null} */}
                  </ImageBackground>
                )
              })
            }

          </View>
        </ScrollView>
      </View>
      <View style={styles.printBtn}>
        <ScreensButton
          btnTitle={t("common:PRINT_RECEIPT")}
          bgcolor={theme.colors.black[0]}
          iconName={""}
          onPress={() => handlePrintRecipt()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.appWhite[100],
  },
  subContainer: {
    flex: 1,
    padding: 15,
  },
  card: {
    width: "100%",
    resizeMode: "contain",
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderWidth: 0.1,
  },
  paddingupdown: {
    paddingTop: 30,
    paddingBottom: 15,
  },
  block: {
    borderWidth: 0.3,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 7,
    marginHorizontal: 12,
    padding: 10,
    backgroundColor: theme.colors.appWhite[100],
  },
  orderNum: {
    fontSize: 18,
    textTransform: "capitalize",
    color: theme.colors.black[0],
  },
  orderStatus: {
    borderRadius: 20,
    fontSize: 12,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
  },
  nameTotalPhone: {
    width: "60%",
  },
  time: {
    width: "40%",
  },
  label: {
    fontSize: 18,
    textTransform: "capitalize",
    color: theme.colors.black[0],
  },
  value: {
    fontSize: 16,
    color: theme.colors.primary[300],
  },
  iconBox: {
    flexDirection: "row",
    width: "40%",
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 360,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: theme.colors.primary[200],
  },
  orderDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  imgBox: {
    flex: 3,
  },
  img: {
    width: 60,
    height: 60,
  },
  detailContent: {
    flex: 9,
  },
  orderName: {
    fontSize: 16,
    color: theme.colors.black[0],
  },
  orderSubname: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: theme.colors.primary[300],
  },
  moredetailbox: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  moredetail: {
    flex: 3,
    paddingHorizontal: 10,
    borderRightWidth: 0.5,
  },
  moredetailText: {
    textTransform: "capitalize",
    fontWeight: "500",
    color: theme.colors.black[0],
  },
  printBtn: {
    width: "100%",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: theme.colors.black[0],
    position: "absolute",
    bottom: 0,
    borderWidth: 1,
  },
  btntext: {
    textTransform: "capitalize",
    color: theme.colors.appWhite[100],
  },
  sheetstyle: {
    backgroundColor: theme.colors.appWhite[800],
  },
  modaltext: {
    textAlign: "center",
    color: theme.colors.black[0],
    fontSize: 17,
  },
  space: {
    marginVertical: 5,
  },
  modalbtntext: {
    textAlign: "center",
    color: theme.colors.black[0],
    fontSize: 17,
    textTransform: "capitalize",
  },
  w100: { width: "100%" },
  addressblock: {
    borderWidth: 0.3,
    borderRadius: 4,
    marginVertical: 7,
    marginHorizontal: 12,
    padding: 10,
    backgroundColor: theme.colors.appWhite[100],
  },
  address: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressValue: {
    fontSize: 15,
    textTransform: "capitalize",
    color: theme.colors.black[0],
  },
  customerNotesblock: {
    borderRadius: 4,
    marginVertical: 7,
    padding: 10,
    backgroundColor: theme.colors.primary[200],
  },
  notes: {
    width: "100%",
  },
  /////////////////
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#00000070",
  },
  modalView: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBorder: {
    borderBottomWidth: 0.5,
    width: "100%",
    marginBottom: 7,
    paddingVertical: 5,
  },
  button: {
    width: "100%",
    borderRadius: 15,
    padding: 7,
    elevation: 2,
    marginTop: 7,
  },
  buttonClose: {
    width: "100%",
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: theme.colors.black[0],
    textAlign: "center",
    fontSize: 15,
    textTransform: "uppercase",
  },
  btnText: {
    color: theme.colors.appWhite[100],
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
  },
});

export default OrderProductDetail;
