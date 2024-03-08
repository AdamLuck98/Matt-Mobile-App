import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Image,
  ImageSourcePropType,
} from "react-native";
import { SubTitle, Title } from "../../../components/Typography";
import { theme } from "../../../theme";
import { useTranslation } from "react-i18next";
import images from "../../../assets/images";
import FearIcon from "react-native-vector-icons/Feather";

interface ILangButton {
  flag: ImageSourcePropType;
  code: string;
}
function LangButton(data: ILangButton) {
  const { flag, code } = data;
  const { t, i18n } = useTranslation();
  const setLanguage = (code: string) => {
    return i18n.changeLanguage(code);
  };
  const selectedLang = t("common:Welcome") === "Welcome" ? "en" : "es";
  const [selected, setSelected] = React.useState<string>(selectedLang);
  return (
    <TouchableOpacity
      onPress={() => {
        setLanguage(code);
        setSelected(code);
      }}
      style={{
        backgroundColor: theme.colors.gray[100],
        height: 35,
        width: 35,
        borderRadius: 360,
      }}
    >
      <Image
        source={flag}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: 20,
        }}
      />
    </TouchableOpacity>
  );
}
function HedingTitile(props: any) {
  const { userdata, drawerNavigation } = props;
  const { t, i18n } = useTranslation();
  const lang = t("common:lang");

  const langData = [
    { flag: images.US_FLAG, code: "en" },
    { flag: images.SPAN_FLAG, code: "es" },
  ];

  return (
    <View style={styles.drawerView}>
      <TouchableOpacity style={styles.drawer} onPress={drawerNavigation}>
        <FearIcon name="menu" size={22} color="black" />
      </TouchableOpacity>
      <SubTitle style={styles.WerlcomeText}>{t("common:Welcome")}!</SubTitle>
      <View style={styles.companyFlag}>
        <View style={styles.companyBox}>
          <Title style={styles.companyText}>
            {userdata?.userInfo?.CompanyName || ""}
          </Title>
          {/* <View>
                        <SubTitle
                            style={styles.companySite}>
                            {userdata?.userInfo?.UserName || ''}
                            {t('common:kizbin_com')}
                        </SubTitle>
                    </View> */}
        </View>
        <View style={styles.flag}>
          <View style={styles.flagbox}>
            {lang === "English" ? (
              <LangButton code={langData[1].code} flag={langData[1].flag} />
            ) : (
              <LangButton code={langData[0].code} flag={langData[0].flag} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

export default HedingTitile;
const styles = StyleSheet.create({
  drawerView: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 5,
  },

  WerlcomeText: {
    color: theme.colors.black[0],
    textTransform: "uppercase",
  },
  companyFlag: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 10,
  },
  companyBox: {
    width: "80%",
  },
  companyText: {
    fontSize: 30,
    lineHeight: 30,
    textTransform: "capitalize",
    color: theme.colors.black[0],
  },
  companySite: {
    color: theme.colors.black[0],
  },
  flag: {
    width: "20%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  flagbox: {
    width: "9%",
    position: "absolute",
    top: -10,
  },
  drawer: {
    backgroundColor: theme.colors.gray[100],
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: Platform.OS === "ios" ? 30 : 10,
    marginBottom: 10,
  },
});
