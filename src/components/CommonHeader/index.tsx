import React from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationType } from "../../navigation/DrawerMenu";
import Feather from "react-native-vector-icons/Feather";
import { theme } from "../../theme";
import images from "../../assets/images/index";

interface IProps {
  headerBg: ImageSourcePropType;
  isback?: string;
  onBackPress?: () => boolean;
  goback?: () => void;
  leftIcon?: boolean;
  rightIcon?: boolean;
}

function HeaderLeft() {
  const navigation = useNavigation<DrawerNavigationType>();
  return (
    <TouchableOpacity
      style={styles.drawerBtn}
      onPress={() => {
        navigation?.openDrawer();
      }}
    >
      <Feather name="menu" size={22} color={theme.colors.black[0]} />
    </TouchableOpacity>
  );
}

function HeaderRight(props: any) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.gobackBtn}
      onPress={() => {
        if (props.isback == "yes") {
          props.onBackPress();
        } else {
          props.navigate();
        }
      }}
    >
      <Image source={images.BACK} />
    </TouchableOpacity>
  );
}

function CommonHeader(props: IProps) {
  const {
    isback,
    onBackPress,
    goback,
    leftIcon = true,
    rightIcon = true,
  } = props;

  return (
    <>
      <ImageBackground
        source={props.headerBg}
        style={styles.headerimg}
        imageStyle={{
          resizeMode: "cover",
          height: Platform.OS === "android" ? 480 : 550,
        }}
      >
        <View style={styles.headercontainer}>
          <View style={{ width: "50%" }}>
            {leftIcon ? <HeaderLeft /> : <View style={{ height: 50 }} />}
          </View>
          <View
            style={{
              width: "50%",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            {/* <HeaderRight isback={isback} onBackPress={onBackPress} goback={navigate} /> */}
            {rightIcon ? (
              <HeaderRight
                isback={isback}
                onBackPress={onBackPress}
                navigate={goback}
              />
            ) : null}
          </View>
        </View>
      </ImageBackground>
    </>
  );
}

export default CommonHeader;

const styles = StyleSheet.create({
  headerimg: {
    overflow: "hidden",
  },
  headercontainer: {
    paddingBottom: 5,
    paddingHorizontal: 15,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  drawerBtn: {
    backgroundColor: theme.colors.appWhite[600],
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 360,
    marginTop: Platform.OS === "ios" ? 40 : 10,
  },
  gobackBtn: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingTop: 3,
    marginTop: Platform.OS === "ios" ? 40 : 10,
  },
});
function dashRefetch() {
  throw new Error("Function not implemented.");
}
