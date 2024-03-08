import React from "react";
import {
  Animated,
  StyleSheet,
  View,
  Alert
} from "react-native";
import images from "../../../assets/images";
import useUserInfo from "../../../hooks/useUserInfo";
import animation from '../../../assets/lottieAnimation/index';
import LottieView from 'lottie-react-native';
import VoiceToText from "../../../components/VoiceToText";


function UnSplash(props: any) {
  const { navigation } = props;
  const { isLoggedIn } = useUserInfo();
  return (
    <View style={styles.container}>
      <Animated.Image
        source={images.ICONS}
        fadeDuration={0}
        resizeMode="contain"
        onLoadEnd={() => {
          setTimeout(function () {
            navigation.navigate("DrawerMenu");
          }, 1500);
        }}
        style={[
          styles.logo,
          {
            opacity: Animated.fadeAnim,
          },
        ]}
      />
      <Animated.View>
         <LottieView
          style={{ width: "30%" }}
          source={animation.UNSPLASH}
          autoPlay
          loop
        /> 
      </Animated.View>
      <VoiceToText />
    </View>
  );
}

export default UnSplash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  logo: {
    width: "70%",
  },
});
