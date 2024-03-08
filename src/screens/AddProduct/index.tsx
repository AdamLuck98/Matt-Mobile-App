import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
  BackHandler,
  Modal,
  SafeAreaView,
  Keyboard,
  Button,
} from "react-native";
import {
  NativeBaseProvider,
  Actionsheet,
  useDisclose,
  Divider,
  FlatList,
  Spinner,
} from "native-base";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-community/async-storage";
import { theme } from "../../theme";
import images from "../../assets/images/index";
import CommonHeader from "../../components/CommonHeader";
import AddProductCategories from "../../components/AddProductCatagory/index";
import ScreensButton from "../../components/ScreenButtom";
import CustomTextInput from "../../components/TextInput/index";
import { SubTitle } from "../../components/Typography";
import { Avatar } from "../../components/Avatar";
import { ImageOrVideo } from "react-native-image-crop-picker";
import useUserInfo from "../../hooks/useUserInfo";
import CustomBarCode from "../../components/CustomBarCode";
import { useFocusEffect } from "@react-navigation/native";
import { useGetCategoriesData } from "../AddProduct/Queries/useGetCategoriesData";
import { useGetSizeData } from "./Queries/useGetSizeData";
import { useGetLocationData } from "./Queries/useGetLocationData";
import { useGetSubCatData } from "./Queries/useGetSUbCatData";
import { useGetSubCat2Data } from "./Queries/useGetSubCatData2";
import { useGetSupplierData } from "./Queries/useGetSupplierData";
import useDropDownDelColor from "./Queries/useDeleteColor";
import useDropDownDelLocation from "./Queries/useDeleteLocation";
import useDropDownDelSupplier from "./Queries/useDeleteSupplierData";
import { useGetColor } from "./Queries/useGetColor";
import addpropductInInventory from "./Queries/addPropductOprations";
import useDropDownDelSize from "./Queries/useDeleteSizeData";
import useDropDownOperation from "./Queries/useDropDownOperations";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import useSetMasterCatategory from "../../components/AddProductCatagory/Queries/useSetMasterCategory";
import { useGetUnitData } from "./Queries/useGetUnitData";
import useDropDownDelUnit from "./Queries/useDeleteUnitData";
import { voiceStart } from "../../redux/reducers/VoiceToText/action";
import CustomTextInput2 from "../../components/TextInput2";

function AddProduct(props: any) {
  const { navigation, route } = props;
  const { isOpen, onOpen, onClose } = useDisclose();
  const dispatch = useDispatch();
  const userData = useUserInfo();
  const [Values, setValues] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showPics, setShowPics] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [master, setMaster] = useState("");
  const [subcategory, setsubcategory] = useState("");
  const [subcategory2, setsubcategory2] = useState("");
  const [productTitle, setproductTitle] = useState("");
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
  const flatlistRef = useRef();
  const categoriesRef = useRef();
  const sizeRef = useRef();
  const productTitleRef = useRef();
  const tireRef = useRef();
  const speedLoadRef = useRef();
  const locationRef = useRef();
  const supplierRef = useRef();

  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [listid, setListid] = useState("");

  const [draftmaster, setdraftMaster] = useState("");
  const [draftproductTitle, setdraftproductTitle] = useState("");
  const [draftfulldescription, setdraftfulldescription] = useState("");
  const [draftquantityAvailable, setdraftquantityAvailable] = useState("");
  const [draftprice, setdraftprice] = useState("");
  const [draftcost, setdraftcost] = useState("");
  const [draftWholesale, setdraftWholesale] = useState("");
  const [draftUnit, setdraftUnit] = useState("");
  const [draftsize, setdraftSize] = useState("");
  const [draftcolor, setdraftColor] = useState("");
  const [draftlocation, setdraftLocation] = useState("");
  const [draftsupplier, setdraftSupplier] = useState("");
  const [draftnotes, setdraftnotes] = useState("");
  const [masterInput, setMasterInput] = useState("");
  const [sub1Input, setSub1Input] = useState("");
  const [sub2Input, setSub2Input] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [supplierInput, setSupplierInput] = useState("");
  const [unitInput, setUnitInput] = useState("");

  const {
    data: dashData,
    refetch: catRefetch,
    isLoading: masterload,
  } = useGetCategoriesData({
    UserId: userData?.userInfo?.UserId || "",
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

  const { data: SubCatData, refetch: subCatRefetch } = useGetSubCatData({
    userid: userData?.userInfo?.UserId || "",
    mastercat: master || "string",
    suball: 1,
  });

  const { data: SubCat2Data, refetch: subCat2Refetch } = useGetSubCat2Data({
    userid: userData?.userInfo?.UserId || "",
    mastercat: master,
    suball: 1,
    subcat_1: subcategory || "string",
  });

  useEffect(() => {
    subCat2Refetch();
  }, [subcategory]);

  useEffect(() => { }, [productTitle, error]); //changes for product title issue

  const categoryArr = dashData?.CatData;
  const lists = categoryArr?.split(",").sort((a, b) => a.localeCompare(b));
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

  const { t, i18n } = useTranslation();
  const voicesKey = useSelector((states) => states.VoiceKeys);
  const voicesresult = useSelector((states) => states.VoiceResultReducer);

  const { deleteSize } = useDropDownOperation();
  const { productadd } = addpropductInInventory();
  const { deleteSizeData } = useDropDownDelSize();
  const { deleteColorData } = useDropDownDelColor();
  const { deleteLocationData } = useDropDownDelLocation();
  const { deleteSupplierData } = useDropDownDelSupplier();
  const { deleteUnitData } = useDropDownDelUnit();

  const backAction = () => {
    setModalVisible(true);
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setModalVisible(true);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const setSelectedItem = (value: string, type: any) => {
    switch (type) {
      case "selectCategories":
        setMaster(value);
        break;
      case "selectSize":
        setSize(value);
        break;
      case "selectTire":
        setColor(value);
        break;
      case "selectSpeedLoadRatings":
        setUnit(value);
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
      case "selectSpeedLoadRatings":
        speedLoadRef.current?.handleAdd();
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
      case "selectSpeedLoadRatings":
        speedLoadRef.current?.handleClose();
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
        case "selectSpeedLoadRatings":
          array = unitArray;
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
    // Product title
    // setproductTitle(Values.toString());
  };

  useEffect(() => {
    switch (voicesKey) {
      case "ProductTitile":
        {
          console.log("Values.toString()" + Values.toString());
          if (Values && Values.length > 0) {
            selectCategoryFromVoice(Values.toString(), "ProductTitile");
          }
        }
        break;

      case "selectCategories":
        {
          console.log("Values.toString()" + Values.toString());
          if (Values && Values.length > 0) {
            selectCategoryFromVoice(Values.toString(), "selectCategories");
          }
        }
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

      case "FULLDescription":
        {
          setfulldescription(Values.toString());
        }
        break;

      case "QuantityAvailable":
        {
          setquantityAvailable(Values.toString());
        }
        break;

      case "Price":
        {
          setprice(Values.toString());
        }
        break;
      case "NOTE":
        {
          setnotes(Values.toString());
        }
        break;
      case "cost":
        {
          setCost(Values.toString());
        }
        break;
      case "wholesale":
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
    AsyncStorage.getItem("master-draft").then((value) => {
      if (value != null) {
        setdraftMaster(value);
      } else {
        setdraftMaster("");
      }
    });

    AsyncStorage.getItem("size-draft").then((value) => {
      console.log("size --> ", JSON.stringify(value))
      if (value != null) {
        setdraftSize(value);
      } else {
        setdraftSize("");
      }
    });

    AsyncStorage.getItem("color-draft").then((value) => {
      if (value != null) {
        setdraftColor(value);
      } else {
        setdraftColor("");
      }
    });

    AsyncStorage.getItem("location-draft").then((value) => {
      if (value != null) {
        setdraftLocation(value);
      } else {
        setdraftLocation("");
      }
    });

    AsyncStorage.getItem("supplier-draft").then((value) => {
      if (value != null) {
        setdraftSupplier(value);
      } else {
        setdraftSupplier("");
      }
    });

    AsyncStorage.getItem("titl-edraft").then((value) => {
      if (value != null) {
        setdraftproductTitle(value);
      } else {
        setdraftproductTitle("");
      }
    });

    AsyncStorage.getItem("description-draft").then((value) => {
      if (value != null) {
        setdraftfulldescription(value);
      } else {
        setdraftfulldescription("");
      }
    });

    AsyncStorage.getItem("quantity-draft").then((value) => {
      if (value != null) {
        setdraftquantityAvailable(value);
      } else {
        setdraftquantityAvailable("");
      }
    });

    AsyncStorage.getItem("price-draft").then((value) => {
      if (value != null) {
        setdraftprice(value);
      } else {
        setdraftprice("");
      }
    });

    AsyncStorage.getItem("cost-draft").then((value) => {
      if (value != null) {
        setdraftcost(value);
      } else {
        setdraftcost("");
      }
    });
    AsyncStorage.getItem("wholesale-draft").then((value) => {
      if (value != null) {
        setdraftWholesale(value);
      } else {
        setdraftWholesale("");
      }
    });
    AsyncStorage.getItem("notes-draft").then((value) => {
      if (value != null) {
        setdraftnotes(value);
      } else {
        setdraftnotes("");
      }
    });
    AsyncStorage.getItem("unit-draft").then((value) => {
      if (value != null) {
        setdraftUnit(value);
      } else {
        setdraftUnit("");
      }
    });
  }, [
    draftmaster,
    draftsize,
    draftcolor,
    draftlocation,
    draftsupplier,
    draftproductTitle,
    draftfulldescription,
    draftquantityAvailable,
    draftprice,
    draftcost,
    draftWholesale,
    draftnotes,
    draftUnit,
  ]);

  function clearDraft() {
    setMaster("");
    setsubcategory("");
    setsubcategory2("");
    setfulldescription("");
    setproductTitle("");
    setquantityAvailable("");
    setprice("");
    setCost("");
    setSize("");
    setColor("");
    setLocation("");
    setSupplier("");
    setSupplier("");
    setWholesale("");
    setUnit("");
    setnotes("");
    setImage1("");
    setImage2("");
    setImage3("");
    setImage4("");
    setImage5("");
    setImage6("");
    setImage7("");
    setImage8("");
    setImage9("");
    setImage10("");
    setShowPics(false);
    setsubcategory("");
    setbarcode("");
    setimage_1o(null);
    setimage_2o(null);
    setimage_3o(null);
    setimage_4o(null);
    setimage_5o(null);
    setimage_6o(null);
    setimage_7o(null);
    setimage_8o(null);
    setimage_9o(null);
    setimage_10o(null);
    setimgposition(0);
    setdraftMaster("");
    setdraftfulldescription("");
    setdraftproductTitle("");
    setdraftquantityAvailable("");
    setdraftprice("");
    setdraftcost("");
    setdraftSize("");
    setdraftColor("");
    setdraftLocation("");
    setdraftSupplier("");
    setdraftWholesale("");
    setdraftnotes("");
    setdraftUnit("");
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
    setShowDetail(false);
    setShowNotes(false);
    setShowPics(false);
  }

  function handleBackYes() {
    setModalVisible(false);
    navigation.navigate("Home");
  }

  function handleBackNo() {
    setModalVisible(false);
    deleteOnNo();
    clearDraft();
    navigation.navigate("Home");
  }

  useEffect(() => {
    setValues(voicesresult);
  });

  function HandleDetailBtn() {
    setShowDetail(!showDetail);
    // setShowNotes(false); // new Changes
    // setShowPics(false); // new Changes
    Keyboard.dismiss();
  }

  function HandlePricingBtn() {
    setShowPricing(!showPricing);
    // setShowNotes(false); // new Changes
    // setShowPics(false); // new Changes
    Keyboard.dismiss();
  }

  function HandleNotesBtn() {
    setShowNotes(!showNotes);
    // setShowDetail(false); // new Changes
    // setShowPics(false); // new Changes
    Keyboard.dismiss();
  }

  function HandlePhotoBtn() {
    setShowPics(!showPics);
    // setShowNotes(false);
    // setShowDetail(false);
    Keyboard.dismiss();
  }

  const onAvatarChange = (image: ImageOrVideo) => {
    var obj = {
      name: "image_" + imgposition + ".jpg",
      isset: 0,
      type: image.mime,
      uri:
        Platform.OS == "android" ? image.path : image.path.replace("", "file:"),
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
        osname: Platform.OS === "android" ? "and" : "ios",
        mastercat: cat,
      };
      const response: any = await deleteSize(Datamaster);
      if (response.ResponseMsg === "Delete Successful") {
        catRefetch();
      } else if (response.ResponseMsg === "Record Not Empty") {
        Alert.alert("Record Not Empty. Cannot delete");
      }
    }
    if (type === "2") {
      const SubselectData: any = {
        UserId: userData?.userInfo?.UserId || "",
        osname: Platform.OS === "android" ? "and" : "ios",
        subcat_1: cat,
      };
      const response: any = await deleteSize(SubselectData);
      if (response.ResponseMsg === "Delete Successful") {
        subCatRefetch();
      }
    }
    if (type === "3") {
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
        osname: Platform.OS === "android" ? "and" : "ios",
        subcat_2: cat,
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

  const deleteOnNo = async () => {
    if (masterInput !== "") {
      const Datamaster: any = {
        UserId: userData?.userInfo?.UserId || "",
        osname: Platform.OS === "android" ? "and" : "ios",
        mastercat: masterInput,
        catagory: masterInput,
      };
      const response: any = await deleteSize(Datamaster);
      if (response.ResponseMsg === "Delete Successful") {
        catRefetch();
      }
    }
    if (sub1Input !== "") {
      const SubselectData: any = {
        UserId: userData?.userInfo?.UserId || "",
        osname: Platform.OS === "android" ? "and" : "ios",
        mastercat: master,
        subcat_1: sub1Input,
        catagory: sub1Input,
      };
      const response: any = await deleteSize(SubselectData);
      if (response.ResponseMsg === "Delete Successful") {
        subCatRefetch();
      }
    }
    if (sub2Input !== "") {
      const SubselectData: any = {
        UserId: userData?.userInfo?.UserId || "",
        osname: Platform.OS === "android" ? "and" : "ios",
        mastercat: master,
        subcat_1: subcategory,
        subcat_2: sub2Input,
        catagory: sub2Input,
      };
      const response: any = await deleteSize(SubselectData);
      if (response.ResponseMsg === "Delete Successful") {
        subCat2Refetch();
      }
    }
    if (sizeInput !== "") {
      const SizeData: any = {
        UserId: userData?.userInfo?.UserId || "",
        supplier: sizeInput,
      };
      const response: any = await deleteSizeData(SizeData);
      if (response.ResponseMsg === "Records Updated") {
        sizeRefetch();
      }
    }
    if (colorInput !== "") {
      const ColorData: any = {
        UserId: userData?.userInfo?.UserId || "",
        supplier: colorInput,
      };
      const response: any = await deleteColorData(ColorData);
      if (response.ResponseMsg === "Records Updated") {
        colorRefetch();
      }
    }
    if (locationInput !== "") {
      const LocationData: any = {
        UserId: userData?.userInfo?.UserId || "",
        location: locationInput,
      };
      const response: any = await deleteLocationData(LocationData);
      if (response.ResponseMsg === "Records Updated") {
        locRefetch();
      }
    }
    if (supplierInput !== "") {
      const SupplierData: any = {
        UserId: userData?.userInfo?.UserId || "",
        supplier: supplierInput,
      };
      const response: any = await deleteSupplierData(SupplierData);
      if (response.ResponseMsg === "Records Updated") {
        supplierRefetch();
      }
    }
    if (unitInput !== "") {
      const UnitDataData: any = {
        UserId: userData?.userInfo?.UserId || "",
        unit: unitInput,
      };
      const response: any = await deleteUnitData(UnitDataData);
      if (response.ResponseMsg === "Records Updated") {
        unitRefetch();
      }
    }
  };

  const scrollToIndex = () => {
    let index = 0;
    flatlistRef?.current.scrollToIndex({ index: index });
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (master === "" || size === "") {
      setError(true);
      scrollToIndex();
    } else {
      setError(false);
      addPropductOprations();
    }
  };

  const ImDone = () => {
    clearDraft();
    onClose();
    navigation.navigate("Home");
  };

  const AddDifferentItem = () => {
    clearDraft();
    onClose();
  };

  const addSimilarAlert = () =>
    Alert.alert("", t("common:ADD_SIMILAR_ALERT"), [
      { text: "OK", onPress: () => scrollToIndex() },
    ]);

  const addSimilarItem = () => {
    onClose();
    addSimilarAlert();
    setbarcode("");
  };

  const HandleBarcode = (v: any) => {
    setbarcode(v);
  };

  const addPropductOprations = async () => {
    setisLoading(true);
    const addpropductData: any = {
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
      R_wholesaleprice: wholeSale,
      R_cost: cost,
      R_unit: unit,
      R_notes: notes,
      R_size: size,
      R_color: color,
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
    const response: any = await productadd(addpropductData);
    if (response == undefined) {
      setisLoading(false);
      clearDraft();
      Alert.alert("Something went wrong.");
    } else if (response.ResponseMsg === "Sucessfull") {
      setisLoading(false);
      setListid(response.listingid);
      console.log("The value ---LLL:", response.listingid);
      // Old Code
      //onOpen();
      //MARK:- New Code
      navigation.navigate("CreateBarcode", {
        stockNumber: response.listingid,
        clearDraftMain: clearDraft,
      });
    }
  };

  // const capitalize  = () =>{
  //   const str = draftproductTitle;
  //   const arr = str.split(" ");
  //   for (var i = 0; i < arr.length; i++) {
  //     arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  // }
  // const str2 = arr.join(" ");
  // console.log(str2);
  // return(draftproductTitle)
  // }

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <FlatList
            data={[{ key: 1 }]}
            ref={flatlistRef}
            keyboardShouldPersistTaps="always"
            ListHeaderComponent={() => {
              return (
                <>
                  <StatusBar
                    animated={true}
                    backgroundColor={theme.colors.black[1100]}
                  />
                  <CommonHeader
                    headerBg={images.HEADER_BG_SKY}
                    isback="yes"
                    onBackPress={backAction}
                  />
                </>
              );
            }}
            renderItem={() => {
              return (
                <View style={styles.subContainer}>
                  <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
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
                            <SubTitle style={styles.modalText}>
                              {t("common:WANT_TO_SAVE")}
                            </SubTitle>
                          </View>
                          <TouchableOpacity
                            style={styles.modalBorder}
                            onPress={handleBackYes}
                          >
                            <SubTitle style={styles.textStyle}>
                              {t("common:YES")}
                            </SubTitle>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.modalBorder}
                            onPress={handleBackNo}
                          >
                            <SubTitle style={styles.textStyle}>
                              {t("common:NO")}
                            </SubTitle>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                          >
                            <SubTitle
                              style={[styles.textStyle, styles.btnText]}
                            >
                              {t("common:CANCEL")}
                            </SubTitle>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                    {/* <Button title="click" onPress={()=> console.log("master", master)} /> */}
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      keyboardShouldPersistTaps="always"
                    >
                      <CustomBarCode input={HandleBarcode} barcode={barcode} />

                      <View style={styles.ht10} />
                      <AddProductCategories
                        ref={categoriesRef}
                        icons="speak"
                        voicekey="selectCategories"
                        label={t("common:Categories")}
                        sheetlabel={t("common:SELECT_MASTER_CATEGORY")}
                        toAdd={t("common:ADD_MORE_CATEGORY")}
                        // color={theme.colors.red[900]}
                        color={
                          error ? theme.colors.red[900] : theme.colors.red[900]
                        }
                        list={lists ? lists : []}
                        // subList={SubCatArray}
                        // subList2={SubCat2Array}
                        deleletitem={deleletitem}
                        value={master}
                        onSelect={(text) => {
                          setMaster(text);
                        }}
                        // subValue={subcategory}
                        // subValue2={subcategory2}
                        // onSubSelect={setsubcategory}
                        // onSubSelect2={setsubcategory2}
                        isSubSheet={false}
                        isSubSheet2={false}
                        err={
                          error ? theme.colors.red[900] : theme.colors.red[900]
                        }
                        type="mCat"
                        input={masterInput}
                        setInput={setMasterInput}
                        // setInput1={setSub1Input}
                        // setInput2={setSub2Input}
                        delType="1"
                        delSubType="2"
                        delSubType2="7"
                        draftType="masterdraft"
                        draftvalue={draftmaster}
                        reload={catRefetch}
                      // subreload={subCatRefetch}
                      // subreload2={subCat2Refetch}
                      />
                      <View style={styles.ht10} />
                      <AddProductCategories
                        ref={sizeRef}
                        icons="speak"
                        voicekey="selectSize"
                        label={t("common:SIZE")}
                        sheetlabel={t("common:LIST_OF_SIZES")}
                        toAdd={t("common:ADD_MORE_SIZES")}
                        // color={theme.colors.gray[900]}
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
                        draftType="sizedraft"
                        draftvalue={draftsize}
                        reload={sizeRefetch}
                        subreload={sizeRefetch}
                        isSubSheet2={false}
                        subreload2={subCat2Refetch}
                        onSubSelect={() => console.log()}
                        onSubSelect2={() => console.log()}
                        input={sizeInput}
                        setInput={setSizeInput}
                        err={
                          error ? theme.colors.red[900] : theme.colors.gray[900]
                        }
                      />
                      <View style={styles.ht10} />
                      <AddProductCategories
                        ref={productTitleRef}
                        icons="speak"
                        voicekey="ProductTitile"
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
                        draftvalue={draftproductTitle}
                        reload={sizeRefetch}
                        subreload={sizeRefetch}
                        isSubSheet2={false}
                        subreload2={subCat2Refetch}
                        onSubSelect={() => console.log()}
                        onSubSelect2={() => console.log()}
                        input={titleInput}
                        setInput={setTitleInput}
                        err={
                          error ? theme.colors.red[900] : theme.colors.gray[900]
                        }
                      />
                      {/* <CustomTextInput
                        icons="speak"
                        value={productTitle}
                        onPressHandler={(text) => {
                          setproductTitle(text);
                        }}
                        Voicekey="ProductTitile"
                        heading={t("common:Product_Titile")}
                        headingStyle={{
                          color: theme.colors.gray[900],
                          fontSize: 16,
                          marginLeft: 3,
                        }}
                        placeholder={""}
                        passwordtype={false}
                        err={theme.colors.gray[800]}
                        draftType="titledraft"
                        draftvalue={draftproductTitle}
                      /> */}
                      <View style={styles.ht10} />

                      <CustomTextInput
                        icons="emty"
                        value={quantityAvailable}
                        onPressHandler={setquantityAvailable}
                        Voicekey="QuantityAvailable"
                        heading={t("common:Add_Quantity")}
                        keyboard="numeric"
                        headingStyle={{
                          color: theme.colors.gray[900],
                          fontSize: 16,
                          marginLeft: 3,
                        }}
                        err={theme.colors.gray[800]}
                        placeholder={""}
                        passwordtype={false}
                        draftType="quantitydraft"
                        draftvalue={draftquantityAvailable}
                      />
                      <View style={styles.ht10} />

                      <ScreensButton
                        bgcolor={
                          fulldescription !== "" &&
                            color !== "" &&
                            location !== "" &&
                            supplier !== ""
                            ? theme.colors.yellow[400]
                            : theme.colors.primary[500]
                        }
                        btnTitle={t("common:DETAILS")}
                        iconName=""
                        onPress={HandleDetailBtn}
                      />

                      {showDetail ? (
                        <CustomTextInput
                          icons="speak"
                          value={fulldescription}
                          onPressHandler={setfulldescription}
                          Voicekey="FULLDescription"
                          heading={t("common:Product_Details")}
                          isMultiLine={true}
                          lines={4}
                          isTextArea={true}
                          headingStyle={{
                            color: theme.colors.gray[900],
                            fontSize: 16,
                            marginLeft: 3,
                          }}
                          err={theme.colors.gray[800]}
                          placeholder={""}
                          passwordtype={false}
                          draftType="descriptiondraft"
                          draftvalue={draftfulldescription}
                        />
                      ) : null}
                      {showDetail ? (
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
                          draftType="colordraft"
                          draftvalue={draftcolor}
                          reload={colorRefetch}
                          subreload={colorRefetch}
                          isSubSheet2={false}
                          subreload2={subCat2Refetch}
                          onSubSelect={() => console.log()}
                          onSubSelect2={() => console.log()}
                          input={colorInput}
                          setInput={setColorInput}
                        />
                      ) : null}
                      {/* {showDetail ? (
                        <AddProductCategories
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
                          draftType="colordraft"
                          draftvalue={draftcolor}
                          reload={colorRefetch}
                          subreload={colorRefetch}
                          isSubSheet2={false}
                          subreload2={subCat2Refetch}
                          onSubSelect={() => console.log()}
                          onSubSelect2={() => console.log()}
                          input={colorInput}
                          setInput={setColorInput}
                        />
                      ) : null} */}
                      {/* New Changes */}
                      {/* {showDetail ? (
                        <AddProductCategories
                          icons="mic"
                          ref={speedLoadRef}
                          voicekey="selectSpeedLoadRatings"
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
                          draftvalue={draftUnit}
                          reload={unitRefetch}
                          subreload={unitRefetch}
                          isSubSheet2={false}
                          subreload2={unitRefetch}
                          onSubSelect={() => console.log()}
                          onSubSelect2={() => console.log()}
                          input={unitInput}
                          setInput={setUnitInput}
                        />
                      ) : null} */}
                      {showDetail ? (
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
                          draftType="locationdraft"
                          draftvalue={draftlocation}
                          reload={locRefetch}
                          subreload={locRefetch}
                          isSubSheet2={false}
                          subreload2={subCat2Refetch}
                          onSubSelect={() => console.log()}
                          onSubSelect2={() => console.log()}
                          input={locationInput}
                          setInput={setLocationInput}
                        />
                      ) : null}

                      {showDetail ? (
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
                          draftType="supplierdraft"
                          draftvalue={draftsupplier}
                          reload={supplierRefetch}
                          subreload={supplierRefetch}
                          isSubSheet2={false}
                          subreload2={subCat2Refetch}
                          onSubSelect={() => console.log()}
                          onSubSelect2={() => console.log()}
                          input={supplierInput}
                          setInput={setSupplierInput}
                        />
                      ) : null}

                      <View style={styles.ht10} />

                      {/* <CustomTextInput
                        icons="emty"
                        value={quantityAvailable}
                        onPressHandler={setquantityAvailable}
                        Voicekey="QuantityAvailable"
                        heading={t("common:Quantity_Available")}
                        keyboard="numeric"
                        headingStyle={{
                          color: theme.colors.gray[900],

                          fontSize: 16,
                          marginLeft: 3,
                        }}
                        err={theme.colors.gray[800]}
                        placeholder={""}
                        passwordtype={false}
                        draftType="quantitydraft"
                        draftvalue={draftquantityAvailable}
                      />
                      <View style={styles.ht10} /> */}
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
                      <View style={{ height: 10 }} />
                      {showPricing ? (
                        <>
                          <CustomTextInput
                            icons="emty"
                            value={price}
                            onPressHandler={setprice}
                            Voicekey="Price"
                            heading={t("common:RETAIL_PRICE")}
                            keyboard="numeric"
                            headingStyle={{
                              color: theme.colors.gray[900],
                              fontSize: 16,
                              marginLeft: 3,
                            }}
                            placeholder={""}
                            passwordtype={false}
                            err={theme.colors.gray[800]}
                            draftType="pricedraft"
                            draftvalue={draftprice}
                          />

                          {/* <View style={{ height: 5 }} /> */}

                          <CustomTextInput
                            icons="emty"
                            value={wholeSale}
                            onPressHandler={setWholesale}
                            Voicekey="wholesale"
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
                            draftType="wholesaledraft"
                            draftvalue={draftWholesale}
                          />
                          {/* <View style={{ height: 5 }} /> */}
                          <CustomTextInput
                            icons="emty"
                            value={cost}
                            onPressHandler={setCost}
                            Voicekey="cost"
                            heading={t("common:COST")}
                            keyboard="numeric"
                            headingStyle={{
                              color: theme.colors.gray[900],
                              fontSize: 16,
                              marginLeft: 3,
                            }}
                            placeholder={""}
                            passwordtype={false}
                            err={theme.colors.gray[800]}
                            draftType="costdraft"
                            draftvalue={draftcost}
                          />
                        </>
                      ) : null}
                      {/* <ScreensButton
                        bgcolor={
                          cost == '' && size == '' && color == '' && location == '' && supplier == '' && wholeSale == '' && unit == '' ?
                            theme.colors.primary[500] :
                            theme.colors.yellow[400]
                        }
                        btnTitle={t("common:DETAILS")}
                        iconName=""
                        onPress={HandleDetailBtn}
                      />

                      {showDetail ? (
                        <CustomTextInput
                          icons="emty"
                          value={cost}
                          onPressHandler={setCost}
                          Voicekey="cost"
                          heading={t("common:COST")}
                          keyboard="numeric"
                          headingStyle={{
                            color: theme.colors.gray[900],
                            fontSize: 16,
                            marginLeft: 3,
                          }}
                          placeholder={""}
                          passwordtype={false}
                          err={theme.colors.gray[800]}
                          draftType="costdraft"
                          draftvalue={draftcost}
                        />
                      ) : null}

                      {showDetail ? (
                        <CustomTextInput
                          icons="emty"
                          value={wholeSale}
                          onPressHandler={setWholesale}
                          Voicekey="wholesale"
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
                          draftType="wholesaledraft"
                          draftvalue={draftWholesale}
                        />
                      ) : null}

                      {showDetail ? (
                        <AddProductCategories
                          label={t("common:SIZE")}
                          sheetlabel={t("common:LIST_OF_SIZES")}
                          toAdd={t("common:ADD_MORE_SIZES")}
                          color={theme.colors.gray[900]}
                          list={sizeArray ? sizeArray : []}
                          subList={SubCatArray}
                          deleletitem={deleletitem}
                          value={size}
                          onSelect={setSize}
                          isSubSheet={false}
                          type="size"
                          delType="3"
                          draftType="sizedraft"
                          draftvalue={draftsize}
                          reload={sizeRefetch}
                          subreload={sizeRefetch}
                          isSubSheet2={false}
                          subreload2={subCat2Refetch}
                          onSubSelect={() => console.log()}
                          onSubSelect2={() => console.log()}
                          input={sizeInput}
                          setInput={setSizeInput}
                        />
                      ) : null}
                      {showDetail ? (
                        <AddProductCategories
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
                          draftType="colordraft"
                          draftvalue={draftcolor}
                          reload={colorRefetch}
                          subreload={colorRefetch}
                          isSubSheet2={false}
                          subreload2={subCat2Refetch}
                          onSubSelect={() => console.log()}
                          onSubSelect2={() => console.log()}
                          input={colorInput}
                          setInput={setColorInput}
                        />
                      ) : null}
                      {showDetail ? (
                        <AddProductCategories
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
                          draftType="locationdraft"
                          draftvalue={draftlocation}
                          reload={locRefetch}
                          subreload={locRefetch}
                          isSubSheet2={false}
                          subreload2={subCat2Refetch}
                          onSubSelect={() => console.log()}
                          onSubSelect2={() => console.log()}
                          input={locationInput}
                          setInput={setLocationInput}
                        />
                      ) : null}
                      {showDetail ? (
                        <AddProductCategories
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
                          draftType="supplierdraft"
                          draftvalue={draftsupplier}
                          reload={supplierRefetch}
                          subreload={supplierRefetch}
                          isSubSheet2={false}
                          subreload2={subCat2Refetch}
                          onSubSelect={() => console.log()}
                          onSubSelect2={() => console.log()}
                          input={supplierInput}
                          setInput={setSupplierInput}
                        />
                      ) : null}

                      {showDetail ? (
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
                          draftvalue={draftUnit}
                          reload={unitRefetch}
                          subreload={unitRefetch}
                          isSubSheet2={false}
                          subreload2={unitRefetch}
                          onSubSelect={() => console.log()}
                          onSubSelect2={() => console.log()}
                          input={unitInput}
                          setInput={setUnitInput}
                        />
                      ) : null} */}

                      {/* <View style={styles.ht10} /> */}

                      <ScreensButton
                        bgcolor={
                          //new change
                          notes !== ""
                            ? theme.colors.yellow[400]
                            : theme.colors.primary[500]
                        }
                        btnTitle={t("common:PVTNOTES")}
                        iconName=""
                        onPress={HandleNotesBtn}
                      />
                      {showNotes ? (
                        <CustomTextInput
                          icons="speak"
                          value={notes}
                          onPressHandler={setnotes}
                          isMultiLine={true}
                          lines={5}
                          isTextArea={true}
                          Voicekey="NOTE"
                          heading={t("common:NOTES")}
                          headingStyle={{
                            color: theme.colors.gray[900],
                            fontSize: 16,
                            marginLeft: 3,
                          }}
                          placeholder={""}
                          passwordtype={false}
                          err={theme.colors.gray[800]}
                          draftType={"notesdraft"}
                          draftvalue={draftnotes}
                        />
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
                        <View style={styles.cameraContainer}>
                          <View style={styles.imgBox}>
                            {image1 ? (
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
                              source={image1 ? { uri: image1 } : images.CAMERA}
                            />
                          </View>

                          {image1 || image2 ? (
                            <View style={styles.imgBox}>
                              {image2 ? (
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
                                  image2 ? { uri: image2 } : images.CAMERA_PLUS
                                }
                              />
                            </View>
                          ) : null}

                          {image2 || image3 ? (
                            <View style={styles.imgBox}>
                              {image3 ? (
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
                                  image3 ? { uri: image3 } : images.CAMERA_PLUS
                                }
                              />
                            </View>
                          ) : null}

                          {image3 || image4 ? (
                            <View style={styles.imgBox}>
                              {image4 ? (
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
                                  image4 ? { uri: image4 } : images.CAMERA_PLUS
                                }
                              />
                            </View>
                          ) : null}

                          {/* {image4 || image5 ? (
                            <View style={styles.imgBox}>
                              {image5 ? <TouchableOpacity
                                style={{ position: 'absolute', zIndex: 99999, top: 0, right: 0 }}
                                onPress={() => { setImage5(''); setimage_5o(null) }}
                              >
                                <MaterialIcons name="cancel" color={theme.colors.black[0]} size={25} />
                              </TouchableOpacity> : null}
                              <Avatar onChange={onAvatarChange}
                                setpos={() => setimgposition(5)}
                                pos={imgposition}
                                source={
                                  image5 ? { uri: image5 } : images.CAMERA_PLUS
                                }
                              />
                            </View>
                          ) : null}

                          {image5 || image6 ? (
                            <View style={styles.imgBox}>
                              {image6 ? <TouchableOpacity
                                style={{ position: 'absolute', zIndex: 99999, top: 0, right: 0 }}
                                onPress={() => { setImage6(''); setimage_6o(null) }}
                              >
                                <MaterialIcons name="cancel" color={theme.colors.black[0]} size={25} />
                              </TouchableOpacity> : null}
                              <Avatar onChange={onAvatarChange}
                                setpos={() => setimgposition(6)}
                                pos={imgposition}
                                source={
                                  image6 ? { uri: image6 } : images.CAMERA_PLUS
                                }
                              />
                            </View>
                          ) : null}

                          {image6 || image7 ? (
                            <View style={styles.imgBox}>
                              {image7 ? <TouchableOpacity
                                style={{ position: 'absolute', zIndex: 99999, top: 0, right: 0 }}
                                onPress={() => { setImage7(''); setimage_7o(null) }}
                              >
                                <MaterialIcons name="cancel" color={theme.colors.black[0]} size={25} />
                              </TouchableOpacity> : null}
                              <Avatar onChange={onAvatarChange}
                                setpos={() => setimgposition(7)}
                                pos={imgposition}
                                source={
                                  image7 ? { uri: image7 } : images.CAMERA_PLUS
                                }
                              />
                            </View>
                          ) : null}

                          {image7 || image8 ? (
                            <View style={styles.imgBox}>
                              {image8 ? <TouchableOpacity
                                style={{ position: 'absolute', zIndex: 99999, top: 0, right: 0 }}
                                onPress={() => { setImage8(''); setimage_8o(null) }}
                              >
                                <MaterialIcons name="cancel" color={theme.colors.black[0]} size={25} />
                              </TouchableOpacity> : null}
                              <Avatar onChange={onAvatarChange}
                                setpos={() => setimgposition(8)}
                                pos={imgposition}
                                source={
                                  image8 ? { uri: image8 } : images.CAMERA_PLUS
                                }
                              />
                            </View>
                          ) : null}

                          {image8 || image9 ? (
                            <View style={styles.imgBox}>
                              {image9 ? <TouchableOpacity
                                style={{ position: 'absolute', zIndex: 99999, top: 0, right: 0 }}
                                onPress={() => { setImage9(''); setimage_9o(null) }}
                              >
                                <MaterialIcons name="cancel" color={theme.colors.black[0]} size={25} />
                              </TouchableOpacity> : null}
                              <Avatar onChange={onAvatarChange}
                                setpos={() => setimgposition(9)}
                                pos={imgposition}
                                source={
                                  image9 ? { uri: image9 } : images.CAMERA_PLUS
                                }
                              />
                            </View>
                          ) : null}

                          {image9 || image10 ? (
                            <View style={styles.imgBox}>
                              {image10 ? <TouchableOpacity
                                style={{ position: 'absolute', zIndex: 99999, top: 0, right: 0 }}
                                onPress={() => { setImage10(''); setimage_10o(null) }}
                              >
                                <MaterialIcons name="cancel" color={theme.colors.black[0]} size={25} />
                              </TouchableOpacity> : null}
                              <Avatar onChange={onAvatarChange}
                                setpos={() => setimgposition(10)}
                                pos={imgposition}
                                source={
                                  image10
                                    ? { uri: image10 }
                                    : images.CAMERA_PLUS
                                }
                              />
                            </View>
                          ) : null} */}
                        </View>
                      ) : null}

                      <View style={styles.ht10} />

                      <ScreensButton
                        bgcolor={theme.colors.green[700]}
                        btnTitle={
                          isLoading ? (
                            <Spinner
                              size={30}
                              color={theme.colors.appWhite[100]}
                            />
                          ) : (
                            t("common:ADD_RECORD")
                          )
                        }
                        iconName=""
                        onPress={handleSubmit}

                      // onPress={() =>
                      //   navigation.navigate('CreateBarcode', {
                      //     stockNumber: listid,
                      //   })
                      // }
                      />

                      {/* <Actionsheet isOpen={isOpen} onClose={onClose}>
                        <Actionsheet.Content style={styles.sheetstyle}>
                          <SubTitle style={styles.modaltext}>
                            {t("common:YOUR_STOCK_NUM_IS")}:
                          </SubTitle>
                          <SubTitle style={styles.modaltext}>{listid}</SubTitle>
                          <View style={styles.space} />
                          <Divider my={1} />
                          <TouchableOpacity onPress={addSimilarItem}>
                            <SubTitle style={styles.modalbtntext}>
                              {t("common:ADD_SIMILAR_ITEM")}
                            </SubTitle>
                          </TouchableOpacity>
                          <View style={styles.space} />
                          <Divider my={1} />
                          <TouchableOpacity onPress={AddDifferentItem}>
                            <SubTitle style={styles.modalbtntext}>
                              {t("common:ADD_DIFFERENT_ITEM")}
                            </SubTitle>
                          </TouchableOpacity>
                          <View style={styles.space} />
                          <Divider my={1} />
                          <TouchableOpacity
                            onPress={() => {
                              ImDone();
                            }}
                          >
                            <SubTitle style={styles.modalbtntext}>
                              {t("common:IM_DONE")}
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
                      </Actionsheet> */}
                      <View style={styles.ht10} />
                    </ScrollView>
                  </KeyboardAwareScrollView>
                </View>
              );
            }}
            stickyHeaderIndices={[0]}
          />
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

// define your styles
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
  ///////
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
});

export default AddProduct;
function convertFirstCharacterToUppercase(word: any) {
  throw new Error("Function not implemented.");
}
