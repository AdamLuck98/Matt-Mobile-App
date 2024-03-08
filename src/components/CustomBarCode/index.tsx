import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import BarcodeMask from "react-native-barcode-mask";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RNCamera } from "react-native-camera";
import { Divider, Actionsheet, Box } from "native-base";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  barcodeKey,
  categoryKey,
  detailsKey,
  StockKey,
  StockNumber,
} from "../../redux/reducers/SerchScreenReducer/Action";
import { RootNavigationType } from "../../navigation";
import { useTranslation } from "react-i18next";
import { theme } from "../../theme";
import { SubTitle } from "../Typography";
import { FONT_GOOGLE_BARLOW_SEMIBOLD } from "../../constants/fonts";
import ScreensButton from "../ScreenButtom";
import useUserInfo from "../../hooks/useUserInfo";
import useBarcodeSerch from "./Querys/useBracode";
import { isEmpty } from "lodash";
// import { useIsFocused } from '@react-navigation/native';

interface IProps {
  barcode?: string;
  setbarcode?: (text: string) => void;
  input?: any;
  search?: string;
}

export default function CustomBarCode(props: IProps) {
  const { barcode, input, search } = props;
  const navigation = useNavigation();
  const [Result, setResult] = React.useState<string | undefined>(barcode);
  const [t, i18] = useTranslation();
  const dispatch = useDispatch();
  const [open, setopen] = React.useState(false);
  const userData = useUserInfo();
  const { barcodeSerch } = useBarcodeSerch();
  const [response, setresponse] = React.useState(""); let cameraRef = React.useRef();
  // const barcodeValue = barcode ? barcode : t("common:BARCODE");
  const barcodeValue = barcode ? barcode : search == 'search' ? t("common:SEARCH_BARCODE") : t("common:BARCODE");
  const barcodeVerify = barcode ? true : false;
  const isFocused = useIsFocused();

  // const camera = React.useRef
  const serchBarcodeOprations = async () => {
    const response: any = await barcodeSerch({
      do: "searchByBarcode",
      userid: userData?.userInfo?.UserId,
      associates: 1,
      barcode: Result,
    });
    // console.log("response", JSON.stringify(response, null, 4));
    setresponse(response?.ResponseMsg);
  };

  React.useEffect(() => {
    setResult(barcode);
    if (Result) {
      serchBarcodeOprations()
      if (search === "search") {
        setopen(false);
        navigation.navigate("Thislocation", {
          previousscreen: "SearchProduct",
        });
        dispatch(StockNumber(""));
        dispatch(StockKey(""));
        dispatch(barcodeKey(Result));
        dispatch(categoryKey(""));
        setResult("");
        input("");
      }
    }
  }, [barcode]);

  React.useEffect(() => {

    // console.log("inner respone")
    // console.log("Result",Result)
    if (Result) {
      // console.log("inner result")
      if (response === "Record Successfully Fetch") {
        setopen(false);
        navigation.navigate("Thislocation", { previousscreen: "AddProduct" });
        dispatch(StockNumber(""));
        dispatch(StockKey(""));
        dispatch(barcodeKey(Result));
        dispatch(categoryKey(""));
        setResult("");
        input("");
        setresponse("");
      }
    }
  });
  return (
    <>
      <ScreensButton
        bgcolor={
          barcode == "" ? theme.colors.primary[500] : theme.colors.yellow[400]
        }
        btnTitle={barcodeValue}
        iconName=""
        onPress={() => { setopen(true), Keyboard.dismiss() }}
        veiryicon={barcodeVerify}
      />

      <Actionsheet isOpen={open} onClose={() => setopen(false)}>
        <Actionsheet.Content>
          <Box w="100%" h="100%" p={4} justifyContent="center">
            <View style={styles.maincontainer}>
              <View style={styles.cameraContainer}>
                {isFocused ? (
                  <RNCamera
                    style={[
                      StyleSheet.absoluteFill,
                      { width: "100%", height: 160 },
                    ]}
                    ref={(ref) => { camera = ref }}
                    // ref={cameraRef}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                      title: "Permission to use camera",
                      message: "We need your permission to use your camera",
                      buttonPositive: "Ok",
                      buttonNegative: "Cancel",
                    }}
                    barCodeTypes={[
                      RNCamera.Constants.BarCodeType.ean13,
                      RNCamera.Constants.BarCodeType.upc_e,
                      RNCamera.Constants.BarCodeType.code128,
                      RNCamera.Constants.BarCodeType.code39,
                      RNCamera.Constants.BarCodeType.code39mod43,
                      RNCamera.Constants.BarCodeType.code93,
                      RNCamera.Constants.BarCodeType.ean8,
                      RNCamera.Constants.BarCodeType.interleaved2of5,
                      RNCamera.Constants.BarCodeType.itf14,
                    ]}
                    // detectedImageInEvent={true}
                    captureAudio={false}
                    onBarCodeRead={(data: any) => {
                      input(data?.data);
                      setResult(data?.data);
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => { }}
                  >
                    <BarcodeMask backgroundColor="transparent" />
                  </RNCamera>) : null}
              </View>
              <View style={styles.ContsinerButtom}>
                <View style={styles.inputBox}>
                  <TextInput
                    style={styles.input}
                    multiline={true}
                    // placeholder={t("common:Barcode_of_the_items")}
                    placeholderTextColor={theme.colors.black[0]}
                    value={Result}
                  />
                  <View style={styles.barcodeIcon}>
                    <Ionicons
                      name="barcode-outline"
                      size={40}
                      color={theme.colors.black[0]}
                    />
                  </View>
                </View>
                <Divider h={0.5} />
                {Result ? (
                  search === "search" ? (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.submitButton,
                          { backgroundColor: "green" },
                        ]}
                        onPress={() => {
                          setopen(false);
                          navigation.navigate("Allocation");
                          dispatch(StockNumber(""));
                          dispatch(StockKey(""));
                          dispatch(barcodeKey(Result));
                          dispatch(categoryKey(""));
                        }}
                      >
                        <SubTitle style={styles.submitButtonText}>
                          {t("common:SEARCH_ITEM")}
                        </SubTitle>
                      </TouchableOpacity>
                      <SubTitle
                        onPress={() => {
                          setResult("");
                        }}
                        style={styles.text}
                      >
                        {t("common:Re_Scan")}
                      </SubTitle>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.submitButton,
                          { backgroundColor: "green" },
                        ]}
                        onPress={() => {
                          setopen(false);
                        }}
                      >
                        <SubTitle style={styles.submitButtonText}>
                          {t("common:Get_Items")}
                        </SubTitle>
                      </TouchableOpacity>
                      <SubTitle
                        onPress={() => {
                          setResult("");
                        }}
                        style={styles.text}
                      >
                        {t("common:Re_Scan")}
                      </SubTitle>
                    </>
                  )
                ) : (
                  <>
                    <View
                      style={[styles.submitButton, { backgroundColor: "gray" }]}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          marginVertical: 10,
                          fontSize: 18,
                          fontWeight: "500",
                          color: "white",
                        }}
                      >
                        {t("common:Get_Items")}
                      </Text>
                    </View>
                    <TouchableOpacity>
                      <SubTitle
                        onPress={() => {
                          setopen(false);
                        }}
                        style={styles.text}
                      >
                        {t("common:CANCEL")}
                      </SubTitle>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}

const styles = StyleSheet.create({
  paddingx: {
    paddingHorizontal: 10,
  },
  result: {
    fontSize: 16,
    color: theme.colors.black[0],
  },
  maincontainer: {
    flex: 1,
    justifyContent: "center",
  },
  cameraContainer: {
    height: "40%",
    display: "flex",
    flexWrap: "wrap",
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  barcodeTextURL: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },

  ContsinerButtom: {
    marginTop: 40,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 5,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 16,
    color: theme.colors.black[0],
    flex: 10,
    fontFamily: FONT_GOOGLE_BARLOW_SEMIBOLD,
    marginTop: 30,
  },
  barcodeIcon: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  submitButton: {
    height: 50,
    borderRadius: 30,
    marginVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: theme.colors.black[0],
  },
});
