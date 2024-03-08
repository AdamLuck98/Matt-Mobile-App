import React, { useCallback, useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Button,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Spinner } from "native-base";
import { useDashboardData } from "./Queries/useDashboardData";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/index";
import { theme } from "../../theme";
import images from "../../assets/images/index";
import useUserInfo from "../../hooks/useUserInfo";
import RetryComponent from "../../components/RetryComponent";
import { useIsFocused } from "@react-navigation/native";
import HedingTitile from "./components/HedingTitile";
import OrderStatus from "./components/OrderStatus";
import BottomButtons from "./components/BottomButtons";
import { useFocusEffect } from "@react-navigation/native";
import VoiceToText from "../../components/VoiceToText";

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;

function Homescreen(props: HomeScreenProps) {
  const { navigation } = props;
  const userdata = useUserInfo();
  const { t, i18n } = useTranslation();
  const lang = t("common:lang");
  const isFocused = useIsFocused();

  const {
    isLoading,
    data: dashData,
    isError,
    refetch,
  } = useDashboardData({
    do: "GetDash",
    userid: userdata?.userInfo?.UserId || "",
    UserName: userdata?.userInfo?.UserName || "",
    password: userdata?.userInfo?.PasswordUser || "",
    lang: lang === "English" ? "en" : "es",
  });

  const handleNavigate = () => {
    navigation?.openDrawer();
  };
  useFocusEffect(
    useCallback(() => {
      return () => {
        refetch();
      };
    }, [isFocused])
  );
  const handleSubScription = (value: any) => {
    if (dashData?.extra === 1 || dashData?.extra > 1) {
      Linking.openURL(dashData?.Catch);
      if (dashData?.extra > 1 || dashData?.Catch) {
        Linking.openURL(dashData?.Catch);
      }
    } else {
      navigation.navigate(value);
    }
  };
  if (isLoading) {
    return (
      <View style={styles.loadingcontainer}>
        <Spinner size={30} />
      </View>
    );
  }

  if (isError) {
    return <RetryComponent onPress={() => refetch()} />;
  }
  // useEffect(()=>{
  //   refetch()
  // },[isFocused])

  return (
    <ImageBackground
      style={styles.screenContainer}
      source={images.LOGIN_BACKGROUND}
    >
      <View style={styles.main}>
        <HedingTitile userdata={userdata} drawerNavigation={handleNavigate} />
        <View style={{ paddingBottom: 40 }}>
          <OrderStatus dashData={dashData} />
          <VoiceToText />
        </View>
        <BottomButtons
          dashData={dashData}
          userdata={userdata}
          navigationhandle={handleSubScription}
        />
      </View>
    </ImageBackground>
  );
}

export default Homescreen;

const styles = StyleSheet.create({
  loadingcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screenContainer: {
    flex: 1,
  },
  main: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  center2: {
    margin: 20,
    borderWidth: 1,
  },
  center3: {
    margin: 20,
    borderWidth: 1,
  },
  navView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  listItemContainer: {
    backgroundColor: "transparent",
    height: 90,
    justifyContent: "center",
    width: "100%",
    borderColor: theme.colors.gray[100],
    marginBottom: 5,
    shadowColor: theme.colors.darkBlue[900],
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7.11,
    elevation: 10,
  },
});
