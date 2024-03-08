import React, { useState } from "react";
import Octicons from "react-native-vector-icons/Octicons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { View, Image } from "react-native";
import { theme } from "../../theme";
import images from '../../assets/images/index'

function Icons(props: { name: string, value: boolean }) {
  // setToggle(value)

  const { name, value } = props;
  // const [Toggle, setToggle] = useState(true);

  switch (name) {
    case "person":
      return (
        <Octicons color={theme.colors.blue[100]} name="person" size={20} />
      );
      break;
    case "eye":
      return (
        value === true ? (
          <Entypo color={theme.colors.blue[100]} name="eye-with-line" size={20} />
        ) : (
          <Entypo color={theme.colors.blue[100]} name="eye" size={20} />
        )
      )


      break;

    case "mic":
      return (
        <FontAwesome
          color={theme.colors.blue[100]}
          name="microphone"
          size={30}
        />
      );
      break;

    //new changes
    case "speak":
      return (
        <Image
          source={images.VOICE}
          style={{
            height: 35,
            width: 35,
            resizeMode: "contain",
          }}
        />
      );
      break;

    case "emty":
      return <View />;
      break;

    default:
    // code block
  }
}

export default Icons;
