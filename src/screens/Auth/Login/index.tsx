import React, { useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  Alert,
  Animated,
  Keyboard,
  Text
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import messaging from "@react-native-firebase/messaging";
import { Formik } from "formik";
import * as yup from "yup";
import images from "../../../assets/images";
import { theme } from "../../../theme";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../redux/reducers/user/UserServices";
import { SubTitle, Caption } from "../../../components/Typography/index";
import CustomeButton from "../../../components/CustomeButton";
import { useTranslation } from "react-i18next";
import DeviceInfo from "react-native-device-info";
import { Spinner } from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import UesrFilterOpration from "./Qureis/UesrFilterOpration";
import LottieView from 'lottie-react-native';
import animation from '../../../assets/lottieAnimation/index';

function Login({ navigation }: { navigation: any }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [togglepassword, setTogglePassword] = React.useState(true);
  const [fcmToken, setFcmToken] = React.useState("");
  const [loading, Setloading] = React.useState(false);
  const { UesrFilter } = UesrFilterOpration();

  const getfcmToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        setFcmToken(fcmToken);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getfcmToken();
  }, []);

  const loginValidationSchema = yup.object().shape({
    userName: yup.string().required("User Name is Required"),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  const handleLogin = async (values: any) => {
    Keyboard.dismiss();
    Setloading(true);
    AsyncStorage.setItem("@user_input", values.password);
    const response: any = await UesrFilter({
      do: "Login",
      username: values.userName,
      password: values.password,
      osname: Platform.OS === "android" ? "and" : "ios",
      device_id: DeviceInfo.getDeviceId(),
      token: fcmToken,
    });
    if (response?.UserType === 5) {
      Alert.alert(
        "Kizbin",
        t("common:EMPLOGINMESSGE"),
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "CONTINUE WITH LOGIN",
            onPress: () => {
              dispatch(
                userLogin({
                  do: "Login",
                  username: values.userName,
                  password: values.password,
                  osname: Platform.OS === "android" ? "and" : "ios",
                  device_id: DeviceInfo.getDeviceId(),
                  token: fcmToken,
                })
              );
            },
          },
        ]
      );
    } else {
      dispatch(
        userLogin({
          do: "Login",
          username: values.userName,
          password: values.password,
          osname: Platform.OS === "android" ? "and" : "ios",
          device_id: DeviceInfo.getDeviceId(),
          token: fcmToken,
        })
      );
    }

    setTimeout(() => {
      Setloading(false);
    }, 2600);
  };
  return (
    <ImageBackground source={images.LOGIN_BACKGROUND} style={styles.bgImg}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.mainContainer}>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              <View style={styles.hight20} />

              <Image source={images.ICONS} style={styles.headlogo} />

              <Formik
                validationSchema={loginValidationSchema}
                initialValues={{
                  userName: "",
                  password: "",
                }}
                onSubmit={handleLogin}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  isValid,
                }) => (
                  <>
                    <View
                      style={[
                        styles.inputBox,
                        {
                          borderBottomColor: errors.userName
                            ? theme.colors.red[400]
                            : theme.colors.gray[800],
                        },
                      ]}
                    >
                      <TextInput
                        style={styles.input}
                        autoCapitalize="characters"
                        placeholder={t("common:usenamee")}
                        placeholderTextColor={theme.colors.black[0]}
                        onChangeText={handleChange("userName")}
                        onBlur={handleBlur("userName")}
                        value={values.userName.toLocaleUpperCase()}
                        keyboardType="email-address"
                      />
                      <View style={styles.icon}>
                        <Feather
                          name="user"
                          color={theme.colors.blue[50]}
                          size={20}
                        />
                      </View>
                    </View>
                    <View style={styles.hight20} />
                    <View
                      style={[
                        styles.inputBox,
                        {
                          borderBottomColor: errors.password
                            ? theme.colors.red[400]
                            : theme.colors.gray[800],
                        },
                      ]}
                    >
                      <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder={t("common:password")}
                        placeholderTextColor={theme.colors.black[0]}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        secureTextEntry={togglepassword}
                      />
                       
                      <View style={styles.icon}>
                        {togglepassword ? (
                          <TouchableOpacity
                            onPress={() => setTogglePassword(!togglepassword)}
                          >
                            <Entypo
                              name="eye-with-line"
                              color={theme.colors.blue[50]}
                              size={20}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => setTogglePassword(!togglepassword)}
                          >
                            <Entypo
                              name="eye"
                              color={theme.colors.blue[50]}
                              size={20}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                    <Text style={styles.termsAndConditionText}>{t("common:TERMS_AND_CONDITIONS")}</Text>
                    <View style={styles.hight20} />
                    
                    <CustomeButton
                      disabled={!isValid}
                      value={
                        loading ? (
                          <Spinner
                            size={30}
                            color={theme.colors.appWhite[100]}
                          />
                        ) : (
                          t("common:login")
                        )
                      }
                      onPressHandler={handleSubmit}
                    />
                  </>
                )}
              </Formik>

              <View style={styles.hight20} />

              <SubTitle
                style={styles.createText}
                onPress={() => navigation.navigate("ForgetPassword")}
              >
                {t("common:forget_user_id")}
              </SubTitle>

              {/* <SubTitle
                style={styles.createAccountText}
                onPress={() => Linking.openURL("https://kizbin.com/")}
              >
                {t("common:No_account")}
              </SubTitle> */}

              {loading ? <Animated.View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <LottieView
                  style={{ width: "25%" }}
                  source={animation.UNSPLASH}
                  autoPlay
                  loop
                />
              </Animated.View> : null}

            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default Login;

const styles = StyleSheet.create({
  safeAreaView: {
    flexGrow: 1,
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  scroll: {
    justifyContent: "center",
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  bgImg: {
    flex: 1,
  },
  headlogo: {

    height: "40%",
    alignSelf: "center",
    resizeMode: "contain",
    marginVertical: "14%",
  },
  inputBox: {
    borderBottomWidth: 1,
    flexDirection: "row",
    padding: 5,
    width: "100%",
  },
  input: {
    flex: 11,
    fontSize: 16,
    color: theme.colors.black[0],
  },
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hight20: {
    height: 20,
  },
  buttomlogo: {
    alignSelf: "center",
    resizeMode: "contain",
    height: 30,
    marginVertical: 40,
  },
  emtydive: {
    height: 200,
    borderWidth: 1,
  },
  contain: {
    padding: 40,
  },
  emtysecond: {
    height: 30,
  },
  createText: {
    fontSize: Platform.OS == "android" ? 20 : 17,
    color: theme.colors.gray[600],
  },
  createAccountText: {
    ...Platform.select({
      ios: {
        fontSize: 17,
        color: theme.colors.gray[600],
        marginTop: 25,
      },
      android: {
        fontSize: 20,
        color: theme.colors.gray[600],
        marginTop: 20,
      },
    }),
  },
  termsAndConditionText: {
    fontSize: Platform.OS == "android" ? 20 : 17,
    color: theme.colors.gray[600],
    marginTop: 20,
  },
  ///
  logo: {
    width: "70%",
  },
});
