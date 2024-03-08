import React, { useEffect, useState, useRef } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  FlatList,
  BackHandler,
  Button,
  TouchableOpacity,
  Text,
  Keyboard,
} from "react-native";
import { useTranslation } from "react-i18next";
import { theme } from "../../theme";
import images from "../../assets/images";
import CommonHeader from "../../components/CommonHeader/index";
import ScreensButton from "../../components/ScreenButtom";
import CustomTextInput from "../../components/TextInput";
import AddProductCategories from "../../components/AddProductCatagory";
import { useGetCategoriesData } from "../AddProduct/Queries/useGetCategoriesData";
import useUserInfo from "../../hooks/useUserInfo";
import CustomBarCode from "../../components/CustomBarCode";
import useDropDownOperation from "../AddProduct/Queries/useDropDownOperations";
import { useDispatch, useSelector } from "react-redux";
import {
  barcodeKey,
  categoryKey,
  detailsKey,
  showDetail,
  StockKey,
  StockNumber,
  subcategoryKey,
  subcategoryKey2,
  color,
  size,
} from "../../redux/reducers/SerchScreenReducer/Action";
import SearchProductCategories from "./components/SearchProductCategories";
import { useGetSubCatData } from "../AddProduct/Queries/useGetSUbCatData";
import { useGetSubCat2Data } from "../AddProduct/Queries/useGetSubCatData2";
import { SubTitle } from "../../components/Typography";
import { useIsFocused } from "@react-navigation/native";
import { useGetColor } from "../AddProduct/Queries/useGetColor";
import { useGetSizeData } from "../AddProduct/Queries/useGetSizeData";
import { voiceStart } from "../../redux/reducers/VoiceToText/action";

function Search(props: any) {
  const [stockNum, setStockNum] = useState("");
  const [keyword, setKeyword] = useState("");
  const [barcode, setBarcode] = useState("");
  const [category, setCategory] = useState("");

  const [colors, setColor] = useState("");
  const [sizes, setSize] = useState("");

  const [subCategory, setSubCategory] = useState("");
  const [subCategory2, setSubCategory2] = useState("");

  const [details, setDetails] = useState("");
  const [Values, setValues] = useState("");
  const categoriesRef = useRef();
  const sizeRef = useRef();
  const tireRef = useRef();
  const { navigation, route } = props;
  const userData = useUserInfo();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { deleteSize } = useDropDownOperation();
  const voicesKey = useSelector((states) => states.VoiceKeys);
  const serchdata = useSelector((state) => state?.SerchScreenSort);
  const { data: dashData, refetch } = useGetCategoriesData({
    UserId: userData?.userInfo?.UserId || "",
  });
  const isFocused = useIsFocused();
  const [colorInput, setColorInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");

  const { data: SubCatData, refetch: subCatRefetch } = useGetSubCatData({
    userid: userData?.userInfo?.UserId || "",
    mastercat: category || "string",
    suball: 1,
  });

  const { data: SubCat2Data, refetch: subCat2Refetch } = useGetSubCat2Data({
    userid: userData?.userInfo?.UserId || "",
    mastercat: category,
    suball: 1,
    subcat_1: subCategory || "string",
  });

  const { data: sizeData, refetch: sizeRefetch } = useGetSizeData({
    UserId: userData?.userInfo?.UserId || "",
  });

  useEffect(() => {
    subCatRefetch();
  }, [category]);

  useEffect(() => {
    subCat2Refetch();
  }, [subCategory]);
  const { data: colorData, refetch: colorRefetch } = useGetColor({
    userid: userData?.userInfo?.UserId || "",
    suball: 1,
  });
  const categoryArr = dashData?.CatData;
  const lists = categoryArr?.split(",").sort((a, b) => a.localeCompare(b));
  const getSubCatArr = SubCatData?.CatData;
  const SubCatArray = getSubCatArr?.split(",");
  const getSubCat2Arr = SubCat2Data?.CatData;
  const SubCat2Array = getSubCat2Arr?.split(",");
  const colorArr = colorData?.ColData;
  const colorArray = colorArr?.split(",");
  const sizeArr = sizeData?.SizData;
  const sizeArray = sizeArr?.split(",");
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

  const voicesresult = useSelector((states) => states.VoiceResultReducer);

  useEffect(() => {
    switch (voicesKey) {
      case "keyword":
        {
          setKeyword(Values.toString());
        }
        break;

      case "stockNum":
        {
          setStockNum(Values.toString());
        }
        break;

      case "details":
        {
          setDetails(Values.toString());
        }
        break;

      case "searchCate":
        {
          if (Values && Values.length > 0) {
            selectCategoryFromVoice(Values.toString(), "searchCate");
          }
        }
        break;

      case "searchColor":
        {
          if (Values && Values.length > 0) {
            selectCategoryFromVoice(Values.toString(), "searchColor");
          }
        }
        break;

      case "searchSize":
        {
          if (Values && Values.length > 0) {
            selectCategoryFromVoice(Values.toString(), "searchSize");
          }
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
    setValues(voicesresult);
  });

  const selectCategoryFromVoice = (values: string, type?: string) => {
    let selectedItem = "";
    let found = false;
    if (values && values.length > 0) {
      let array: any = [];
      switch (type) {
        case "searchCate":
          array = lists;
          break;
        case "searchSize":
          array = sizeArray;
          break;
        case "searchColor":
          array = colorArray;
          break;
        default:
          break;
      }
      array?.map((item: any) => {
        if (item.match(values)) {
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

  const setSelectedItem = (value: string, type: any) => {
    switch (type) {
      case "searchCate":
        setCategory(value);
        break;
      case "searchSize":
        setSize(value);
        break;
      case "searchColor":
        setColor(value);
        break;
      default:
        break;
    }
  };

  const closeModal = (type: any) => {
    switch (type) {
      case "searchCate":
        categoriesRef.current?.handleClose();
        break;
      case "searchSize":
        sizeRef.current?.handleClose();
        break;
      case "searchColor":
        tireRef.current?.handleClose();
        break;
      default:
        break;
    }
    voiceStart(false);
  };

  const openModal = (type: any) => {
    switch (type) {
      case "searchCate":
        categoriesRef.current?.handleAdd();
        break;
      case "searchSize":
        sizeRef.current?.handleAdd();
        break;
      case "searchColor":
        tireRef.current?.handleAdd();
        break;
      default:
        break;
    }
    voiceStart(false);
  };

  const HandleBarcode = (v: any) => {
    setBarcode(v);
    Keyboard.dismiss();
  };

  const handlegoback = () => {
    navigation.goBack();
    setValues("");
    setDetails("");
    setBarcode("");
    setKeyword("");
    setStockNum("");
    setCategory("");
    setSubCategory("");
    setSubCategory2("");
    setColor("");
    setSize("");
    setColorInput("");
    setSizeInput("");
  };
  function handleBackButtonClick() {
    navigation.goBack();
    setValues("");
    setDetails("");
    setBarcode("");
    setKeyword("");
    setStockNum("");
    setCategory("");
    setSubCategory("");
    setSubCategory2("");
    setColor("");
    setSize("");
    setColorInput("");
    setSizeInput("");
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <CommonHeader
          headerBg={images.HEADER_BG_SKY}
          goback={() => handlegoback()}
        />
        <View style={styles.subContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            {isFocused ? (
              <CustomBarCode
                input={HandleBarcode}
                barcode={barcode}
                search="search"
              />
            ) : null}
            <View style={styles.ht10} />

            <CustomTextInput
              icons="emty"
              value={stockNum}
              onPressHandler={setStockNum}
              Voicekey="stockNum"
              heading={t("common:SEARCH_BY_STOCK_NUM")}
              err={theme.colors.gray[800]}
              headingStyle={{
                color: theme.colors.gray[900],
                fontSize: 16,
                marginLeft: 3,
              }}
            />

            <CustomTextInput
              icons="speak"
              value={keyword}
              onPressHandler={setKeyword}
              Voicekey="keyword"
              heading={t("common:SEARCH_BY_KEYWORD")}
              err={theme.colors.gray[800]}
              headingStyle={{
                color: theme.colors.gray[900],
                fontSize: 16,
                marginLeft: 3,
              }}
            />

            <View style={{ paddingLeft: 5 }}>
              <SearchProductCategories
                label={t("common:SEARCH_BY_CATEGORY")}
                color={theme.colors.gray[900]}
                sheetlabel={t("common:SELECT_MASTER_CATEGORY")}
                list={lists}
                // subList={SubCatArray}
                // subList2={SubCat2Array}
                value={category}
                onSelect={setCategory}
                isSubSheet={false}
                isSubSheet2={false}
                subValue={subCategory}
                subValue2={subCategory2}
                onSubSelect={setSubCategory}
                onSubSelect2={setSubCategory2}
                voicekey="searchCate"
                icons={"speak"}
                ref={categoriesRef}
              />
            </View>

            <AddProductCategories
              editTable={true}
              label={t("common:SEARCH_BY_TIRE_TYPE")}
              sheetlabel={t("common:LIST_OF_COLORS")}
              toAdd={t("common:ADD_MORE_COLOR")}
              color={theme.colors.gray[900]}
              list={colorArray ? colorArray : []}
              deleletitem={deleletitem}
              value={colors}
              onSelect={setColor}
              isSubSheet={false}
              type="clr"
              delType="4"
              draftType="colordraft"
              // draftvalue={draftcolor}
              reload={colorRefetch}
              subreload={colorRefetch}
              isSubSheet2={false}
              subreload2={subCat2Refetch}
              onSubSelect={() => console.log()}
              onSubSelect2={() => console.log()}
              input={colorInput}
              setInput={setColorInput}
              draftvalue={""}
              voicekey="searchColor"
              icons={"speak"}
              ref={tireRef}
            />

            <AddProductCategories
              editTable={true}
              label={t("common:SIZE")}
              sheetlabel={t("common:LIST_OF_SIZES")}
              toAdd={t("common:ADD_MORE_SIZES")}
              color={theme.colors.gray[900]}
              list={sizeArray ? sizeArray : []}
              deleletitem={deleletitem}
              value={sizes}
              onSelect={setSize}
              isSubSheet={false}
              type="size"
              delType="3"
              draftType="sizedraft"
              // draftvalue={draftsize}
              reload={sizeRefetch}
              subreload={sizeRefetch}
              isSubSheet2={false}
              subreload2={subCat2Refetch}
              onSubSelect={() => console.log()}
              onSubSelect2={() => console.log()}
              input={sizeInput}
              setInput={setSizeInput}
              draftvalue={""}
              voicekey="searchSize"
              icons={"speak"}
              ref={sizeRef}
            />

            {/* <CustomTextInput
              icons="mic"
              value={details}
              onPressHandler={setDetails}
              Voicekey="details"
              heading={t('common:SEARCH_WITH_DETAILS')}
              err={theme.colors.gray[800]}
              headingStyle={{ color: theme.colors.gray[900], fontSize: 16, marginLeft: 3 }}
            /> */}

            <View style={styles.ht10} />

            <ScreensButton
              btnTitle={t("common:SEARCH_THIS_LOCATION")}
              bgcolor={theme.colors.primary[1100]}
              iconName={""}
              onPress={() => {
                navigation.navigate("Thislocation", {
                  previousscreen: "SearchProduct",
                });
                dispatch(StockNumber(stockNum));
                dispatch(StockKey(keyword));
                dispatch(barcodeKey(barcode));
                dispatch(categoryKey(category));
                dispatch(subcategoryKey(subCategory));
                dispatch(subcategoryKey2(subCategory2));
                dispatch(detailsKey(details));
                dispatch(color(colors));
                dispatch(size(sizes));
                dispatch(showDetail(1));
                Keyboard.dismiss();
              }}
            />

            <View style={styles.ht10} />

            <ScreensButton
              btnTitle={t("common:SEARCH_ALL_LOCATION")}
              bgcolor={theme.colors.black[1000]}
              iconName={""}
              onPress={() => {
                navigation.navigate("Allocation", {
                  previousscreen: "SearchProduct",
                });
                dispatch(StockNumber(stockNum));
                dispatch(StockKey(keyword));
                dispatch(barcodeKey(barcode));
                dispatch(categoryKey(category));
                dispatch(subcategoryKey(subCategory));
                dispatch(subcategoryKey2(subCategory2));
                dispatch(showDetail(1));
                dispatch(color(colors));
                dispatch(size(sizes));
              }}
            />

            <View style={styles.ht10} />

            <ScreensButton
              btnTitle={t("common:CLEAR_SEARCH")}
              bgcolor={theme.colors.yellow[400]}
              iconName={""}
              onPress={() => {
                setStockNum("");
                setKeyword("");
                setCategory("");
                setSubCategory("");
                setSubCategory2("");
                setDetails("");
                setBarcode("");
                setColor("");
                setSize("");
                setColorInput("");
                setSizeInput("");

                dispatch(categoryKey(""));
                dispatch(subcategoryKey(""));
                dispatch(subcategoryKey2(""));
                dispatch(StockNumber(""));
                dispatch(StockKey(""));
                dispatch(barcodeKey(""));
                // dispatch(showDetail(1))
                dispatch(color(""));
                dispatch(size(""));
              }}
            />

            <View style={styles.ht10} />

            {/* <ScreensButton
              btnTitle={t('common:SHOW_OUT_OF_STOCK')}
              bgcolor={theme.colors.red[900]}
              iconName={""}
              onPress={() => {
                navigation.navigate("OutStock", { previousscreen: "SearchProduct" })
                dispatch(StockNumber(stockNum))
                dispatch(StockKey(keyword))
                dispatch(barcodeKey(barcode))
                dispatch(categoryKey(category))
                dispatch(subcategoryKey(subCategory))
                dispatch(subcategoryKey2(subCategory2))
                dispatch(showDetail(1))
              }
              }
            /> */}
            <View style={styles.ht10} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Search;
const styles = StyleSheet.create({
  safeAreaView: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: theme.colors.appWhite[100],
  },
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    marginTop: 5,
    paddingTop: 15,
    paddingHorizontal: 10,
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.appWhite[800],
  },
  ht10: { height: 10 },
});
