import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Linking,
  Share,
  Alert,
  Platform,
  TouchableHighlight,
  GestureResponderEvent,
} from "react-native";
import { SubTitle } from "../../../components/Typography";
import { theme } from "../../../theme";
import EviIcon from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontIcon from "react-native-vector-icons/FontAwesome";
import FoundIcon from "react-native-vector-icons/Foundation";
import { useTranslation } from "react-i18next";
import InAppBrowser from "react-native-inappbrowser-reborn";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch } from "react-redux";
import LoadProfileScreen from "../../../redux/reducers/ProfileScreenReducer/reducer";
import Profilescreenstate from "../../../redux/reducers/prostatesfile/reducer";
import { ProfileLoad } from "../../../redux/reducers/ProfileScreenReducer/Action";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

interface PassProps {
  bgcolor: string;
  btnTitle: string | Element;
  onPress: (event: GestureResponderEvent) => void;
}

function BottomButtons(props: any) {
  const { navigation, dashData, userdata, navigationhandle } = props;
  const { t, i18n } = useTranslation();
  const [password, setPassword] = React.useState<string>("");
  const [loadProfile, setLoadProfile] = React.useState(false);
  // ProfileScreen
  const dispatch = useDispatch();
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          userdata?.userInfo?.CompanyName +
          t("common:SHAREMESSAGE") +
          userdata?.userInfo?.UserName.toLowerCase() +
          ".kizbin.com/buyers/store.php",
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  React.useEffect(() => {
    AsyncStorage.getItem("@user_input").then((value) => {
      if (value != null) {
        setPassword(value);
      } else {
        console.log("empty");
      }
    });
  }, []);

  const handleOrder = async () => {
    const user = userdata?.userInfo?.UserName.toLowerCase();
    const animated = true;
    const userid = userdata?.userInfo?.UserId;
    const delay = animated && Platform.OS === "ios" ? 400 : 0;
    // const result = await InAppBrowser.open(
    //   // `https://aaab.kizbin.com/seller/inventory.php?app=1&userid=${userid}&username=${user}&password=${password}`,
    //   {
    //     dismissButtonStyle: "cancel",
    //     preferredBarTintColor: "#453AA4",
    //     preferredControlTintColor: "white",
    //     readerMode: false,
    //     animated: true,
    //     modalPresentationStyle: "overFullScreen",
    //     modalTransitionStyle: "coverVertical",
    //     modalEnabled: true,
    //     enableBarCollapsing: true,
    //     showTitle: false,
    //     toolbarColor: "transparent",
    //     secondaryToolbarColor: "black",
    //     navigationBarColor: "black",
    //     navigationBarDividerColor: "white",
    //     enableUrlBarHiding: true,
    //     enableDefaultShare: true,
    //     forceCloseOnRedirection: false,
    //     animations: {
    //       startEnter: "slide_in_right",
    //       startExit: "slide_out_left",
    //       endEnter: "slide_in_left",
    //       endExit: "slide_out_right",
    //     },
    //   }
    // );
    // console.log(`https://aaab.kizbin.com/seller/inventory.php?app=1&userid=${userid}&username=${user}&password=${password}`)
  };

  function CustomeHomeButton(props: PassProps) {
    const { bgcolor, btnTitle, onPress } = props;
    return (
      <>
        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor={theme.colors.appWhite[100]}
          style={[styles.btn]}
          onPress={onPress}
        >
          <View style={[styles.block, { backgroundColor: bgcolor }]}>
            <SubTitle style={[styles.btnText]}>{btnTitle}</SubTitle>
          </View>
        </TouchableHighlight>
      </>
    );
  }

  return (
    <View style={styles.navigation}>
      <View style={styles.buttonView}>
        <CustomeHomeButton
          onPress={() => {
            dashData?.extra === 1 || dashData?.extra > 1
              ? Linking.openURL(dashData?.Catch)
              : navigationhandle("AddProduct");
          }}
          btnTitle={t("common:ADD_INVENTORY")}
          bgcolor={theme.colors.green[600]}
        />
        <View style={styles.space} />
        <CustomeHomeButton
          onPress={() =>
            dashData?.extra === 1 || dashData?.extra > 1
              ? Linking.openURL(dashData?.Catch)
              : navigationhandle("SearchProduct")
          }
          btnTitle={t("common:SEARCH_INVENTORY")}
          bgcolor={theme.colors.primary[1100]}
        />
        <View style={styles.space} />
        <CustomeHomeButton
          onPress={onShare}
          btnTitle={t("common:SHARE_CATALOG_LINK")}
          bgcolor={theme.colors.black[1000]}
        />
      </View>

      {/* {userdata?.userInfo?.UserType === 5 ? null : ( */}
      {/* <TouchableOpacity
          style={styles.navigationBtn}
          onPress={() => {
            dashData?.extra === 1 || dashData?.extra > 1
              ? Linking.openURL(dashData?.Catch)
              : navigationhandle("AddProduct");
          }}
        >
          <View
            style={[
              styles.naviicon,
              { backgroundColor: theme.colors.green[600] },
            ]}
          >
            <FontIcon
              name="dropbox"
              size={40}
              color={theme.colors.appWhite[100]}
            />
          </View>
          <SubTitle style={styles.navigationBtnText}>
            {t("common:Add")}
          </SubTitle>
          
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationBtn}
          onPress={() =>
            dashData?.extra === 1 || dashData?.extra > 1
              ? Linking.openURL(dashData?.Catch)
              : navigationhandle("SearchProduct")
          }
        >
          <View
            style={[
              styles.naviicon,
              { backgroundColor: theme.colors.lightBlue[300] },
            ]}
          >
            <EviIcon
              name="search"
              size={40}
              color={theme.colors.appWhite[100]}
            />
          </View>
          <SubTitle style={styles.navigationBtnText}>
            {t("common:Search")}
          </SubTitle>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationBtn}
          onPress={() =>
            dashData?.extra === 1 || dashData?.extra > 1
              ? Linking.openURL(dashData?.Catch)
              : navigationhandle("OrdersList")
          }
        >
          <View
            style={[
              styles.naviicon,
              { backgroundColor: theme.colors.yellow[400] },
            ]}
          >
            <EviIcon name="cart" size={40} color={theme.colors.appWhite[100]} />
          </View>
          <SubTitle style={styles.navigationBtnText}>
            {t("common:Orders")}
          </SubTitle>
        </TouchableOpacity> */}

      <View style={styles.subNav}>
        {/* {userdata?.userInfo?.UserType === 5 ? null : (
          <TouchableOpacity
            style={styles.navigationBtn}
            // const [loadProfile, setLoadProfile] = React.useState(false);
            onPress={() => {
              navigationhandle("ProfileScreen");
              dispatch(ProfileLoad(1));
            }}
          >
            <View
              style={[
                styles.naviicon,
                { backgroundColor: theme.colors.orange[500] },
              ]}
            >
              <FontIcon
                name="user"
                size={35}
                color={theme.colors.appWhite[100]}
              />
            </View>
            <SubTitle style={styles.navigationBtnText}>
              {t("common:Profile")}
            </SubTitle>
          </TouchableOpacity>
        )} */}

        {/* <TouchableOpacity style={styles.navigationBtn} onPress={onShare}>
          <View
            style={[
              styles.naviicon,
              { backgroundColor: theme.colors.black[700] },
            ]}
          >
            <FoundIcon
              name="share"
              size={25}
              color={theme.colors.appWhite[100]}
            />
          </View>
          <SubTitle style={styles.navigationBtnText}>
            {t("common:Share")}
          </SubTitle>
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.navigationBtn} onPress={()=>navigation.navigate("OutStock")}>
          <View
            style={[
              styles.naviicon,
              { backgroundColor: theme.colors.red[900] },
            ]}>
            <FontAwesome5 name="shopping-cart" size={30} color={theme.colors.appWhite[100]} />
          </View>
          <SubTitle style={styles.navigationBtnText}>{t('common:Out_Of_Stock')}</SubTitle>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={styles.navigationBtn}
          onPress={() => navigationhandle("OutStock")}
        >
          <View
            style={[
              styles.naviicon,
              { backgroundColor: theme.colors.red[900] },
            ]}
          >
            <MaterialCommunityIcons
              name="cart-off"
              size={35}
              color={theme.colors.appWhite[100]}
            />
          </View>
          <SubTitle style={styles.navigationBtnText}>
            {t("common:Out_Of_Stock")}
          </SubTitle>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

export default BottomButtons;

const styles = StyleSheet.create({
  navigation: {
    width: "100%",
    // backgroundColor: theme.colors.gray[50],
    height: 250,
    marginTop: 10,
    padding: 10,
  },
  subNav: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonView: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  space: {
    marginVertical: 10,
  },
  navigationBtn: {
    flex: 4,
    alignItems: "center",
    paddingVertical: 10,
  },
  navigationBtnText: {
    marginTop: 10,
    textAlign: "center",
    color: theme.colors.darkBlue[700],
  },
  naviicon: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    alignItems: "center",
    width: "100%",
    height: 50,
  },
  block: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnText: {
    color: theme.colors.appWhite[600],
    fontSize: 20,
    textTransform: "uppercase",
  },
});
