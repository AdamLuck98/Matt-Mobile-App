import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
  Text,
  Modal,
  Button,
  BackHandler,
  Image,
  FlatList,
  Keyboard,
  NativeModules,
} from "react-native";
import {
  NativeBaseProvider,
  Actionsheet,
  useDisclose,
  Divider,
  Spinner,
} from "native-base";
const { CustomMethods } = NativeModules;

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { theme } from "../../theme";
import images from "../../assets/images/index";
import CommonHeader from "../../components/CommonHeader";
import ScreensButton from "../../components/ScreenButtom";
import CustomTextInput from "../../components/TextInput/index";
import VoiceKeys from "../../redux/reducers/VoiceKey/reducer";
import { Caption, SubTitle } from "../../components/Typography";
import { Avatar } from "../../components/Avatar";
import { ImageOrVideo } from "react-native-image-crop-picker";
import useUserInfo from "../../hooks/useUserInfo";
import ScreensTitle from "../../components/ScreenTitle";
import AddProductCategories from "../../components/AddProductCatagory/index";
import updatePropduct from "./Queries/updatePropductOprations";
import { useGetCategoriesData } from "./Queries/useGetCategoriesData";

import { useGetSizeData } from "./Queries/useGetSizeData";
import { useGetLocationData } from "./Queries/useGetLocationData";
import { useGetSupplierData } from "./Queries/useGetSupplierData";
import { useGetSubCatData } from "./Queries/useGetSUbCatData";
import CustomBarCode from "../../components/CustomBarCode";
import useDropDownOperation from "./Queries/useDropDownOperations";
import { useGetColor } from "./Queries/useGetColor";
import { useUpdateData } from "./Queries/useUpdateData";
import useDropDownDelColor from "./Queries/useDeleteColor";
import useDropDownDelSize from "./Queries/useDeleteSizeData";
import useDropDownDelLocation from "./Queries/useDeleteLocation";
import useDropDownDelSupplier from "./Queries/useDeleteSupplierData";
import { useGetSubCat2Data } from "../AddProduct/Queries/useGetSubCatData2";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation";
import { useFocusEffect } from "@react-navigation/native";
import { useQueryClient } from "react-query";
import { QueryKeys } from "../../utils/QueryKeys";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useGetUnitData } from "../AddProduct/Queries/useGetUnitData";
import useDropDownDelUnit from "../AddProduct/Queries/useDeleteUnitData";
import { TextInput } from "react-native-gesture-handler";
import { FONT_GOOGLE_BARLOW_SEMIBOLD } from "../../constants/fonts";
import SearchProductCategories from "../SererchProduct/components/SearchProductCategories";
import CommonHeader2 from "../../components/CommonHeader2";
import { voiceStart } from "../../redux/reducers/VoiceToText/action";

export type SearchResultProps = NativeStackScreenProps<
  RootStackParamList,
  "EditScreen"
>;

function EditScreen(props: SearchResultProps) {
  const { navigation, route } = props;
  const { id, itempass, previousScreen } = route.params;
  const dispatch = useDispatch();
  const userData = useUserInfo();
  const [Values, setValues] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [showPics, setShowPics] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const shopName = userData.userInfo?.UserName;

  const {
    data: updateData,
    isLoading,
    isError,
    refetch,
  } = useUpdateData({
    UserId: itempass.userid,
    listingid: id || "",
  });

  console.log("data got>>", JSON.stringify(updateData, null, 2));
  const [master, setMaster] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [subcategory2, setsubcategory2] = useState("");
  const [productTitle, setproductTitle] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [fulldescription, setfulldescription] = useState("");
  const [quantityAvailable, setquantityAvailable] = useState("");
  const [price, setprice] = useState("");
  const [cost, setCost] = useState("");
  const [wholeSale, setWholesale] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  const [supplier, setSupplier] = useState("");
  const [unit, setUnit] = useState("");
  const [notes, setnotes] = useState("");
  const [barcode, setbarcode] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [image6, setImage6] = useState("");
  const [image7, setImage7] = useState("");
  const [image8, setImage8] = useState("");
  const [image9, setImage9] = useState("");
  const [image10, setImage10] = useState("");
  const [imgposition, setimgposition] = useState(0);
  const [image_1o, setimage_1o] = useState(null);
  const [image_2o, setimage_2o] = useState(null);
  const [image_3o, setimage_3o] = useState(null);
  const [image_4o, setimage_4o] = useState(null);
  const [image_5o, setimage_5o] = useState(null);
  const [image_6o, setimage_6o] = useState(null);
  const [image_7o, setimage_7o] = useState(null);
  const [image_8o, setimage_8o] = useState(null);
  const [image_9o, setimage_9o] = useState(null);
  const [image_10o, setimage_10o] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(true);
  const [showBarcode, setShowBarcode] = useState(false);
  const [printLable, setprintLable] = useState("1");
  const [draftPrintLable, setdraftPrintLable] = useState("");
  const [barcodeForPrint, setPrintBarcode] = useState("");

  function HandleCreateBarcodeBtn() {
    setShowBarcode(!showBarcode);
    Keyboard.dismiss();
  }

  const { productUpdate } = updatePropduct();

  const { data: dashData, refetch: catRefetch } = useGetCategoriesData({
    UserId: userData?.userInfo?.UserId || "",
  });

  const { data: SubCatData, refetch: subCatRefetch } = useGetSubCatData({
    userid: userData?.userInfo?.UserId || "",
    mastercat: master || "string",
    suball: 1,
  });

  const { data: SubCat2Data, refetch: subCat2Refetch } = useGetSubCat2Data({
    userid: userData?.userInfo?.UserId || "",
    mastercat: master || "string",
    suball: 1,
    subcat_1: subcategory || "string",
  });

  const { data: sizeData, refetch: sizeRefetch } = useGetSizeData({
    UserId: userData?.userInfo?.UserId || "",
  });

  const { data: colorData, refetch: colorRefetch } = useGetColor({
    userid: userData?.userInfo?.UserId || "",
    suball: 1,
  });

  const { data: locationData, refetch: locRefetch } = useGetLocationData({
    UserId: userData?.userInfo?.UserId || "",
  });

  const { data: supplierData, refetch: supplierRefetch } = useGetSupplierData({
    UserId: userData?.userInfo?.UserId || "",
  });

  const { data: unitData, refetch: unitRefetch } = useGetUnitData({
    UserId: userData?.userInfo?.UserId || "",
  });

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setloading(true);
        navigation.navigate(previousScreen);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  useEffect(() => {
    subCatRefetch();
  }, [master]);

  useEffect(() => {
    subCat2Refetch();
  }, [subcategory]);
  const categoriesRef = useRef();
  const productTitleRef = useRef();
  const sizeRef = useRef();
  const tireRef = useRef();
  const locationRef = useRef();
  const supplierRef = useRef();

  const categoryArr = dashData?.CatData;
  const lists = categoryArr?.split(",");
  const sizeArr = sizeData?.SizData;
  const sizeArray = sizeArr?.split(",");
  const colorArr = colorData?.ColData;
  const colorArray = colorArr?.split(",");
  const locationArr = locationData?.LocData;
  const locationArray = locationArr?.split(",");
  const supplierArr = supplierData?.SupData;
  const supplierArray = supplierArr?.split(",");
  const unitArr = unitData?.UntData;
  const unitArray = unitArr?.split(",");
  const getSubCatArr = SubCatData?.CatData;
  const SubCatArray = getSubCatArr?.split(",");
  const getSubCat2Arr = SubCat2Data?.CatData;
  const SubCat2Array = getSubCat2Arr?.split(",");
  const queryClient = useQueryClient();

  const { t, i18n } = useTranslation();
  const voicesKey = useSelector((states) => states.VoiceKeys);
  const { deleteSize } = useDropDownOperation();
  const { deleteSizeData } = useDropDownDelSize();
  const { deleteColorData } = useDropDownDelColor();
  const { deleteLocationData } = useDropDownDelLocation();
  const { deleteSupplierData } = useDropDownDelSupplier();
  const { deleteUnitData } = useDropDownDelUnit();

  const VoiceInput = (v: any) => {
    setValues(v);
  };

  const closeModal = (type: any) => {
    switch (type) {
      case "selectCategories":
        categoriesRef.current?.handleClose();
        break;
      case "selectSize":
        sizeRef.current?.handleClose();
        break;
      case "selectTire":
        tireRef.current?.handleClose();
        break;
      case "selectLocation":
        locationRef.current?.handleClose();
        break;
      case "selectSupplier":
        supplierRef.current?.handleClose();
        break;
      default:
        break;
    }
    voiceStart(false);
  };

  const setSelectedItem = (value: string, type: any) => {
    switch (type) {
      case "selectCategories":
        setMaster(value);
        break;
      case "selectSize":
        setSize(value);
        break;
      case "selectTire":
        console.log("value >> " + value);
        setColor(value);
        break;
      case "selectLocation":
        setLocation(value);
        break;
      case "selectSupplier":
        setSupplier(value);
        break;
      default:
        break;
    }
  };

  const openModal = (type: any) => {
    switch (type) {
      case "selectCategories":
        categoriesRef.current?.handleAdd();
        break;
      case "selectSize":
        sizeRef.current?.handleAdd();
        break;
      case "selectTire":
        tireRef.current?.handleAdd();
        break;
      case "selectLocation":
        locationRef.current?.handleAdd();
        break;
      case "selectSupplier":
        supplierRef.current?.handleAdd();
        break;
      default:
        break;
    }
  };

  const selectCategoryFromVoice = (values: string, type?: string) => {
    let selectedItem = "";
    let found = false;
    if (values && values.length > 0) {
      let array: any = [];
      switch (type) {
        case "selectCategories":
          array = lists;
          break;
        case "selectSize":
          array = sizeArray;
          break;
        case "selectTire":
          array = colorArray;
          break;
        case "selectLocation":
          array = locationArray;
          break;
        case "selectSupplier":
          array = supplierArray;
          break;
        default:
          break;
      }
      array?.map((item: any) => {
        if (item.match(values)) {
          // selectedItem = item; //for match item
          if (item === values) {
            selectedItem = item;
            closeModal(type);
          }
          found = true;
        }
      });
    }
    if (selectedItem !== "" && found) {
      setSelectedItem(selectedItem, type);
      voiceStart(false);
    } else {
      openModal(type);
      voiceStart(false);
    }
  };

  useEffect(() => {
    switch (voicesKey) {
      case "selectCategories":
        {
          console.log("Values.toString()" + Values.toString());
          if (Values && Values.length > 0) {
            selectCategoryFromVoice(Values.toString(), "selectCategories");
          }
        }
        break;
      case "eProductTitile":
        {
          console.log("Values.toString()" + Values.toString());
          if (Values && Values.length > 0) {
            selectCategoryFromVoice(Values.toString(), "eProductTitile");
          }
        }
        // {
        //   setproductTitle(Values.toString());
        // }
        break;

      case "selectSize":
        {
          if (Values && Values.length > 0) {
            selectCategoryFromVoice(Values.toString(), "selectSize");
          }
        }
        break;

      case "selectTire":
        {
          if (Values && Values.length > 0) {
            selectCategoryFromVoice(Values.toString(), "selectTire");
          }
        }
        break;

      case "selectSpeedLoadRatings":
        {
          if (Values && Values.length > 0) {
            selectCategoryFromVoice(
              Values.toString(),
              "selectSpeedLoadRatings"
            );
          }
        }
        break;

      case "selectLocation":
        {
          if (Values && Values.length > 0) {
            selectCategoryFromVoice(Values.toString(), "selectLocation");
          }
        }
        break;

      case "selectSupplier":
        {
          if (Values && Values.length > 0) {
            selectCategoryFromVoice(Values.toString(), "selectSupplier");
          }
        }
        break;

      case "eFULLDescription":
        {
          setfulldescription(Values.toString());
        }
        break;

      case "eQuantityAvailable":
        {
          setquantityAvailable(Values.toString());
        }
        break;

      case "ePrice":
        {
          setprice(Values.toString());
        }
        break;
      case "enotes":
        {
          setnotes(Values.toString());
        }
        break;
      case "eCost":
        {
          setCost(Values.toString());
        }
        break;
      case "eWholesale":
        {
          setWholesale(Values.toString());
        }
        break;

      default:
        {
          null;
        }
        break;
    }
  }, [Values]);

  useEffect(() => {
    if (updateData) {
      setMaster(updateData?.InventoryData.maincat);
      setsubcategory(updateData?.InventoryData.subcat_1);
      setsubcategory2(updateData?.InventoryData.subcat_2);
      setproductTitle(updateData?.InventoryData.prodtitle);
      setfulldescription(updateData?.InventoryData.description);
      setquantityAvailable(updateData?.InventoryData.qty);
      setprice(updateData?.InventoryData.price);
      setCost(updateData?.InventoryData.cost);
      setWholesale(updateData?.InventoryData.wholesale);
      setSize(updateData?.InventoryData.size);
      setColor(updateData?.InventoryData.color);
      setLocation(updateData?.InventoryData.location);
      setSupplier(updateData?.InventoryData.supplier);
      setUnit(updateData?.InventoryData.unit);
      setnotes(updateData?.InventoryData.pvt_notes);
      setbarcode(updateData?.InventoryData.barcode);
      setImage1(updateData?.InventoryData.image_1);
      setImage2(updateData?.InventoryData.image_2);
      setImage3(updateData?.InventoryData.image_3);
      setImage4(updateData?.InventoryData.image_4);
      setImage5(updateData?.InventoryData.image_5);
      setImage6(updateData?.InventoryData.image_6);
      setImage7(updateData?.InventoryData.image_7);
      setImage8(updateData?.InventoryData.image_8);
      setImage9(updateData?.InventoryData.image_9);
      setImage10(updateData?.InventoryData.image_10);
      setPrintBarcode(updateData?.InventoryData?.listingid);
    }
  }, [updateData]);

  let imageUrl1 = image1 && `${image1}?time+${new Date()}`;
  let imageUrl2 = image2 && `${image2}?time+${new Date()}`;
  let imageUrl3 = image3 && `${image3}?time+${new Date()}`;
  let imageUrl4 = image4 && `${image4}?time+${new Date()}`;
  let imageUrl5 = image5 && `${image5}?time+${new Date()}`;
  let imageUrl6 = image6 && `${image6}?time+${new Date()}`;
  let imageUrl7 = image7 && `${image7}?time+${new Date()}`;
  let imageUrl8 = image8 && `${image8}?time+${new Date()}`;
  let imageUrl9 = image9 && `${image9}?time+${new Date()}`;
  let imageUrl10 = image10 && `${image10}?time+${new Date()}`;

  console.log("imageUrl1>", imageUrl1);

  const voicesresult = useSelector((states) => states.VoiceResultReducer);

  useEffect(() => {
    setValues(voicesresult);
  });

  const HandleDetailBtn = () => {
    setShowDetail(!showDetail);
    setShowNotes(false);
    setShowPics(false);
  };

  const HandleNotesBtn = () => {
    setShowNotes(!showNotes);
    setShowDetail(false);
    setShowPics(false);
  };

  function HandlePricingBtn() {
    setShowPricing(!showPricing);
    // setShowNotes(false); // new Changes
    // setShowPics(false); // new Changes
    Keyboard.dismiss();
  }

  const HandlePhotoBtn = () => {
    setShowPics(!showPics);
    setShowNotes(false);
    setShowDetail(false);
  };

  const onAvatarChange = (image: ImageOrVideo) => {
    var obj = {
      name: "image_" + imgposition + ".jpg",
      isset: 0,
      type: image.mime,
      uri:
        Platform.OS == "android"
          ? image.path
          : image.path.replace("", "file://"),
      size: image.size,
    };
    switch (imgposition) {
      case 1:
        setImage1(obj.uri);
        setimage_1o(obj);
        break;
      case 2:
        setImage2(obj.uri);
        setimage_2o(obj);
        break;
      case 3:
        setImage3(obj.uri);
        setimage_3o(obj);
        break;
      case 4:
        setImage4(obj.uri);
        setimage_4o(obj);
        break;
      case 5:
        setImage5(obj.uri);
        setimage_5o(obj);
        break;

      case 6:
        setImage6(obj.uri);
        setimage_6o(obj);
        break;

      case 7:
        setImage7(obj.uri);
        setimage_7o(obj);
        break;

      case 8:
        setImage8(obj.uri);
        setimage_8o(obj);
        break;

      case 9:
        setImage9(obj.uri);
        setimage_9o(obj);
        break;

      case 10:
        setImage10(obj.uri);
        setimage_10o(obj);
        break;
    }
  };

  const deleletitem = async (cat: any, type: any, index: any) => {
    if (type === "1") {
      const Datamaster: any = {
        UserId: userData?.userInfo?.UserId || "",
        mastercat: cat,
        catagory: cat,
      };
      const response: any = await deleteSize(Datamaster);
      if (response.ResponseMsg === "Delete Successful") {
        catRefetch();
      }
    }
    if (type === "2") {
      const SubselectData: any = {
        UserId: userData?.userInfo?.UserId || "",
        mastercat: cat,
        subcat_1: cat,
        catagory: cat,
      };
      const response: any = await deleteSize(SubselectData);
      if (response.ResponseMsg === "Delete Successful") {
        subCatRefetch();
      }
    }
    if (type === "3") {
      Alert.alert("called size delete");
      const SizeData: any = {
        UserId: userData?.userInfo?.UserId || "",
        supplier: cat,
      };
      const response: any = await deleteSizeData(SizeData);
      if (response.ResponseMsg === "Records Updated") {
        sizeRefetch();
      }
    }
    if (type === "4") {
      const ColorData: any = {
        UserId: userData?.userInfo?.UserId || "",
        supplier: cat,
      };
      const response: any = await deleteColorData(ColorData);
      if (response.ResponseMsg === "Records Updated") {
        colorRefetch();
      }
    }
    if (type === "5") {
      const LocationData: any = {
        UserId: userData?.userInfo?.UserId || "",
        location: cat,
      };
      const response: any = await deleteLocationData(LocationData);
      if (response.ResponseMsg === "Records Updated") {
        locRefetch();
      }
    }
    if (type === "6") {
      const SupplierData: any = {
        UserId: userData?.userInfo?.UserId || "",
        supplier: cat,
      };
      const response: any = await deleteSupplierData(SupplierData);
      if (response.ResponseMsg === "Records Updated") {
        supplierRefetch();
      }
    }
    if (type === "7") {
      const SubselectData: any = {
        UserId: userData?.userInfo?.UserId || "",
        mastercat: master,
        subcat_1: subcategory,
        subcat_2: cat,
        catagory: cat,
      };
      const response: any = await deleteSize(SubselectData);
      if (response.ResponseMsg === "Delete Successful") {
        subCat2Refetch();
      }
    }
    if (type === "8") {
      const UnitData: any = {
        UserId: userData?.userInfo?.UserId || "",
        unit: cat,
      };
      const response: any = await deleteUnitData(UnitData);
      if (response.ResponseMsg === "Records Updated") {
        unitRefetch();
      }
    }
  };

  const updatePropductOpration = async () => {
    setloading(true);
    const deletpropductData: any = {
      R_barcode: barcode,
      R_productTitle: productTitle,
      R_master: master,
      R_subcategory: subcategory,
      R_subcategory2: subcategory2,
      R_fulldescription: fulldescription,
      R_quantityAvailable: quantityAvailable,
      R_supplier: supplier,
      R_location: location,
      R_price: price,
      R_cost: cost,
      R_wholesale: wholeSale,
      R_unit: unit,
      R_notes: notes,
      R_size: size,
      R_color: color,
      R_listingid: updateData?.InventoryData?.listingid,
      UserName: userData?.userInfo?.UserName || "",
      UserId: userData?.userInfo?.UserId || "",
      R_imges1: image_1o,
      R_imges2: image_2o,
      R_imges3: image_3o,
      R_imges4: image_4o,
      R_imges5: image_5o,
      R_imges6: image_6o,
      R_imges7: image_7o,
      R_imges8: image_8o,
      R_imges9: image_9o,
      R_imges10: image_10o,
    };

    const response: any = await productUpdate(deletpropductData);
    if (response.ResponseMsg === "Sucessfull") {
      setModalVisible(true);
      setloading(false);
    }
    refetch();
  };
  const handleCatch = () => {
    queryClient.removeQueries([QueryKeys.useAllLocation]);
    queryClient.removeQueries([QueryKeys.thilocation]);
  };
  function handleSubmit() {
    if (
      master == undefined &&
      size == undefined &&
      productTitle == undefined &&
      fulldescription == undefined
    ) {
      setError(true);
    } else {
      setError(false);
      updatePropductOpration();
      handleCatch();
    }
  }

  // const printBarcode = async () => {
  //   CustomMethods.barcodeParam(barcodeForPrint, price, "barcodeNumber", "test val");
  // };

  const HandleBarcode = (v: any) => {
    setbarcode(v);
  };

  if (isError) {
    return (
      <TouchableOpacity onPress={() => refetch()}>
        <Text>Retry</Text>
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    refetch();
    setTimeout(() => {
      setloading(false);
    }, 800);
  }, [route.params]);

  const handlegoback = () => {
    setloading(true);
    navigation.navigate(previousScreen);
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
      <View style={styles.container}>
        <FlatList
          data={[{ key: 1 }]}
          // ref={flatlitRef}
          keyboardShouldPersistTaps="always"
          ListHeaderComponent={() => {
            return (
              <>
                <StatusBar
                  animated={true}
                  backgroundColor={theme.colors.black[1100]}
                />
                <CommonHeader2
                  headerBg={images.HEADER_BG_SKY}
                  goback={() => handlegoback()}
                />
              </>
            );
          }}
          renderItem={() => {
            return (
              <>
                <KeyboardAwareScrollView>
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
                        {/* <View style={styles.modalBorder}>
                          <SubTitle style={styles.modalText}>
                            {t("common:SUCCESS")}
                          </SubTitle>
                        </View> */}
                        <View style={styles.modalBorder}>
                          <Caption style={styles.textStyle}>
                            {t("common:RECORD_UPDATED")}
                          </Caption>
                        </View>
                        <TouchableOpacity
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => {
                            setModalVisible(!modalVisible);
                            setloading(true);
                            navigation.navigate(previousScreen);
                          }}
                        >
                          <SubTitle style={[styles.textStyle, styles.btnText]}>
                            ok
                          </SubTitle>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                  <ScreensTitle
                    title={
                      userData?.userInfo?.UserType === 5
                        ? t("common:VIEW_INVENTORY")
                        : t("common:EDIT_INVENTORY")
                    }
                  />
                  <View style={styles.subContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {userData?.userInfo?.UserType === 5 ||
                        shopName != id.substr(0, 4) ? (
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: theme.colors.gray[800],
                            marginLeft: 10,
                            marginBottom: 7,
                          }}
                        >
                          <SubTitle
                            style={{
                              fontSize: 16,
                              color: theme.colors.gray[900],
                            }}
                          >
                            {t("common:Categories")}
                          </SubTitle>
                          <View
                            style={{ paddingHorizontal: 5, marginVertical: 10 }}
                          >
                            <SubTitle style={{ fontSize: 16 }}>
                              {master}
                            </SubTitle>
                          </View>
                        </View>
                      ) : (
                        <>
                          <AddProductCategories
                            ref={categoriesRef}
                            icons="speak"
                            voicekey="selectCategories"
                            label={t("common:Categories")}
                            sheetlabel={t("common:SELECT_MASTER_CATEGORY")}
                            toAdd={t("common:ADD_MORE_CATEGORY")}
                            color={theme.colors.red[900]}
                            list={lists ? lists : []}
                            subList={SubCatArray}
                            subList2={SubCat2Array}
                            deleletitem={deleletitem}
                            value={master}
                            onSelect={setMaster}
                            subValue={subcategory}
                            subValue2={subcategory2}
                            onSubSelect={setsubcategory}
                            onSubSelect2={setsubcategory2}
                            isSubSheet={false}
                            isSubSheet2={false}
                            err={
                              error
                                ? theme.colors.red[900]
                                : theme.colors.gray[800]
                            }
                            type="mCat"
                            delType="1"
                            delSubType="2"
                            delSubType2="7"
                            draftType={""}
                            draftvalue={""}
                            reload={catRefetch}
                            subreload={subCatRefetch}
                            subreload2={subCat2Refetch}
                            input={""}
                            setInput={setMaster}
                          />
                        </>
                      )}

                      <View style={styles.ht10} />

                      {userData?.userInfo?.UserType === 5 ||
                        shopName != id.substr(0, 4) ? (
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: theme.colors.gray[800],
                            marginLeft: 10,
                            marginBottom: 7,
                          }}
                        >
                          <SubTitle
                            style={{
                              fontSize: 16,
                              color: theme.colors.gray[900],
                            }}
                          >
                            {t("common:SIZE")}
                          </SubTitle>
                          <View
                            style={{
                              paddingHorizontal: 5,
                              marginVertical: 10,
                            }}
                          >
                            <SubTitle style={{ fontSize: 16 }}>{size}</SubTitle>
                          </View>
                        </View>
                      ) : (
                        <AddProductCategories
                          ref={sizeRef}
                          icons="speak"
                          voicekey="selectSize"
                          label={t("common:SIZE")}
                          sheetlabel={t("common:LIST_OF_SIZES")}
                          toAdd={t("common:ADD_MORE_SIZES")}
                          //color={theme.colors.gray[900]}
                          // color={theme.colors.red[900]}
                          color={
                            error ? theme.colors.red[900] : theme.colors.red[900]
                          }
                          list={sizeArray ? sizeArray : []}
                          subList={SubCatArray}
                          deleletitem={deleletitem}
                          value={size}
                          onSelect={setSize}
                          isSubSheet={false}
                          type="size"
                          delType="3"
                          draftType=""
                          draftvalue={""}
                          reload={sizeRefetch}
                          subreload={sizeRefetch}
                          isSubSheet2={false}
                          subreload2={subCat2Refetch}
                          onSubSelect={() => console.log()}
                          onSubSelect2={() => console.log()}
                          input={""}
                          setInput={setSize}
                        />
                      )}

                      <View style={styles.ht10} />

                      {userData?.userInfo?.UserType === 5 ||
                        shopName != id.substr(0, 4) ? (
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: theme.colors.gray[800],
                            marginLeft: 10,
                            marginBottom: 7,
                          }}
                        >
                          <SubTitle
                            style={{
                              fontSize: 16,
                              color: theme.colors.gray[900],
                            }}
                          >
                            {t("common:Product_Titile")}
                          </SubTitle>
                          <View
                            style={{ paddingHorizontal: 5, marginVertical: 10 }}
                          >
                            <SubTitle style={{ fontSize: 16 }}>
                              {productTitle}
                            </SubTitle>
                          </View>
                        </View>
                      ) : (
                        // <CustomTextInput
                        //   icons="speak"
                        //   value={productTitle}
                        //   onPressHandler={setproductTitle}
                        //   Voicekey="eProductTitile"
                        //   heading={t("common:Product_Titile")}
                        //   headingStyle={{
                        //     color: theme.colors.red[500],
                        //     fontSize: 16,
                        //     marginLeft: 3,
                        //   }}
                        //   placeholder={""}
                        //   passwordtype={false}
                        //   err={
                        //     error
                        //       ? theme.colors.red[900]
                        //       : theme.colors.gray[800]
                        //   }
                        //   draftType={""}
                        //   draftvalue={""}
                        // />
                        <AddProductCategories
                          ref={productTitleRef}
                          icons="speak"
                          voicekey="eProductTitile"
                          label={t("common:Product_Titile")}
                          sheetlabel={t("common:SELECT_PRODUCT_TITLE")}
                          toAdd={t("common:ADD_NEW_PRODUCT")}
                          color={theme.colors.gray[900]}
                          // color={
                          //   error ? theme.colors.red[900] : theme.colors.red[900]
                          // }
                          list={[]}
                          subList={SubCatArray}
                          deleletitem={deleletitem}
                          value={productTitle}
                          onSelect={setproductTitle}
                          isSubSheet={false}
                          type="product"
                          delType="3"
                          draftType="titledraft"
                          draftvalue={""}
                          reload={sizeRefetch}
                          subreload={sizeRefetch}
                          isSubSheet2={false}
                          subreload2={subCat2Refetch}
                          onSubSelect={() => console.log()}
                          onSubSelect2={() => console.log()}
                          input={titleInput}
                          setInput={setTitleInput}
                          err={
                            error
                              ? theme.colors.red[900]
                              : theme.colors.gray[900]
                          }
                        />
                      )}

                      <View style={styles.ht10} />
                      {userData?.userInfo?.UserType === 5 ||
                        shopName != id.substr(0, 4) ? (
                        <View
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: theme.colors.gray[800],
                            marginLeft: 10,
                            marginBottom: 7,
                          }}
                        >
                          <SubTitle
                            style={{
                              fontSize: 16,
                              color: theme.colors.gray[900],
                            }}
                          >
                            {t("common:Quantity_Available")}
                          </SubTitle>
                          <View
                            style={{ paddingHorizontal: 5, marginVertical: 10 }}
                          >
                            <SubTitle style={{ fontSize: 16 }}>
                              {quantityAvailable}
                            </SubTitle>
                          </View>
                        </View>
                      ) : (
                        <CustomTextInput
                          icons="emty"
                          value={quantityAvailable}
                          onPressHandler={setquantityAvailable}
                          Voicekey="eQuantityAvailable"
                          heading={t("common:Quantity_Available")}
                          keyboard="numeric"
                          headingStyle={{
                            color: theme.colors.gray[900],
                            fontSize: 16,
                            marginLeft: 3,
                          }}
                          placeholder={""}
                          passwordtype={false}
                          draftType={""}
                          draftvalue={""}
                        />
                      )}

                      <View style={styles.ht10} />

                      <View style={{ height: 5 }} />

                      <ScreensButton
                        bgcolor={
                          cost == "" &&
                            size == "" &&
                            color == "" &&
                            location == "" &&
                            supplier == ""
                            ? theme.colors.primary[500]
                            : theme.colors.yellow[400]
                        }
                        btnTitle={t("common:DETAILS")}
                        iconName=""
                        onPress={HandleDetailBtn}
                      />

                      {showDetail ? (
                        userData?.userInfo?.UserType === 5 ||
                          shopName != id.substr(0, 4) ? (
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderBottomColor: theme.colors.gray[800],
                              marginLeft: 10,
                              marginBottom: 7,
                            }}
                          >
                            <SubTitle
                              style={{
                                fontSize: 16,
                                color: theme.colors.gray[900],
                              }}
                            >
                              {t("common:Product_Details")}
                            </SubTitle>
                            <View style={{ paddingHorizontal: 5 }}>
                              <TextInput
                                editable={false}
                                style={{
                                  fontSize: 16,
                                  color: "#000",
                                  fontFamily: FONT_GOOGLE_BARLOW_SEMIBOLD,
                                  height: 90,
                                  textAlignVertical: "top",
                                }}
                                multiline={true}
                                numberOfLines={5}
                                value={fulldescription}
                              />
                            </View>
                          </View>
                        ) : (
                          <CustomTextInput
                            icons="speak"
                            value={fulldescription}
                            onPressHandler={setfulldescription}
                            Voicekey="eFULLDescription"
                            heading={t("common:Product_Details")}
                            lines={5}
                            isMultiLine={true}
                            isTextArea={true}
                            headingStyle={{
                              color: theme.colors.gray[900],
                              fontSize: 16,
                              marginLeft: 3,
                            }}
                            placeholder={""}
                            passwordtype={false}
                            err={
                              error
                                ? theme.colors.red[900]
                                : theme.colors.gray[800]
                            }
                            draftType={""}
                            draftvalue={""}
                          />
                        )
                      ) : null}

                      {showDetail ? (
                        userData?.userInfo?.UserType === 5 ||
                          shopName != id.substr(0, 4) ? (
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderBottomColor: theme.colors.gray[800],
                              marginLeft: 10,
                              marginBottom: 7,
                            }}
                          >
                            <SubTitle
                              style={{
                                fontSize: 16,
                                color: theme.colors.gray[900],
                              }}
                            >
                              {t("common:COLOR")}
                            </SubTitle>
                            <View
                              style={{
                                paddingHorizontal: 5,
                                marginVertical: 10,
                              }}
                            >
                              <SubTitle style={{ fontSize: 16 }}>
                                {color}
                              </SubTitle>
                            </View>
                          </View>
                        ) : (
                          <AddProductCategories
                            icons="speak"
                            voicekey="selectTire"
                            ref={tireRef}
                            label={t("common:COLOR")}
                            sheetlabel={t("common:LIST_OF_COLORS")}
                            toAdd={t("common:ADD_MORE_COLOR")}
                            color={theme.colors.gray[900]}
                            list={colorArray ? colorArray : []}
                            deleletitem={deleletitem}
                            value={color}
                            onSelect={setColor}
                            isSubSheet={false}
                            type="clr"
                            delType="4"
                            draftType=""
                            draftvalue={""}
                            reload={colorRefetch}
                            subreload={colorRefetch}
                            isSubSheet2={false}
                            subreload2={subCat2Refetch}
                            onSubSelect={() => console.log()}
                            onSubSelect2={() => console.log()}
                            input={""}
                            setInput={setColor}
                          />
                        )
                      ) : null}
                      {showDetail ? (
                        userData?.userInfo?.UserType === 5 ||
                          shopName != id.substr(0, 4) ? (
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderBottomColor: theme.colors.gray[800],
                              marginLeft: 10,
                              marginBottom: 7,
                            }}
                          >
                            <SubTitle
                              style={{
                                fontSize: 16,
                                color: theme.colors.gray[900],
                              }}
                            >
                              {t("common:LOCATION_IN_SHOP")}
                            </SubTitle>
                            <View
                              style={{
                                paddingHorizontal: 5,
                                marginVertical: 10,
                              }}
                            >
                              <SubTitle style={{ fontSize: 16 }}>
                                {location}
                              </SubTitle>
                            </View>
                          </View>
                        ) : (
                          <AddProductCategories
                            icons="speak"
                            ref={locationRef}
                            voicekey="selectLocation"
                            label={t("common:LOCATION_IN_SHOP")}
                            sheetlabel={t("common:LIST_OF_LOCATION")}
                            toAdd={t("common:ADD_MORE_LOCATION")}
                            color={theme.colors.gray[900]}
                            list={locationArray ? locationArray : []}
                            deleletitem={deleletitem}
                            value={location}
                            onSelect={setLocation}
                            isSubSheet={false}
                            type="loc"
                            delType="5"
                            draftType=""
                            draftvalue={""}
                            reload={locRefetch}
                            subreload={locRefetch}
                            isSubSheet2={false}
                            subreload2={subCat2Refetch}
                            onSubSelect={() => console.log()}
                            onSubSelect2={() => console.log()}
                            input={""}
                            setInput={setLocation}
                          />
                        )
                      ) : null}
                      {showDetail ? (
                        userData?.userInfo?.UserType === 5 ||
                          shopName != id.substr(0, 4) ? (
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderBottomColor: theme.colors.gray[800],
                              marginLeft: 10,
                              marginBottom: 7,
                            }}
                          >
                            <SubTitle
                              style={{
                                fontSize: 16,
                                color: theme.colors.gray[900],
                              }}
                            >
                              {t("common:SUPPLIER")}
                            </SubTitle>
                            <View
                              style={{
                                paddingHorizontal: 5,
                                marginVertical: 10,
                              }}
                            >
                              <SubTitle style={{ fontSize: 16 }}>
                                {supplier}
                              </SubTitle>
                            </View>
                          </View>
                        ) : (
                          <AddProductCategories
                            icons="speak"
                            ref={supplierRef}
                            voicekey="selectSupplier"
                            label={t("common:SUPPLIER")}
                            sheetlabel={t("common:LIST_OF_SUPPLIER")}
                            toAdd={t("common:ADD_MORE_SUPPLIER")}
                            color={theme.colors.gray[900]}
                            list={supplierArray ? supplierArray : []}
                            deleletitem={deleletitem}
                            value={supplier}
                            onSelect={setSupplier}
                            isSubSheet={false}
                            type="supp"
                            delType="6"
                            draftType=""
                            draftvalue={""}
                            reload={supplierRefetch}
                            subreload={supplierRefetch}
                            isSubSheet2={false}
                            subreload2={subCat2Refetch}
                            onSubSelect={() => console.log()}
                            onSubSelect2={() => console.log()}
                            input={""}
                            setInput={setSupplier}
                          />
                        )
                      ) : null}

                      {/* {showDetail ? (
                        userData?.userInfo?.UserType === 5 ||
                        shopName != id.substr(0, 4) ? (
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderBottomColor: theme.colors.gray[800],
                              marginLeft: 10,
                              marginBottom: 7,
                            }}
                          >
                            <SubTitle
                              style={{
                                fontSize: 16,
                                color: theme.colors.gray[900],
                              }}
                            >
                              {t("common:UNIT")}
                            </SubTitle>
                            <View
                              style={{
                                paddingHorizontal: 5,
                                marginVertical: 10,
                              }}
                            >
                              <SubTitle style={{ fontSize: 16 }}>
                                {unit}
                              </SubTitle>
                            </View>
                          </View>
                        ) : (
                          <AddProductCategories
                            label={t("common:UNIT")}
                            sheetlabel={t("common:LIST_OF_UNIT")}
                            toAdd={t("common:ADD_MORE_UNIT")}
                            color={theme.colors.gray[900]}
                            list={unitArray ? unitArray : []}
                            deleletitem={deleletitem}
                            value={unit}
                            onSelect={setUnit}
                            isSubSheet={false}
                            type="unittt"
                            delType="8"
                            draftType="unitdraft"
                            draftvalue={""}
                            reload={unitRefetch}
                            subreload={unitRefetch}
                            isSubSheet2={false}
                            subreload2={unitRefetch}
                            onSubSelect={() => console.log()}
                            onSubSelect2={() => console.log()}
                            input={""}
                            setInput={setUnit}
                          />
                        )
                      ) : null} */}

                      <View style={styles.ht10} />
                      <ScreensButton
                        bgcolor={
                          //new change
                          price !== "" && wholeSale !== "" && cost !== ""
                            ? theme.colors.yellow[400]
                            : theme.colors.primary[500]
                        }
                        btnTitle={t("common:PRICING")}
                        iconName=""
                        onPress={HandlePricingBtn}
                      />

                      {showPricing ? (
                        userData?.userInfo?.UserType === 5 ||
                          shopName != id.substr(0, 4) ? (
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderBottomColor: theme.colors.gray[800],
                              marginLeft: 10,
                              marginBottom: 7,
                            }}
                          >
                            <SubTitle
                              style={{
                                fontSize: 16,
                                color: theme.colors.gray[900],
                              }}
                            >
                              {t("common:RETAIL_PRICE")}
                            </SubTitle>
                            <View
                              style={{
                                paddingHorizontal: 5,
                                marginVertical: 10,
                              }}
                            >
                              <SubTitle style={{ fontSize: 16 }}>
                                {price}
                              </SubTitle>
                            </View>
                          </View>
                        ) : (
                          <CustomTextInput
                            icons="emty"
                            value={price}
                            onPressHandler={setprice}
                            Voicekey="ePrice"
                            heading={t("common:RETAIL_PRICE")}
                            keyboard="numeric"
                            headingStyle={{
                              color: theme.colors.gray[900],
                              fontSize: 16,
                              marginLeft: 3,
                            }}
                            placeholder={""}
                            passwordtype={false}
                            draftType={""}
                            draftvalue={""}
                          />
                        )
                      ) : null}

                      {showPricing ? (
                        userData?.userInfo?.UserType === 5 ||
                          shopName != id.substr(0, 4) ? (
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderBottomColor: theme.colors.gray[800],
                              marginLeft: 10,
                              marginBottom: 7,
                            }}
                          >
                            <SubTitle
                              style={{
                                fontSize: 16,
                                color: theme.colors.gray[900],
                              }}
                            >
                              {t("common:COST")}
                            </SubTitle>
                            <View
                              style={{
                                paddingHorizontal: 5,
                                marginVertical: 10,
                              }}
                            >
                              <SubTitle style={{ fontSize: 16 }}>
                                {cost}
                              </SubTitle>
                            </View>
                          </View>
                        ) : (
                          <CustomTextInput
                            icons="emty"
                            value={cost}
                            onPressHandler={setCost}
                            Voicekey="eCost"
                            heading={t("common:COST")}
                            keyboard="numeric"
                            headingStyle={{
                              color: theme.colors.gray[900],
                              fontSize: 16,
                              marginLeft: 3,
                            }}
                            placeholder={""}
                            passwordtype={false}
                            draftType={""}
                            draftvalue={""}
                          />
                        )
                      ) : null}

                      {showPricing ? (
                        userData?.userInfo?.UserType === 5 ||
                          shopName != id.substr(0, 4) ? (
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderBottomColor: theme.colors.gray[800],
                              marginLeft: 10,
                              marginBottom: 7,
                            }}
                          >
                            <SubTitle
                              style={{
                                fontSize: 16,
                                color: theme.colors.gray[900],
                              }}
                            >
                              {t("common:WHOLESALE")}
                            </SubTitle>
                            <View
                              style={{
                                paddingHorizontal: 5,
                                marginVertical: 10,
                              }}
                            >
                              <SubTitle style={{ fontSize: 16 }}>
                                {wholeSale}
                              </SubTitle>
                            </View>
                          </View>
                        ) : (
                          <CustomTextInput
                            icons="emty"
                            value={wholeSale}
                            onPressHandler={setWholesale}
                            Voicekey="eWholesale"
                            heading={t("common:WHOLESALE")}
                            keyboard="numeric"
                            headingStyle={{
                              color: theme.colors.gray[900],
                              fontSize: 16,
                              marginLeft: 3,
                            }}
                            placeholder={""}
                            passwordtype={false}
                            err={theme.colors.gray[800]}
                            draftType=""
                            draftvalue={""}
                          />
                        )
                      ) : null}

                      <View style={styles.ht10} />

                      <ScreensButton
                        bgcolor={
                          notes == ""
                            ? theme.colors.primary[500]
                            : theme.colors.yellow[400]
                        }
                        btnTitle={t("common:PVTNOTES")}
                        iconName=""
                        onPress={HandleNotesBtn}
                      />

                      {showNotes ? (
                        userData?.userInfo?.UserType === 5 ||
                          shopName != id.substr(0, 4) ? (
                          <View
                            style={{
                              borderBottomWidth: 1,
                              borderBottomColor: theme.colors.gray[800],
                              marginLeft: 10,
                              marginBottom: 7,
                            }}
                          >
                            <SubTitle
                              style={{
                                fontSize: 16,
                                color: theme.colors.gray[900],
                              }}
                            >
                              {t("common:NOTE")}
                            </SubTitle>
                            <View style={{ paddingHorizontal: 5 }}>
                              <TextInput
                                editable={false}
                                style={{
                                  fontSize: 16,
                                  color: "#000",
                                  fontFamily: FONT_GOOGLE_BARLOW_SEMIBOLD,
                                  height: 90,
                                  textAlignVertical: "top",
                                }}
                                multiline={true}
                                numberOfLines={5}
                                value={notes}
                              />
                            </View>
                          </View>
                        ) : (
                          <CustomTextInput
                            icons="speak"
                            value={notes}
                            lines={5}
                            isMultiLine={true}
                            isTextArea={true}
                            onPressHandler={setnotes}
                            Voicekey="enotes"
                            heading={t("common:NOTE")}
                            headingStyle={{
                              color: theme.colors.gray[900],
                              fontSize: 16,
                              marginLeft: 3,
                            }}
                            placeholder={""}
                            passwordtype={false}
                            draftType={""}
                            draftvalue={""}
                          />
                        )
                      ) : null}

                      <View style={styles.ht10} />

                      <ScreensButton
                        bgcolor={
                          image1 == "" &&
                            image2 == "" &&
                            image3 == "" &&
                            image4 == ""
                            ? theme.colors.primary[500]
                            : theme.colors.yellow[400]
                        }
                        btnTitle={t("common:PHOTOS")}
                        iconName=""
                        onPress={HandlePhotoBtn}
                      />

                      {showPics ? (
                        userData?.userInfo?.UserType === 5 ||
                          shopName != id.substr(0, 4) ? (
                          <View style={styles.cameraContainer}>
                            {imageUrl1 ? (
                              <View style={styles.imgBox}>
                                <Image
                                  style={{ width: 100, height: 100 }}
                                  source={{ uri: imageUrl1 }}
                                />
                              </View>
                            ) : null}

                            {image2 ? (
                              <View style={styles.imgBox}>
                                <Image
                                  style={{ width: 100, height: 100 }}
                                  source={{ uri: image2 }}
                                />
                              </View>
                            ) : null}

                            {image3 ? (
                              <View style={styles.imgBox}>
                                <Image
                                  style={{ width: 100, height: 100 }}
                                  source={{ uri: image3 }}
                                />
                              </View>
                            ) : null}

                            {image4 ? (
                              <View style={styles.imgBox}>
                                <Image
                                  style={{ width: 100, height: 100 }}
                                  source={{ uri: image4 }}
                                />
                              </View>
                            ) : null}

                            {image5 ? (
                              <View style={styles.imgBox}>
                                <Image
                                  style={{ width: 100, height: 100 }}
                                  source={{ uri: image5 }}
                                />
                              </View>
                            ) : null}

                            {image6 ? (
                              <View style={styles.imgBox}>
                                <Image
                                  style={{ width: 100, height: 100 }}
                                  source={{ uri: image6 }}
                                />
                              </View>
                            ) : null}

                            {image7 ? (
                              <View style={styles.imgBox}>
                                <Image
                                  style={{ width: 100, height: 100 }}
                                  source={{ uri: image7 }}
                                />
                              </View>
                            ) : null}

                            {image8 ? (
                              <View style={styles.imgBox}>
                                <Image
                                  style={{ width: 100, height: 100 }}
                                  source={{ uri: image8 }}
                                />
                              </View>
                            ) : null}

                            {image9 ? (
                              <View style={styles.imgBox}>
                                <Image
                                  style={{ width: 100, height: 100 }}
                                  source={{ uri: image9 }}
                                />
                              </View>
                            ) : null}

                            {image10 ? (
                              <View style={styles.imgBox}>
                                <Image
                                  style={{ width: 100, height: 100 }}
                                  source={{ uri: image10 }}
                                />
                              </View>
                            ) : null}
                          </View>
                        ) : (
                          <View style={styles.cameraContainer}>
                            <View style={styles.imgBox}>
                              {imageUrl1 ? (
                                <TouchableOpacity
                                  style={{
                                    position: "absolute",
                                    zIndex: 99999,
                                    top: 0,
                                    right: 0,
                                  }}
                                  onPress={() => {
                                    setImage1("");
                                    setimage_1o(null);
                                  }}
                                >
                                  <MaterialIcons
                                    name="cancel"
                                    color={theme.colors.black[0]}
                                    size={25}
                                  />
                                </TouchableOpacity>
                              ) : null}
                              <Avatar
                                onChange={onAvatarChange}
                                setpos={() => setimgposition(1)}
                                pos={imgposition}
                                source={
                                  imageUrl1 ? { uri: imageUrl1 } : images.CAMERA
                                }
                              />
                            </View>

                            {imageUrl1 || imageUrl2 ? (
                              <View style={styles.imgBox}>
                                {imageUrl2 ? (
                                  <TouchableOpacity
                                    style={{
                                      position: "absolute",
                                      zIndex: 99999,
                                      top: 0,
                                      right: 0,
                                    }}
                                    onPress={() => {
                                      setImage2("");
                                      setimage_2o(null);
                                    }}
                                  >
                                    <MaterialIcons
                                      name="cancel"
                                      color={theme.colors.black[0]}
                                      size={25}
                                    />
                                  </TouchableOpacity>
                                ) : null}
                                <Avatar
                                  onChange={onAvatarChange}
                                  setpos={() => setimgposition(2)}
                                  pos={imgposition}
                                  source={
                                    imageUrl2
                                      ? { uri: imageUrl2 }
                                      : images.CAMERA_PLUS
                                  }
                                />
                              </View>
                            ) : null}

                            {imageUrl2 || imageUrl3 ? (
                              <View style={styles.imgBox}>
                                {imageUrl3 ? (
                                  <TouchableOpacity
                                    style={{
                                      position: "absolute",
                                      zIndex: 99999,
                                      top: 0,
                                      right: 0,
                                    }}
                                    onPress={() => {
                                      setImage3("");
                                      setimage_3o(null);
                                    }}
                                  >
                                    <MaterialIcons
                                      name="cancel"
                                      color={theme.colors.black[0]}
                                      size={25}
                                    />
                                  </TouchableOpacity>
                                ) : null}
                                <Avatar
                                  onChange={onAvatarChange}
                                  setpos={() => setimgposition(3)}
                                  pos={imgposition}
                                  source={
                                    imageUrl3
                                      ? { uri: imageUrl3 }
                                      : images.CAMERA_PLUS
                                  }
                                />
                              </View>
                            ) : null}

                            {imageUrl3 || imageUrl4 ? (
                              <View style={styles.imgBox}>
                                {imageUrl4 ? (
                                  <TouchableOpacity
                                    style={{
                                      position: "absolute",
                                      zIndex: 99999,
                                      top: 0,
                                      right: 0,
                                    }}
                                    onPress={() => {
                                      setImage4("");
                                      setimage_4o(null);
                                    }}
                                  >
                                    <MaterialIcons
                                      name="cancel"
                                      color={theme.colors.black[0]}
                                      size={25}
                                    />
                                  </TouchableOpacity>
                                ) : null}
                                <Avatar
                                  onChange={onAvatarChange}
                                  setpos={() => setimgposition(4)}
                                  pos={imgposition}
                                  source={
                                    imageUrl4
                                      ? { uri: imageUrl4 }
                                      : images.CAMERA_PLUS
                                  }
                                />
                              </View>
                            ) : null}

                            {/* {imageUrl4 || imageUrl5 ? (
                              <View style={styles.imgBox}>
                                {imageUrl5 ? (
                                  <TouchableOpacity
                                    style={{
                                      position: "absolute",
                                      zIndex: 99999,
                                      top: 0,
                                      right: 0,
                                    }}
                                    onPress={() => {
                                      setImage5("");
                                      setimage_5o(null);
                                    }}
                                  >
                                    <MaterialIcons
                                      name="cancel"
                                      color={theme.colors.black[0]}
                                      size={25}
                                    />
                                  </TouchableOpacity>
                                ) : null}
                                <Avatar
                                  onChange={onAvatarChange}
                                  setpos={() => setimgposition(5)}
                                  pos={imgposition}
                                  source={
                                    imageUrl5
                                      ? { uri: imageUrl5 }
                                      : images.CAMERA_PLUS
                                  }
                                />
                              </View>
                            ) : null}

                            {imageUrl5 || imageUrl6 ? (
                              <View style={styles.imgBox}>
                                {imageUrl6 ? (
                                  <TouchableOpacity
                                    style={{
                                      position: "absolute",
                                      zIndex: 99999,
                                      top: 0,
                                      right: 0,
                                    }}
                                    onPress={() => {
                                      setImage6("");
                                      setimage_6o(null);
                                    }}
                                  >
                                    <MaterialIcons
                                      name="cancel"
                                      color={theme.colors.black[0]}
                                      size={25}
                                    />
                                  </TouchableOpacity>
                                ) : null}
                                <Avatar
                                  onChange={onAvatarChange}
                                  setpos={() => setimgposition(6)}
                                  pos={imgposition}
                                  source={
                                    imageUrl6
                                      ? { uri: imageUrl6 }
                                      : images.CAMERA_PLUS
                                  }
                                />
                              </View>
                            ) : null}

                            {imageUrl6 || imageUrl7 ? (
                              <View style={styles.imgBox}>
                                {imageUrl7 ? (
                                  <TouchableOpacity
                                    style={{
                                      position: "absolute",
                                      zIndex: 99999,
                                      top: 0,
                                      right: 0,
                                    }}
                                    onPress={() => {
                                      setImage7("");
                                      setimage_7o(null);
                                    }}
                                  >
                                    <MaterialIcons
                                      name="cancel"
                                      color={theme.colors.black[0]}
                                      size={25}
                                    />
                                  </TouchableOpacity>
                                ) : null}
                                <Avatar
                                  onChange={onAvatarChange}
                                  setpos={() => setimgposition(7)}
                                  pos={imgposition}
                                  source={
                                    imageUrl7
                                      ? { uri: imageUrl7 }
                                      : images.CAMERA_PLUS
                                  }
                                />
                              </View>
                            ) : null}

                            {imageUrl7 || imageUrl8 ? (
                              <View style={styles.imgBox}>
                                {imageUrl8 ? (
                                  <TouchableOpacity
                                    style={{
                                      position: "absolute",
                                      zIndex: 99999,
                                      top: 0,
                                      right: 0,
                                    }}
                                    onPress={() => {
                                      setImage8("");
                                      setimage_8o(null);
                                    }}
                                  >
                                    <MaterialIcons
                                      name="cancel"
                                      color={theme.colors.black[0]}
                                      size={25}
                                    />
                                  </TouchableOpacity>
                                ) : null}
                                <Avatar
                                  onChange={onAvatarChange}
                                  setpos={() => setimgposition(8)}
                                  pos={imgposition}
                                  source={
                                    imageUrl8
                                      ? { uri: imageUrl8 }
                                      : images.CAMERA_PLUS
                                  }
                                />
                              </View>
                            ) : null}

                            {imageUrl8 || imageUrl9 ? (
                              <View style={styles.imgBox}>
                                {imageUrl9 ? (
                                  <TouchableOpacity
                                    style={{
                                      position: "absolute",
                                      zIndex: 99999,
                                      top: 0,
                                      right: 0,
                                    }}
                                    onPress={() => {
                                      setImage9("");
                                      setimage_9o(null);
                                    }}
                                  >
                                    <MaterialIcons
                                      name="cancel"
                                      color={theme.colors.black[0]}
                                      size={25}
                                    />
                                  </TouchableOpacity>
                                ) : null}
                                <Avatar
                                  onChange={onAvatarChange}
                                  setpos={() => setimgposition(9)}
                                  pos={imgposition}
                                  source={
                                    imageUrl9
                                      ? { uri: imageUrl9 }
                                      : images.CAMERA_PLUS
                                  }
                                />
                              </View>
                            ) : null}

                            {imageUrl9 || imageUrl10 ? (
                              <View style={styles.imgBox}>
                                {imageUrl10 ? (
                                  <TouchableOpacity
                                    style={{
                                      position: "absolute",
                                      zIndex: 99999,
                                      top: 0,
                                      right: 0,
                                    }}
                                    onPress={() => {
                                      setImage10("");
                                      setimage_10o(null);
                                    }}
                                  >
                                    <MaterialIcons
                                      name="cancel"
                                      color={theme.colors.black[0]}
                                      size={25}
                                    />
                                  </TouchableOpacity>
                                ) : null}
                                <Avatar
                                  onChange={onAvatarChange}
                                  setpos={() => setimgposition(10)}
                                  pos={imgposition}
                                  source={
                                    imageUrl10
                                      ? { uri: imageUrl10 }
                                      : images.CAMERA_PLUS
                                  }
                                />
                              </View>
                            ) : null} */}
                          </View>
                        )
                      ) : null}

                      <View style={styles.ht10} />

                      {userData?.userInfo?.UserType === 5 ||
                        shopName != id.substr(0, 4) ? null : (
                        <ScreensButton
                          bgcolor={
                            barcode != ""
                              ? theme.colors.yellow[400]
                              : theme.colors.primary[500]
                          }
                          btnTitle={
                            barcode != "" ? barcode : t("common:CREATE_BARCODE")
                          }
                          iconName=""
                          onPress={() => HandleCreateBarcodeBtn()}
                        />
                      )}
                      {showBarcode ? (
                        userData?.userInfo?.UserType === 5 ||
                          shopName != id.substr(0, 4) ? null : (
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
                        )
                      ) : null}
                      {showBarcode ? (
                        <>
                          <View style={styles.ht10} />
                          <View style={styles.ht10} />
                        </>
                      ) : null}
                      {showBarcode ? (
                        <ScreensButton
                          bgcolor={theme.colors.black[1000]}
                          btnTitle={t("common:PRINT_BARCODE")}
                          iconName=""
                          // onPress={printHTML}
                          onPress={printBarcode}
                        />
                      ) : null}
                      {/* 
                      <CustomBarCode
                        input={HandleBarcode}
                        barcode={barcode}
                      /> */}

                      <View style={styles.ht10} />

                      {/* <SubTitle style={{ color: '#000' }}>{barcode}</SubTitle> */}
                      {userData?.userInfo?.UserType === 5 ||
                        shopName != id.substr(0, 4) ? (
                        <ScreensButton
                          bgcolor={
                            barcode != ""
                              ? theme.colors.yellow[400]
                              : theme.colors.primary[500]
                          }
                          btnTitle={
                            barcode != "" ? barcode : t("common:NO_BARCODE")
                          }
                          iconName=""
                          onPress={() => console.log("pressed")}
                        />
                      ) : (
                        <CustomBarCode
                          input={HandleBarcode}
                          barcode={barcode}
                        />
                      )}
                      <View style={styles.ht10} />
                      {userData?.userInfo?.UserType === 5 ||
                        shopName != id.substr(0, 4) ? (
                        <ScreensButton
                          bgcolor={theme.colors.green[700]}
                          btnTitle={t("common:IM_DONE")}
                          iconName=""
                          onPress={() => navigation.navigate(previousScreen)}
                        />
                      ) : (
                        <ScreensButton
                          bgcolor={theme.colors.green[700]}
                          btnTitle={
                            loading ? (
                              <Spinner
                                size={30}
                                color={theme.colors.appWhite[100]}
                              />
                            ) : (
                              t("common:EDITSAVE")
                            )
                          }
                          iconName=""
                          onPress={handleSubmit}
                        />
                      )}

                      <View style={styles.ht10} />
                    </ScrollView>
                  </View>
                </KeyboardAwareScrollView>
              </>
            );
          }}
          stickyHeaderIndices={[0]}
        />
      </View>
    </NativeBaseProvider>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.appWhite[100],
  },
  ht10: {
    height: 10,
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
    justifyContent: "center",
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
    position: "relative",
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

export default EditScreen;
