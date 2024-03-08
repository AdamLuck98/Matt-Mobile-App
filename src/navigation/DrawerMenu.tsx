import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerItemList,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { Linking, Share } from "react-native";
import { Text, ScrollView, View, Divider } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Foundation from "react-native-vector-icons/Foundation";
import { TouchableOpacity, Platform, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { theme } from "../theme";
import { SCREEN_WIDTH } from "../constants/common";
import { userLogout } from "../redux/reducers/user/UserActions";
import useUserInfo from "../hooks/useUserInfo";
import AddProduct from "../screens/AddProduct/index";
import OrdersList from "../screens/OrdersList";
import OrderProductDetail from "../screens/OrdersList/Component/OrderProductDetail";
import ProfileScreen from "../screens/Profile";
import EditScreen from "../screens/EditScreen";
import Search from "../screens/SererchProduct";
import Homescreen from "../screens/Home";
import { Caption, SubTitle } from "../components/Typography";
import Allocation from "../screens/SererchProduct/components/Allocation";
import Thislocation from "../screens/SererchProduct/components/ThisLocation";
import OutStock from "../screens/SererchProduct/components/OutStock";
import AsyncStorage from "@react-native-community/async-storage";
import InAppBrowser from "react-native-inappbrowser-reborn";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ProfileLoad } from "../redux/reducers/ProfileScreenReducer/Action";

export type DrawerParamList = {
  Home: undefined;
  SearchProduct: undefined;
  AddProduct: undefined;
  OrdersList: undefined;
  OrderProductDetail: undefined;
  ProfileScreen: undefined;
  EditScreen: undefined;
  Allocation: undefined;
  Thislocation: undefined;
  OutStock: undefined;
};

const langData = [
  { title: "english", code: "en" },
  { titel: "spanish", code: "es" },
];

interface ILangButton {
  title: string;
  code: string;
}

export type DrawerNavigationType = DrawerNavigationProp<DrawerParamList, any>;
const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerWithLogoutButton(props: DrawerContentComponentProps) {
  const { navigation } = props;
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const userdata = useUserInfo();
  const setLanguage = (code: string) => {
    return i18n.changeLanguage(code);
  };

  const [password, setPassword] = React.useState<string>("");
  let lang = t("common:lang");

  const selectEng = () => {
    setLanguage("en");
    // setSelected('en');
  };

  const selectEsp = () => {
    setLanguage("es");
    // setSelected('es');
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          userdata?.userInfo?.CompanyName +
          t("common:SHAREMESSAGE") +
          userdata?.userInfo?.UserName.toLowerCase() +
          ".kizbin.com/buyers/store.php",
      });
    } catch (error) {
      console.log("error", error);
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

  const openLink = async () => {
    const user = userdata?.userInfo?.UserName.toLowerCase();
    const animated = true;
    const userid = userdata?.userInfo?.UserId;

    const delay = animated && Platform.OS === "ios" ? 400 : 0;
    // const result = await InAppBrowser.open(
    //   `https://aaab.kizbin.com/seller/inventory.php?app=1&userid=${userid}&username=${user}&password=${password}`,
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
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeAreaView}>
      <View style={styles.drawerHead}>
        <SubTitle style={styles.drawerTitle}>
          {userdata?.userInfo?.CompanyName}
        </SubTitle>
        <View style={styles.langBtnBox}>
          <TouchableOpacity onPress={selectEng}>
            {lang == "English" ? (
              <SubTitle style={styles.headBtnText}>ENGLISH</SubTitle>
            ) : (
              <Caption style={styles.headBtnText}>ENGLISH</Caption>
            )}
          </TouchableOpacity>
          <Text style={styles.headBtnText}> | </Text>
          <TouchableOpacity onPress={selectEsp}>
            {lang == "Española" ? (
              <SubTitle style={styles.headBtnText}>ESPAÑOL</SubTitle>
            ) : (
              <Caption style={styles.headBtnText}>ESPAÑOL</Caption>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Divider my={1} />

      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => navigation.navigate("Home")}
      >
        <View
          style={[
            styles.iconStyle,
            { backgroundColor: theme.colors.primary[300] },
          ]}
        >
          <FontAwesome color="#fff" name="home" size={25} />
        </View>
        <SubTitle style={styles.btnText}>{t("common:HOME")}</SubTitle>
      </TouchableOpacity>
      {userdata?.userInfo?.UserType === 5 ? null : (
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() =>
            navigation.navigate("AddProduct", { masterCat: "fake Master" })
          }
        >
          <View
            style={[
              styles.iconStyle,
              { backgroundColor: theme.colors.green[400] },
            ]}
          >
            <AntDesign color="#fff" name="dropbox" size={25} />
          </View>
          <SubTitle style={styles.btnText}>{t("common:Add")}</SubTitle>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => navigation.navigate("SearchProduct")}
      >
        <View
          style={[
            styles.iconStyle,
            { backgroundColor: theme.colors.skyblue[100] },
          ]}
        >
          <EvilIcons color="#fff" name="search" size={30} />
        </View>
        <SubTitle style={styles.btnText}>{t("common:Search")}</SubTitle>
      </TouchableOpacity>

      {/*<TouchableOpacity
        style={styles.btnStyle}
        onPress={() => navigation.navigate("OrdersList")}
      >
        <View
          style={[
            styles.iconStyle,
            { backgroundColor: theme.colors.yellow[400] },
          ]}
        >
          <EvilIcons color="#fff" name="cart" size={30} />
        </View>
        <SubTitle style={styles.btnText}>{t("common:Orders")}</SubTitle>
      </TouchableOpacity> */}

      {/* <TouchableOpacity style={styles.btnStyle} onPress={openLink}>
        <View
          style={[
            styles.iconStyle,
            { backgroundColor: theme.colors.purple[400] },
          ]}
        >
          <FontAwesome5 color="#fff" name="shopping-cart" size={20} />
        </View>
        <SubTitle style={styles.btnText}>{t("common:CREATE_ORDER")}</SubTitle>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => navigation.navigate("OutStock")}
      >
        <View
          style={[styles.iconStyle, { backgroundColor: theme.colors.red[900] }]}
        >
          <MaterialCommunityIcons
            name="cart-off"
            size={20}
            color={theme.colors.appWhite[100]}
          />
        </View>
        <SubTitle style={styles.btnText}>{t("common:Out_Of_Stock")}</SubTitle>
      </TouchableOpacity>

      {/*<TouchableOpacity style={styles.btnStyle} onPress={onShare}>
        <View
          style={[
            styles.iconStyle,
            { backgroundColor: theme.colors.gray[700] },
          ]}
        >
          <Foundation color="#fff" name="share" size={25} />
        </View>
        <SubTitle style={styles.btnText}>{t("common:Share")}</SubTitle>
        </TouchableOpacity> */}

      <TouchableOpacity style={styles.btnStyle} onPress={handleLogout}>
        <View
          style={[
            styles.iconStyle,
            { backgroundColor: theme.colors.gray[700] },
          ]}
        >
          <MaterialCommunityIcons
            name="logout"
            size={20}
            color={theme.colors.appWhite[100]}
          />
        </View>
        <SubTitle style={styles.btnText}>{t("common:Logout")}</SubTitle>
      </TouchableOpacity>

      <View style={styles.mainContainer}>
        <ScrollView {...props} showsVerticalScrollIndicator={false}>
          <DrawerItemList {...props} />
        </ScrollView>
      </View>

      {/* {userdata?.userInfo?.UserType === 5 ? null : (
        <TouchableOpacity
          style={[styles.btnStyle, styles.profileBtn]}
          onPress={() => { navigation.navigate("ProfileScreen"); dispatch(ProfileLoad(1)) }}
        >
          <View
            style={[
              styles.iconStyle,
              { backgroundColor: theme.colors.yellow[400] },
            ]}
          >
            <FontAwesome color="#fff" name="user" size={25} />
          </View>
          <SubTitle style={styles.btnText}>{t("common:Profile")} </SubTitle>
        </TouchableOpacity>
      )} */}

      {/* <TouchableOpacity
        style={[styles.btnStyle, styles.logoutBtn]}
        onPress={handleLogout}
      >
        <View style={styles.item}>
          <SubTitle style={[styles.label, styles.logoutText]}>
            {t("common:Logout")}
          </SubTitle>
        </View>
          </TouchableOpacity> */}
    </SafeAreaView>
  );
}

export default function DrawerScreens() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerWithLogoutButton {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme.colors.appWhite[600],
          width: SCREEN_WIDTH * 0.75,
        },
        drawerType: "front",
      }}
    >
      <Drawer.Screen
        component={Homescreen}
        name="Home"
        options={{
          headerShown: false,
          drawerLabel: () => null,
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        component={Search}
        name="SearchProduct"
        options={{
          headerShown: false,
          drawerLabel: () => null,
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        component={Allocation}
        name="Allocation"
        options={{
          headerShown: false,
          drawerLabel: () => null,
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        component={Thislocation}
        name="Thislocation"
        options={{
          headerShown: false,
          drawerLabel: () => null,
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        component={OutStock}
        name="OutStock"
        options={{
          headerShown: false,
          drawerLabel: () => null,
          drawerItemStyle: { height: 0 },
        }}
      />

      <Drawer.Screen
        component={AddProduct}
        name="AddProduct"
        options={{
          headerShown: false,
          drawerLabel: () => null,
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        component={OrdersList}
        name="OrdersList"
        options={{
          headerShown: false,
          drawerLabel: () => null,
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        component={OrderProductDetail}
        name="OrderProductDetail"
        options={{
          headerShown: false,
          drawerLabel: () => null,
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        component={ProfileScreen}
        name="ProfileScreen"
        options={{
          headerShown: false,
          drawerLabel: () => null,
          drawerItemStyle: { height: 0 },
        }}
      />
      <Drawer.Screen
        component={EditScreen}
        name="EditScreen"
        options={{
          headerShown: false,
          drawerLabel: () => null,
          drawerItemStyle: { height: 0 },
        }}
      />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  drawerHead: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 30,
  },
  drawerTitle: {
    color: "#00b8e4",
    marginTop: 5,
    marginBottom: 15,
    letterSpacing: 2,
    textTransform: "capitalize",
    fontSize: 20,
  },
  langBtnBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  headBtnText: {
    fontSize: 16,
    color: theme.colors.black[0],
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  label: {
    fontSize: 15,
    marginHorizontal: 20,
    color: theme.colors.black[900],
  },

  displayName: {
    fontSize: 17,
    fontFamily: "DMSans-Medium",
    color: theme.colors.red[700],
  },

  mainContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  listView: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  profileHeader: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 15,
  },
  safeAreaView: { flexGrow: 1, backgroundColor: theme.colors.appWhite[800] },
  btnStyle: {
    height: Platform.OS == "ios" ? 60 : 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 7,
    borderBottomColor: "#00000050",
    borderBottomWidth: 0.3,
    width: "100%",
  },
  iconStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#000",
    // fontFamily: FONT_GOOGLE_BARLOW_SEMIBOLD,
    fontSize: 16,
    marginLeft: 12,
    textTransform: "capitalize",
  },
  padding7: {
    paddingVertical: 5,
    backgroundColor: theme.colors.appWhite[100],
  },
  profileBtn: {
    backgroundColor: theme.colors.appWhite[100],
    height: Platform.OS == "ios" ? 70 : 60,
    marginVertical: 0,
    borderBottomWidth: 0,
  },
  logoutBtn: {
    backgroundColor: theme.colors.primary[300],
    height: Platform.OS == "ios" ? 70 : 60,
    justifyContent: "center",
    marginVertical: 0,
    borderBottomWidth: 0,
  },
  logoutText: {
    color: theme.colors.appWhite[100],
    fontSize: 16,
  },
});
