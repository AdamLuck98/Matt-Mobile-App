import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useTranslation } from "react-i18next";
import "../../constants/IMLocalize";
import useUserInfo from "../../hooks/useUserInfo";
import images from "../../assets/images";
import { Caption, Title } from "../../components/Typography";
import InAppBrowser from "react-native-inappbrowser-reborn";

const langData = [
  { title: "ENGLISH", code: "en" },
  { title: "ESPAÑOL", code: "es" },
];
interface ILangButton {
  title: string;
  code: string;
}

interface Iprops {
  navigation: any;
}

function LanguageSelectorScreen(props: Iprops) {

  const { navigation } = props;
  const { i18n } = useTranslation();
  const { isLoggedIn } = useUserInfo();
  const selectscreen = !isLoggedIn ? "Login" : "DrawerMenu";

  const setLanguage = (code: string) => {
    return i18n.changeLanguage(code);
  };

  const [selected, setSelected] = React.useState<string>("en");

  // eslint-disable-next-line react/no-unstable-nested-components
  function LangButton(data: ILangButton) {
    const { title, code } = data;
    return (
      <TouchableOpacity
        style={[
          styles.texhtouch,
          // eslint-disable-next-line react-native/no-inline-styles
          { borderBottomWidth: selected === code ? 4 : 0 },

        ]}
      >
        <Title
          // eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
          style={{
            textAlign: "center",
            fontSize: 17,
            color: selected === code ? "#187aa6" : "black",
          }}
          onPress={() => {
            setLanguage(code);
            navigation.navigate(selectscreen);
            setSelected(code);
          }}
        >
          {title}
        </Title >
      </TouchableOpacity>
    );
  }

  const openInAppBrowser = async (url) => {
    try {
      await InAppBrowser.isAvailable();
      InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: "cancel",
        preferredBarTintColor: "white",
        preferredControlTintColor: "black",
        // Android Properties
        showTitle: true,
        toolbarColor: "#000000",
        secondaryToolbarColor: "black",
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: true,
      }).then((result) => {
        //   Alert.alert(JSON.stringify(result))
      });
    } catch (error) {
      // Alert.alert(error.message)
    }
  };

  const openUrl = (url: string) => {
    openInAppBrowser(url);
  };
  return (
    <View style={styles.screencont}>
      <ImageBackground
        resizeMode="cover"
        source={images.LOGIN_BACKGROUND}
        style={styles.screencontainer}
      >
        <Image resizeMode="contain" source={images.ICONS} style={styles.logo} />
        <View style={styles.langOption}>
          {langData.map((item, index) => {
            return (
              <View key={index} style={styles.selectors}>
                <LangButton code={item.code} title={item.title} />
              </View>
            );
          })}
          <View style={styles.subtitilecontainer}>
            <View style={styles.subtitile}>
              <TouchableOpacity onPress={() => Linking.openURL('https://kizbin.com/Terms_and_Conditions.pdf')}>
                <Caption style={styles.suntitleText}>Terms of Service</Caption>
              </TouchableOpacity>
            </View>
            {/* // eslint-disable-next-line react-native/no-inline-styles */}
            <View style={styles.subtitile}>
              <TouchableOpacity onPress={() => Linking.openURL('https://kizbin.com/Privacy_Policy.pdf')}>
                <Caption
                  // eslint-disable-next-line react-native/no-inline-styles, react-native/no-color-literals
                  style={styles.suntitleText}
                >
                  Privacy Policy
                </Caption>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  screencont: {
    flex: 1,
  },
  screencontainer: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    alignSelf: "center",
    width: "85%",
    position: "absolute",
    top: 50,
  },
  langOption: {
    marginTop: 350,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",

  },
  // eslint-disable-next-line react-native/no-color-literals
  texhtouch: {
    borderBottomColor: "#187aa6",
    padding: 10
  },
  selectors: {
    width: "50%",
  },
  subtitilecontainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 30,
    marginBottom: 20,
  },
  subtitile: {
    width: "50%",
    alignItems: "center",
  },
  // eslint-disable-next-line react-native/no-color-literals
  suntitleText: {
    textAlign: "center",
    color: "blue",
    fontSize: 14,
  },
});
export default LanguageSelectorScreen;


