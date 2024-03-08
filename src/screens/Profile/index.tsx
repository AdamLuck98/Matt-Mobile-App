import React, { useEffect, useState } from "react";
import { FlatList, Spinner, View } from "native-base";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  TouchableWithoutFeedback,
  Modal,
  BackHandler,
} from "react-native";
import { Actionsheet, useDisclose } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import images from "../../assets/images/index";
import { RootStackParamList } from "../../navigation";
import CustomTextInput from "../../components/CustomTextInput/index";
import useUserInfo from "../../hooks/useUserInfo";
import CustomModal from "../../components/CustomModal/Customodal";
import { Caption, SubTitle } from "../../components/Typography";
import { theme } from "../../theme";
import { useGetUserData } from "./Queries/useGetUserData";
import addkizbinprofile from "./Queries/useSaveUserOperations";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AddProfileState from "../../components/AddProfileState";
import AntDesign from "react-native-vector-icons/AntDesign";
import ScreensButton from "../../components/ScreenButtom";
import { useSelector, useDispatch } from "react-redux";
import { ProfileLoad } from "../../redux/reducers/ProfileScreenReducer/Action";
import { useFocusEffect } from "@react-navigation/native";

export type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ProfileScreen"
>;

function ProfileScreen(props: ProfileScreenProps) {
  const userData = useUserInfo();
  const serchdata = useSelector((state) => state?.LoadProfileScreen);
  const dispatch = useDispatch();

  const {
    data: profileData,
    refetch: ProfileRefetch,
    isLoading,
  } = useGetUserData({
    UserId: userData?.userInfo?.UserId || "",
  });

  const { navigation } = props;
  const { t, i18n } = useTranslation();
  const lang = t("common:lang")
  const [companyName, setCompanyName] = useState(profileData?.CompanyName || "");
  const [firstName, SetFirstName] = useState(profileData?.contact_fname || "");
  const [lastName, setLastName] = useState(profileData?.contact_lname || "");
  const [cellNumber, setCellNumber] = useState(profileData?.cellphone || "");
  const [storePhonne, setStorePhone] = useState(profileData?.storephone || "");
  const [address, setAdress] = useState(profileData?.address || "");
  const [city, setCity] = useState(profileData?.city || "");
  const [zip, setZip] = useState(profileData?.zip_postal || "");
  const [email, setEmail] = useState(profileData?.email || "");
  const [Password, setPassword] = useState(profileData?.password || "");
  const [empPassword, setEmpPassword] = useState(profileData?.limit_password || "");
  const [wholeSalePassword, setWholesalePassword] = useState(profileData?.whole_password || "");
  const [associate, setAssociate] = useState(profileData?.associate || "");
  const [delivery, setDelivery] = useState(profileData?.d_charge || "");
  const [taxRate, setTaxRate] = useState(profileData?.tax_rate || "");
  const [serviceCharge, setServiceCharges] = useState(profileData?.d_gratuity || "");
  const [operation, setOperation] = useState(profileData?.op_hours || "");
  const [termsCondition, setTermsCondition] = useState(profileData?.disclaimer || "");
  const [selected, setSelected] = useState("Yes");
  const [r_enable, setenable] = useState(1)
  const [selected2, setSelected2] = useState("Yes");
  const [selected3, setSelected3] = useState("");
  const [stateId, setStateId] = useState("");
  const [actionsheet, setActionsheet] = useState("Yes");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [prephone, setPrephone] = useState(profileData?.prephone);
  const [flags, setFlags] = useState(profileData?.flags);
  const [isAssoVisible, setAssoVisible] = useState(false);
  const [isEmpPassVisible, setEmpPassVisible] = useState(false);
  const [isWholeinfoVisible, setWholeInfoVisible] = useState(false);
  const [isTermsVisible, setTermsVisible] = useState(false);
  const [showEmpPsswrd, setShowEmpPsswrd] = useState(false);
  const [showWholePsswrd, setShowWholePsswrd] = useState(false);
  const [showAssociate, setShowAssociate] = useState(false);
  const [showCharges, setShowCharges] = useState(false);
  const [showTax, setShowTax] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [successModal, setSuccessModal] = useState(false)
  const [fakeLoading, setFakeLoading] = useState(false);

  // console.log("profileData", JSON.stringify(profileData?.whole_password, null, 7))
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setmodalVisible(true);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );


  useEffect(() => {
    if (profileData) {
      setCompanyName(profileData?.CompanyName);
      SetFirstName(profileData?.contact_fname);
      setLastName(profileData?.contact_lname);
      setCellNumber(profileData?.cellphone);
      setStorePhone(profileData?.storephone);
      setAdress(profileData?.address);
      setCity(profileData?.city);
      setSelected3(profileData?.state);
      setZip(profileData?.zip_postal);
      setEmail(profileData?.email);
      setPassword(profileData?.password);
      setEmpPassword(profileData?.limit_password);
      setWholesalePassword(profileData?.whole_password);
      setAssociate(profileData?.associate);
      setDelivery(profileData?.d_charge);
      setTaxRate(profileData?.tax_rate);
      setServiceCharges(profileData?.d_gratuity);
      setOperation(profileData?.op_hours);
      setPrephone(profileData?.prephone);
      setSelected(selected);
      setSelected2(selected2);
      setTermsCondition(profileData?.disclaimer);
      setFlags(profileData?.flags);
    }
  }, [profileData]);

  useEffect(() => {
    if (profileData) {
      // console.log("profileData?.states",JSON.stringify( profileData?.states, null ,2))
      profileData?.states.map((item: any) => {
        if (item.title === profileData?.state) {
          setStateId(item?.id)
          return 0
        }
      })
    }
  }, [profileData])

  useEffect(() => {
    // console.log('invoked>>', serchdata);
    if (serchdata === 1) {
      setFakeLoading(false);
      // console.log('fake is false')
      setCompanyName(profileData?.CompanyName);
      SetFirstName(profileData?.contact_fname);
      setLastName(profileData?.contact_lname);
      setCellNumber(profileData?.cellphone);
      setStorePhone(profileData?.storephone);
      setAdress(profileData?.address);
      setCity(profileData?.city);
      setSelected3(profileData?.state);
      setZip(profileData?.zip_postal);
      setEmail(profileData?.email);
      setPassword(profileData?.password);
      setEmpPassword(profileData?.limit_password);
      setWholesalePassword(profileData?.whole_password);
      setAssociate(profileData?.associate);
      setDelivery(profileData?.d_charge);
      setTaxRate(profileData?.tax_rate);
      setServiceCharges(profileData?.d_gratuity);
      setOperation(profileData?.op_hours);
      setPrephone(profileData?.prephone);
      setSelected(selected);
      setSelected2(selected2);
      setTermsCondition(profileData?.disclaimer);
      setFlags(profileData?.flags);
    }
  }, [serchdata]);

  if (fakeLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner size={30} />
      </View>
    );
  }

  const { addprofile } = addkizbinprofile();
  const addPropductOprations = async () => {
    setloading(true);
    const addpropductData: any = {
      do: "saveuser",
      CompanyName: companyName,
      contact_fname: firstName,
      contact_lname: lastName,
      cellphone: cellNumber,
      storephone: storePhonne,
      address: address,
      city: city,
      prephone: prephone,
      state_prov: stateId === "" ? 0 : Number(stateId),
      userstate: stateId === "" ? 0 : Number(stateId),
      password: Password,
      zip_postal: zip,
      email: email,
      limit_password: empPassword,
      whole_password: wholeSalePassword,
      associate: associate,
      d_charge: delivery,
      d_enable: r_enable,
      op_hours: operation,
      tax_rate: taxRate,
      UserName: userData?.userInfo?.UserName || "",
      userid: userData?.userInfo?.UserId || "",
      disclaimer: termsCondition,
      flags: flags,
      lang: lang === "English" ? "en" : "es",
    };
    console.log("profile save user request body", JSON.stringify(addpropductData, null, 2));
    const response: any = await addprofile(addpropductData);
    console.log("profile save user response body>>", JSON.stringify(response, null, 2));
    if (response.ResponseMsg === "Sucessfull") {
      onClose();
      setloading(false);
      setSuccessModal(true);
      ProfileRefetch();
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner size={30} />
      </View>
    );
  }

  function handleBackNo() {
    setmodalVisible(false);
    navigation.goBack();
    dispatch(ProfileLoad(0))
    ProfileRefetch();
    setFakeLoading(true);
  }

  function handleBackYes() {
    setmodalVisible(false);
    // addPropductOprations();
    navigation.goBack();
  }

  const backAction = () => {
    setmodalVisible(true);
    return true;
  };

  return (
    <SafeAreaView style={styles.safecontainer}>
      <FlatList
        data={[{ key: 1 }]}
        ListHeaderComponent={() => {
          return (
            <ImageBackground
              source={images.PROFILE_HEADER}
              style={styles.headerImg}
            >
              <View style={styles.header}>
                <View style={styles.w50}>
                  <SubTitle style={styles.headerText}>
                    {t("common:USERNAME")}:
                  </SubTitle>
                  <SubTitle style={styles.headerText}>
                    {t("common:YOUR_WEB_LINK")}:
                  </SubTitle>
                </View>
                <View style={styles.w40}>
                  <SubTitle style={styles.headerText}>
                    {profileData?.UserName}
                  </SubTitle>
                  <SubTitle style={styles.headerText}>
                    {profileData?.UserName}.kizbin.com
                  </SubTitle>
                </View>
                <View style={styles.gobackBox}>
                  <TouchableOpacity
                    onPress={() => {
                      backAction();
                    }}
                  >
                    <Image source={images.BACK} />
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          );
        }}
        renderItem={({ item, index }) => {
          return (
            <KeyboardAwareScrollView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.container}
            >
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setmodalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={styles.modalBorder}>
                      <SubTitle style={styles.modalText}>{t('common:WANT_TO_SAVE')}</SubTitle>
                    </View>
                    <TouchableOpacity style={styles.modalBorder} onPress={handleBackYes}>
                      <SubTitle style={styles.textStyle}>{t('common:YES')}</SubTitle>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalBorder} onPress={handleBackNo}>
                      <SubTitle style={styles.textStyle}>{t('common:NO')}</SubTitle>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setmodalVisible(!modalVisible)}
                    >
                      <SubTitle style={[styles.textStyle, styles.btnText]}>cancel</SubTitle>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <Modal
                animationType="slide"
                transparent={true}
                visible={successModal}
                onRequestClose={() => {
                  setSuccessModal(!successModal);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    {/* <View style={styles.modalBorder}>
                      <SubTitle style={styles.modalText}>{t('common:SUCCESS')}</SubTitle>
                    </View> */}
                    <View style={styles.modalBorder}>
                      <Caption style={styles.textStyle}>{t('common:RECORD_UPDATED')}</Caption>
                    </View>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        setSuccessModal(!successModal);
                        navigation.navigate("Home");
                        dispatch(ProfileLoad(0))
                        ProfileRefetch();
                        setFakeLoading(true);
                      }}
                    >
                      <SubTitle style={[styles.textStyle, styles.btnText]}>
                        ok
                      </SubTitle>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <ImageBackground
                style={styles.imgContainer}
                resizeMode="cover"
                source={images.PROFILE_BACKGROUND}
              >

                <View style={styles.formContainer}>
                  {/* <Text>{stateId}</Text> */}
                  <CustomTextInput
                    onPressHandler={setCompanyName}
                    heading={t("common:COMPANY_NAME")}
                    headingStyle={{
                      color: theme.colors.gray[400],
                      height: 30,
                      fontSize: 16,
                      marginLeft: 5,
                      fontWeight: "600",
                    }}
                    err={theme.colors.gray[400]}
                    editable={false}
                    value={companyName}
                    placeholder={""}
                    passwordtype={false}
                  />
                  <CustomTextInput
                    onPressHandler={SetFirstName}
                    heading={t("common:FIRST_NAME")}
                    headingStyle={{
                      color: theme.colors.gray[400],
                      height: 30,
                      fontSize: 16,
                      marginLeft: 5,
                      fontWeight: "600",
                    }}
                    err={theme.colors.gray[400]}
                    value={firstName}
                    placeholder={""}
                    passwordtype={false}
                  />
                  <CustomTextInput
                    onPressHandler={setLastName}
                    heading={t("common:LAST_NAME")}
                    headingStyle={{
                      color: theme.colors.gray[400],
                      height: 30,
                      fontSize: 16,
                      marginLeft: 5,
                      fontWeight: "600",
                    }}
                    err={theme.colors.gray[400]}
                    value={lastName}
                    placeholder={""}
                    passwordtype={false}
                  />
                  <CustomTextInput
                    onPressHandler={setCellNumber}
                    heading={t("common:CELL_NO")}
                    headingStyle={{
                      color: theme.colors.gray[400],
                      height: 30,
                      fontSize: 16,
                      marginLeft: 5,
                      fontWeight: "600",
                    }}
                    err={theme.colors.gray[400]}
                    value={cellNumber}
                    placeholder={""}
                    passwordtype={false}
                  />
                  <CustomTextInput
                    onPressHandler={setStorePhone}
                    heading={t("common:STORE_PHONE")}
                    headingStyle={{
                      color: theme.colors.gray[400],
                      height: 30,
                      fontSize: 16,
                      marginLeft: 5,
                      fontWeight: "600",
                    }}
                    err={theme.colors.gray[400]}
                    value={storePhonne}
                    placeholder={""}
                    passwordtype={false}
                  />
                  <CustomTextInput
                    onPressHandler={setAdress}
                    heading={t("common:ADDRESS")}
                    headingStyle={{
                      color: theme.colors.gray[400],
                      height: 30,
                      fontSize: 16,
                      marginLeft: 5,
                      fontWeight: "600",
                    }}
                    err={theme.colors.gray[400]}
                    value={address}
                    placeholder={""}
                    passwordtype={false}
                  />
                  <CustomTextInput
                    onPressHandler={setCity}
                    heading={t("common:CITY")}
                    headingStyle={{
                      color: theme.colors.gray[400],
                      height: 30,
                      fontSize: 16,
                      marginLeft: 5,
                      fontWeight: "600",
                    }}
                    err={theme.colors.gray[400]}
                    value={city}
                    placeholder={""}
                    passwordtype={false}
                  />

                  <AddProfileState
                    label={t("common:STATE_PROVINCE")}
                    color={theme.colors.gray[400]}
                    list={profileData?.states}
                    value={selected3}
                    onSelect={setSelected3}
                    id={stateId}
                    onIdSelect={setStateId}
                  />

                  <CustomTextInput
                    onPressHandler={setZip}
                    heading={t("common:ZIP")}
                    headingStyle={{
                      color: theme.colors.gray[400],
                      height: 30,
                      fontSize: 16,
                      marginLeft: 5,
                      fontWeight: "600",
                    }}
                    err={theme.colors.gray[400]}
                    value={zip}
                    placeholder={""}
                    passwordtype={false}
                  />

                  <CustomTextInput
                    onPressHandler={setEmail}
                    heading={t("common:EMAIL")}
                    headingStyle={{
                      color: theme.colors.gray[400],
                      height: 30,
                      fontSize: 16,
                      marginLeft: 5,
                      fontWeight: "600",
                    }}
                    err={theme.colors.gray[400]}
                    value={email}
                    placeholder={""}
                    passwordtype={false}
                  />
                  <CustomTextInput
                    onPressHandler={setPassword}
                    heading={t("common:PASSWORD")}
                    headingStyle={{
                      color: theme.colors.gray[400],
                      height: 30,
                      fontSize: 16,
                      marginLeft: 5,
                      fontWeight: "600",
                    }}
                    err={theme.colors.gray[400]}
                    value={Password}
                    placeholder={""}
                    passwordtype={false}
                  />

                  <View>
                    <Text
                      style={{
                        fontSize: 14,
                        paddingLeft: 12,
                        paddingRight: 12,
                        color: theme.colors.red[600],
                      }}
                    >
                      {t("common:PASSWORD_TEXT")}
                    </Text>
                  </View>

                  <CustomModal
                    show={isEmpPassVisible}
                    message={t('common:EMP_PASSSWORD')
                      //  + `(EG: ${profileData?.UserName}.kizbin.com)`
                    }
                    onPress={() => {
                      setEmpPassVisible(!isEmpPassVisible);
                      setShowEmpPsswrd(true);
                    }}
                  />
                  {showEmpPsswrd ? (
                    <View style={{ position: 'relative' }}>
                      <CustomTextInput
                        onPressHandler={setEmpPassword}
                        heading={t("common:EMPLOYEE_PASSWORD")}
                        headingStyle={{
                          color: theme.colors.gray[400],
                          height: 30,
                          fontSize: 16,
                          marginLeft: 5,
                          fontWeight: "600",
                        }}
                        err={
                          empPassword === Password
                            ? theme.colors.red[500]
                            : theme.colors.gray[400]
                        }
                        value={empPassword}
                        placeholder={""}
                        passwordtype={false}
                      />
                      <TouchableOpacity onPress={() => setEmpPassVisible(!isEmpPassVisible)} style={{ position: 'absolute', right: 5, bottom: 10 }}>
                        <AntDesign name='infocirlceo' size={25} color={theme.colors.gray[400]} />
                      </TouchableOpacity>
                    </View>

                  ) : (
                    <View style={{ position: 'relative' }}>
                      <TouchableOpacity
                        onPress={() => setEmpPassVisible(!isEmpPassVisible)}
                      >
                        <SubTitle
                          style={{
                            color: theme.colors.gray[400],
                            height: 30,
                            fontSize: 16,
                            marginLeft: 8,
                          }}
                        >
                          {t("common:EMPLOYEE_PASSWORD")}
                        </SubTitle>
                        <View
                          style={{
                            height: 40,
                            borderBottomWidth: 1,
                            marginHorizontal: 5,
                            borderBottomColor: theme.colors.gray[800],
                          }}
                        >
                          <SubTitle
                            style={{
                              textAlignVertical: "top",
                              color: theme.colors.black[0],
                              fontSize: 16,
                              fontWeight: "600",
                              paddingHorizontal: 5,
                            }}
                          >
                            {empPassword}
                          </SubTitle>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setEmpPassVisible(!isEmpPassVisible)} style={{ position: 'absolute', right: 5, bottom: 10 }}>
                        <AntDesign name='infocirlceo' size={25} color={theme.colors.gray[400]} />
                      </TouchableOpacity>
                    </View>
                  )}


                  <CustomModal
                    show={isWholeinfoVisible}
                    message={t('common:WHOLESALEMSG')}
                    onPress={() => {
                      setWholeInfoVisible(!isWholeinfoVisible);
                      setShowWholePsswrd(true);
                    }}
                  />
                  {showWholePsswrd ? (
                    <View style={{ position: 'relative' }}>
                      <CustomTextInput
                        onPressHandler={setWholesalePassword}
                        heading={t("common:WHOLESALE_PASS")}
                        headingStyle={{
                          color: theme.colors.gray[400],
                          height: 30,
                          fontSize: 16,
                          marginLeft: 5,
                          fontWeight: "600",
                        }}
                        err={
                          empPassword === Password
                            ? theme.colors.red[500]
                            : theme.colors.gray[400]
                        }
                        value={wholeSalePassword}
                        placeholder={""}
                        passwordtype={false}
                      />
                      <TouchableOpacity onPress={() => setWholeInfoVisible(!isWholeinfoVisible)} style={{ position: 'absolute', right: 5, bottom: 10 }}>
                        <AntDesign name='infocirlceo' size={25} color={theme.colors.gray[400]} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={{ position: 'relative' }}>
                      <TouchableOpacity
                        onPress={() => setWholeInfoVisible(!isWholeinfoVisible)}
                      >
                        <SubTitle
                          style={{
                            color: theme.colors.gray[400],
                            height: 30,
                            fontSize: 16,
                            marginLeft: 8,
                          }}
                        >
                          {t("common:WHOLESALE_PASS")}
                        </SubTitle>
                        <View
                          style={{
                            height: 40,
                            borderBottomWidth: 1,
                            marginHorizontal: 5,
                            borderBottomColor: theme.colors.gray[800],
                          }}
                        >
                          <SubTitle
                            style={{
                              textAlignVertical: "top",
                              color: theme.colors.black[0],
                              fontSize: 16,
                              fontWeight: "600",
                              paddingHorizontal: 5,
                            }}
                          >
                            {wholeSalePassword}
                          </SubTitle>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setWholeInfoVisible(!isWholeinfoVisible)} style={{ position: 'absolute', right: 5, bottom: 10 }}>
                        <AntDesign name='infocirlceo' size={25} color={theme.colors.gray[400]} />
                      </TouchableOpacity>
                    </View>

                  )}

                  <CustomModal
                    show={isAssoVisible}
                    message={t('common:ASSOCIATE_ID_CONTENT')}
                    onPress={() => {
                      {
                        setAssoVisible(!isAssoVisible);
                      }
                      setShowAssociate(true);
                    }}
                  />
                  {showAssociate ? (
                    <View style={{ position: 'relative' }}>
                      <CustomTextInput
                        onPressHandler={setAssociate}
                        heading={t("common:ASSOCIATED_ID")}
                        headingStyle={{
                          color: theme.colors.gray[400],
                          height: 30,
                          fontSize: 16,
                          marginLeft: 5,
                          fontWeight: "600",
                        }}
                        err={theme.colors.gray[400]}
                        value={associate}
                        placeholder={""}
                        passwordtype={false}
                      />
                      <TouchableOpacity onPress={() => setAssoVisible(!isAssoVisible)} style={{ position: 'absolute', right: 5, bottom: 10 }}>
                        <AntDesign name='infocirlceo' size={25} color={theme.colors.gray[400]} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={{ position: 'relative' }}>
                      <TouchableOpacity
                        onPress={() => setAssoVisible(!isAssoVisible)}
                      >
                        <SubTitle
                          style={{
                            color: theme.colors.gray[400],
                            height: 30,
                            fontSize: 16,
                            marginLeft: 10,
                          }}
                        >
                          {t("common:ASSOCIATED_ID")}
                        </SubTitle>
                        <View
                          style={{
                            height: 40,
                            borderBottomWidth: 1,
                            marginHorizontal: 5,
                            borderBottomColor: theme.colors.gray[800],
                          }}
                        >
                          <SubTitle
                            style={{
                              textAlignVertical: "top",
                              color: theme.colors.black[0],
                              fontSize: 16,
                              fontWeight: "600",
                              marginLeft: 10,
                              paddingTop: 5,
                            }}
                          >
                            {associate}
                          </SubTitle>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setAssoVisible(!isAssoVisible)} style={{ position: 'absolute', right: 5, bottom: 10 }}>
                        <AntDesign name='infocirlceo' size={25} color={theme.colors.gray[400]} />
                      </TouchableOpacity>
                    </View>

                  )}

                  <TouchableWithoutFeedback
                    onPress={() => {
                      setActionsheet("Delivery");
                      onOpen();
                    }}
                  >
                    <View style={[styles.inputWrapper]}>
                      <SubTitle
                        style={{
                          color: theme.colors.gray[400],
                          margin: 5,
                        }}
                      >
                        {t("common:OFFER_DELIEVERY")}
                      </SubTitle>

                      <View style={styles.subcontainer}>
                        <View
                          style={[
                            styles.textinput,
                            {
                              borderBottomColor: theme.colors.gray[400],
                            },
                          ]}
                        >
                          <View style={styles.flex10}>
                            <SubTitle
                              style={{
                                color: theme.colors.black[900],
                                height: 35,
                                fontSize: 16,
                                fontWeight: "700",
                                marginLeft: 7,
                                paddingTop: 5,
                              }}
                            >
                              {selected}
                            </SubTitle>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>

                  {actionsheet === "Delivery" ? (
                    <Actionsheet isOpen={isOpen} onClose={onClose}>
                      <Actionsheet.Content>
                        <Actionsheet.Item
                          onPress={() => {
                            setSelected("Yes");
                            setenable(1)
                            onClose();
                          }}
                        >
                          Yes
                        </Actionsheet.Item>
                        <Actionsheet.Item
                          onPress={() => {
                            setSelected("No");
                            setenable(0)
                            onClose();
                          }}
                        >
                          No
                        </Actionsheet.Item>
                      </Actionsheet.Content>
                    </Actionsheet>
                  ) : null}


                  <CustomModal
                    show={isModalVisible}
                    message={t('common:CHARGES_MODAL')}
                    onPress={() => {
                      setModalVisible(!isModalVisible);
                      setShowCharges(true);
                    }}
                  />
                  {showCharges ? (
                    <View style={{ position: 'relative' }}>
                      <CustomTextInput
                        onPressHandler={setDelivery}
                        heading={t("common:DELIVERY_CHARGES")}
                        keyboard="numeric"
                        headingStyle={{
                          color: theme.colors.gray[400],
                          height: 30,
                          fontSize: 16,
                          marginLeft: 5,
                          fontWeight: "600",
                        }}
                        err={theme.colors.gray[400]}
                        value={delivery}
                        placeholder={""}
                        passwordtype={false}
                      />
                      <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)} style={{ position: 'absolute', right: 5, bottom: 10 }}>
                        <AntDesign name='infocirlceo' size={25} color={theme.colors.gray[400]} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={{ position: 'relative' }}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(!isModalVisible)}
                      >
                        <SubTitle
                          style={{
                            color: theme.colors.gray[400],
                            height: 30,
                            fontSize: 16,
                            marginLeft: 10,
                            fontWeight: "700",
                          }}
                        >
                          {t("common:DELIVERY_CHARGES")}
                        </SubTitle>
                        <View
                          style={{
                            height: 40,
                            borderBottomWidth: 1,
                            marginHorizontal: 5,
                            borderBottomColor: theme.colors.gray[800],
                          }}
                        >
                          <SubTitle
                            style={{
                              textAlignVertical: "top",
                              color: theme.colors.black[0],
                              fontSize: 16,
                              fontWeight: "600",
                              marginLeft: 10,
                              paddingTop: 5,
                            }}
                          >
                            {delivery}
                          </SubTitle>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)} style={{ position: 'absolute', right: 5, bottom: 10 }}>
                        <AntDesign name='infocirlceo' size={25} color={theme.colors.gray[400]} />
                      </TouchableOpacity>
                    </View>
                  )}

                  <CustomModal
                    show={isVisible}
                    message={t('common:TAX_MODAL')}
                    onPress={() => {
                      setVisible(!isVisible);
                      setShowTax(true);
                    }}
                  />
                  {showTax ? (
                    <View style={{ position: 'relative' }}>
                      <CustomTextInput
                        onPressHandler={setTaxRate}
                        heading={t("common:TAX_RATE")}
                        keyboard="numeric"
                        headingStyle={{
                          color: theme.colors.gray[400],
                          height: 30,
                          fontSize: 16,
                          marginLeft: 5,
                          fontWeight: "600",
                        }}
                        err={theme.colors.gray[400]}
                        value={taxRate}
                        placeholder={""}
                        passwordtype={false}
                      />
                      <TouchableOpacity onPress={() => setVisible(!isVisible)} style={{ position: 'absolute', right: 5, bottom: 10 }}>
                        <AntDesign name='infocirlceo' size={25} color={theme.colors.gray[400]} />
                      </TouchableOpacity>
                    </View>

                  ) : (
                    <View style={{ position: 'relative' }}>
                      <TouchableOpacity onPress={() => setVisible(!isVisible)}>
                        <SubTitle
                          style={{
                            color: theme.colors.gray[400],
                            height: 30,
                            fontSize: 16,
                            marginLeft: 10,
                          }}
                        >
                          {t("common:TAX_RATE")}
                        </SubTitle>
                        <View
                          style={{
                            height: 40,
                            borderBottomWidth: 1,
                            marginHorizontal: 5,
                            borderBottomColor: theme.colors.gray[800],
                          }}
                        >
                          <SubTitle
                            style={{
                              textAlignVertical: "top",
                              color: theme.colors.black[0],
                              fontSize: 16,
                              fontWeight: "600",
                              marginLeft: 10,
                              paddingTop: 5,
                            }}
                          >
                            {taxRate}
                          </SubTitle>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setVisible(!isVisible)} style={{ position: 'absolute', right: 5, bottom: 10 }}>
                        <AntDesign name='infocirlceo' size={25} color={theme.colors.gray[400]} />
                      </TouchableOpacity>
                    </View>


                  )}
                  <CustomTextInput
                    onPressHandler={setOperation}
                    heading={t("common:HOURS_OF_OPERATION")}
                    headingStyle={{
                      color: theme.colors.gray[400],
                      height: 30,
                      fontSize: 16,
                      marginLeft: 5,
                      fontWeight: "600",
                    }}
                    err={theme.colors.gray[400]}
                    value={operation}
                    placeholder={""}
                    passwordtype={false}
                  />

                  <CustomModal
                    show={isTermsVisible}
                    message={t('common:TERMS_MODAL')}
                    onPress={() => {
                      setTermsVisible(!isTermsVisible);
                      setShowTerms(true);
                    }}
                  />
                  {showTerms ? (
                    <View style={{ position: 'relative' }}>
                      <CustomTextInput
                        onPressHandler={setTermsCondition}
                        heading={t("common:TERMS_CONDITION")}
                        headingStyle={{
                          color: theme.colors.gray[400],
                          height: 30,
                          fontSize: 16,
                          marginLeft: 5,
                          fontWeight: "600",
                        }}
                        isTextArea={true}
                        err={theme.colors.gray[400]}
                        lines={5}
                        isMultiLine={true}
                        value={termsCondition}
                        placeholder={""}
                        passwordtype={false}
                      />
                      <TouchableOpacity onPress={() => setTermsVisible(!isTermsVisible)} style={{ position: 'absolute', right: 5, bottom: 10 }}>
                        <AntDesign name='infocirlceo' size={25} color={theme.colors.gray[400]} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={{ position: 'relative' }}>
                      <TouchableOpacity
                        onPress={() => setTermsVisible(!isTermsVisible)}
                      >
                        <SubTitle
                          style={{
                            color: theme.colors.gray[400],
                            height: 30,
                            fontSize: 16,
                            marginLeft: 10,
                          }}
                        >
                          {t("common:TERMS_CONDITION")}
                        </SubTitle>
                        <View
                          style={{
                            height: 40,
                            borderBottomWidth: 1,
                            marginHorizontal: 5,
                            borderBottomColor: theme.colors.gray[800],
                          }}
                        >
                          <SubTitle
                            style={{
                              textAlignVertical: "top",
                              color: theme.colors.black[0],
                              fontSize: 16,
                              fontWeight: "600",
                              paddingHorizontal: 5,
                            }}
                          >
                            {termsCondition}
                          </SubTitle>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setTermsVisible(!isTermsVisible)} style={{ position: 'absolute', right: 5, bottom: 10 }}>
                        <AntDesign name='infocirlceo' size={25} color={theme.colors.gray[400]} />
                      </TouchableOpacity>
                    </View>
                  )}


                  <View style={{ padding: 20 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: theme.colors.gray[700],
                        fontWeight: "600",
                      }}
                    >{t("common:submit_message")}

                    </Text>
                  </View>
                  <View style={{ marginBottom: 20, backgroundColor: theme.colors.orange[600], borderRadius: 10 }} >
                    <ScreensButton
                      bgcolor={theme.colors.orange[500]}
                      iconName={""}
                      btnTitle={loading ? <Spinner size={30} color={theme.colors.appWhite[100]} /> : t('common:SUBMIT')}
                      onPress={() => addPropductOprations()} />
                  </View>
                </View>
              </ImageBackground>
            </KeyboardAwareScrollView>
          );
        }}
        stickyHeaderIndices={[0]}
      />
    </SafeAreaView>
  );
}
export default ProfileScreen;
const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
  },
  subcontainer: {
    flexDirection: "row",
  },
  imgContainer: {
    flex: 1,
  },
  inputWrapper: {
    width: "100%",
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  headerImg: {
    resizeMode: "stretch",
    overflow: "hidden",
    height: 70,
    width: "100%",
  },
  screenContainer: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  input: {
    textAlignVertical: "top",
    color: theme.colors.black[0],
    fontSize: 16,
    paddingHorizontal: 5,
  },
  textinput: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 1,
    marginHorizontal: 5,
  },
  drop: {
    height: 50,
    borderBottomWidth: 1.5,
    borderBottomColor: theme.colors.gray[300],
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "flex-start",
  },
  droptitle: {
    fontSize: 16,
    color: theme.colors.gray[400],
    marginBottom: 5,
  },
  extrainput: {
    marginLeft: 0,
    height: 50,
    paddingLeft: 0,
    fontWeight: "500",
    fontSize: 16,
    color: theme.colors.primary[900],
  },
  selected: {
    fontSize: 16,
    marginTop: 15,
    color: theme.colors.primary[900],
  },
  drop1: {
    height: 70,
    borderBottomWidth: 1.5,
    borderBottomColor: theme.colors.primary[50],
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "flex-start",
  },
  touchtext: {
    fontSize: 16,
    color: theme.colors.primary[900],
  },
  headerText: {
    color: theme.colors.primary[50],
  },
  gobackBox: {
    // position: 'relative',
    // bottom: 4,
    // // right:20,
    // left :-10,
    // width: "16%",
    // alignItems: "flex-end",
    alignSelf: 'flex-end',
    marginTop: 15,
    right: 10,
    position: 'absolute',
  },
  header: {
    width: "100%",
    height: 120,
    paddingHorizontal: 10,
    paddingTop: 15,
    alignItems: "center",
    flex: 1,
    flexWrap: "wrap",
  },
  formContainer: {
    backgroundColor: theme.colors.gray[100],
    padding: 15,
  },
  container: {
    flex: 1,
  },
  w50: {
    width: "40%",
    marginRight: 10,
  },
  w40: {
    width: "40%",
  },
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
  textStyle: {
    color: theme.colors.black[0],
    textAlign: "center",
    fontSize: 15,
    textTransform: "uppercase",
  },
  btnText: {
    color: theme.colors.appWhite[100],
  },
  buttonClose: {
    width: "100%",
    backgroundColor: theme.colors.orange[500],
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
  },
  flex10: { flex: 10 },
});

