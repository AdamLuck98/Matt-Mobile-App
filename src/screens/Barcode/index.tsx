import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Keyboard,
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
import { CommonActions } from "@react-navigation/native";

import { useTranslation } from "react-i18next";
import images from "../../assets/images";
import { theme } from "../../theme";
import ScreensTitle from "../../components/ScreenTitle";
import { Caption, SubTitle, Title } from "../../components/Typography";
import CommonHeader from "../../components/CommonHeader";
import useUserInfo from "../../hooks/useUserInfo";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ScreensButton from "../../components/ScreenButtom";
import CustomTextInput from "../../components/TextInput/index";
import AsyncStorage from "@react-native-community/async-storage";
import RNPrint from "react-native-print";
import { NativeModules, Alert } from "react-native";
const { CustomMethods } = NativeModules;

function CreateBarcode(props: any) {
  const { navigation, route } = props;
  const { t, i18n } = useTranslation();
  const { onClose } = useDisclose();
  const [showDetail, setShowDetail] = useState(false);
  const [printLable, setprintLable] = useState("1");
  const [draftPrintLable, setdraftPrintLable] = useState("");
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [tireType, settireType] = useState("");
  const [draftsize, setdraftSize] = useState("");

  function clearDraft() {
    setShowDetail(false);
    setprintLable("");
    setdraftPrintLable("");
  }

  const handlegoback = () => {
    navigation.goBack();
    clearDraft();
  };

  function HandleCreateBarcodeBtn() {
    setShowDetail(!showDetail);
    Keyboard.dismiss();
  }

  //MARK:- React Native Print Function
  // const printHTML = async () => {
  //     await RNPrint.print({
  //         html: '<h1> Testing print 1000000 </h1><h2>Testing print </h2><h3>Testing print </h3>'
  //     })
  // };

  const ImDone = () => {
    clearDraft();
    onClose();
    navigation.navigate("Home");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "DrawerMenu" }],
      })
    );
    // setTimeout(() => {

    //   // navigation.navigate("DrawerMenu");
    // }, 100);
    AsyncStorage.removeItem("master-draft");
    AsyncStorage.removeItem("description-draft");
    AsyncStorage.removeItem("titl-edraft");
    AsyncStorage.removeItem("quantity-draft");
    AsyncStorage.removeItem("price-draft");
    AsyncStorage.removeItem("cost-draft");
    AsyncStorage.removeItem("size-draft");
    AsyncStorage.removeItem("color-draft");
    AsyncStorage.removeItem("location-draft");
    AsyncStorage.removeItem("supplier-draft");
    AsyncStorage.removeItem("wholesale-draft");
    AsyncStorage.removeItem("notes-draft");
    AsyncStorage.removeItem("unit-draft");
  };

  const AddDifferentItem = () => {
    clearDraft();
    onClose();
    AsyncStorage.removeItem("master-draft");
    AsyncStorage.removeItem("description-draft");
    AsyncStorage.removeItem("titl-edraft");
    AsyncStorage.removeItem("quantity-draft");
    AsyncStorage.removeItem("price-draft");
    AsyncStorage.removeItem("cost-draft");
    AsyncStorage.removeItem("size-draft");
    AsyncStorage.removeItem("color-draft");
    AsyncStorage.removeItem("location-draft");
    AsyncStorage.removeItem("supplier-draft");
    AsyncStorage.removeItem("wholesale-draft");
    AsyncStorage.removeItem("notes-draft");
    AsyncStorage.removeItem("unit-draft");
    route.params?.clearDraftMain();
    navigation.goBack();
  };

  const addSimilarAlert = () =>
    Alert.alert("", t("common:ADD_SIMILAR_ALERT"), [
      {
        text: "OK",
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);

  const addSimilarItem = () => {
    onClose();
    addSimilarAlert();
  };

  const printBarcode = async () => {
    CustomMethods.barcodeParam(
      route.params.stockNumber,
      price,
      title,
      draftsize
    );
  };

  useEffect(() => {
    AsyncStorage.getItem("price-draft").then((value) => {
      if (value != null) {
        setPrice(value);
      } else {
        setPrice("");
      }
    });
  }, [price]);

  // useEffect(() => {
  //   AsyncStorage.getItem("color-draft").then((value) => {
  //     console.log("Get Tire --> ", JSON.stringify(value))
  //     if (value != null) {
  //       settireType(value);
  //     } else {
  //       settireType("");
  //     }
  //   });
  // }, [tireType]);

  useEffect(() => {
    AsyncStorage.getItem("size-draft").then((value) => {
      console.log("Get --> S", JSON.stringify(value))
      if (value != null) {
        setdraftSize(value);
      } else {
        setdraftSize("");
      }
    });
  }, [draftsize]);


  useEffect(() => {
    AsyncStorage.getItem("titl-edraft").then((value) => {
      console.log("Get --> T ", JSON.stringify(value))
      if (value != null) {
        setTitle(value);
      } else {
        setTitle("");
      }
    });
  }, [title]);

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <CommonHeader
            headerBg={images.HEADER_BG_SKY}
            leftIcon={false}
            rightIcon={false}
          />

          <View style={styles.subContainer}>
            <View style={styles.ht25} />

            <Title style={styles.titleText}>
              {t("common:Your_stock_number_is")}
            </Title>
            <Title style={styles.titleText}>{route.params.stockNumber}</Title>

            <View style={styles.ht25} />

            <ScreensButton
              bgcolor={theme.colors.darkBlue[600]}
              btnTitle={t("common:CREATE_BARCODE")}
              iconName=""
              onPress={HandleCreateBarcodeBtn}
            />

            {showDetail ? (
              <CustomTextInput
                icons="emty"
                value={printLable}
                onPressHandler={setprintLable}
                Voicekey="printLable"
                heading={t("common:Number_of_labels_to_print")}
                keyboard="numeric"
                headingStyle={{
                  color: theme.colors.gray[900],
                  fontSize: 16,
                  marginLeft: 3,
                }}
                placeholder={""}
                passwordtype={false}
                err={theme.colors.gray[800]}
                draftType="printLabledraft"
                draftvalue={draftPrintLable}
              />
            ) : null}

            {showDetail ? <View style={styles.ht20} /> : null}

            {showDetail ? (
              <ScreensButton
                bgcolor={theme.colors.black[1000]}
                btnTitle={t("common:PRINT_BARCODE")}
                iconName=""
                // onPress={printHTML}
                onPress={printBarcode}
              />
            ) : null}

            {showDetail ? (
              <View style={styles.ht35} />
            ) : (
              <View style={styles.ht20} />
            )}

            <ScreensButton
              bgcolor={theme.colors.green[400]}
              btnTitle={t("common:ADD_SIMILAR_ITEM")}
              iconName=""
              onPress={addSimilarItem}
            />

            <View style={styles.ht20} />

            <ScreensButton
              bgcolor={theme.colors.green[400]}
              btnTitle={t("common:ADD_DIFFERENT_ITEM")}
              iconName=""
              onPress={AddDifferentItem}
            />

            <View style={styles.ht20} />

            <ScreensButton
              bgcolor={theme.colors.green[400]}
              btnTitle={t("common:IM_DONE")}
              iconName=""
              onPress={() => ImDone()}
            />
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

//MARK:- Define styles
const styles = StyleSheet.create({
  safeAreaView: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: theme.colors.appWhite[100],
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.appWhite[100],
  },
  ht20: {
    height: 20,
  },
  ht25: {
    height: 25,
  },
  ht35: {
    height: 35,
  },
  subContainer: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 20,
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.appWhite[800],
  },
  cameraContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
    flexWrap: "wrap",
  },
  imgBox: {
    width: "40%",
    height: 100,
    borderWidth: 0.2,
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
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
    textTransform: "uppercase",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#00000070",
  },

  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    color: theme.colors.black[1000],
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
    textTransform: "capitalize",
  },
  btnText: {
    color: theme.colors.appWhite[100],
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
  },
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default CreateBarcode;
