// import React, { useState, useRef } from 'react';
// import {
//     Dimensions,
//     SafeAreaView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
//     Image
// } from 'react-native';
// import PhotoZoom from 'react-native-photo-zoom';
// import images from '../../assets/images/index';
// import ViewShot from "react-native-view-shot";
// const height = Dimensions.get("window").height;
// const width = Dimensions.get("window").width;
// const SOURCE_IMAGE = 'https://upload.wikimedia.org/wikipedia/en/5/56/Warcraft_Teaser_Poster.jpg';
// const Rotator = (props) => {
//     const { navigation } = props;
//     const ref = useRef();
//     const { imageURL, callBack } = props.route.params;
//     const [rotation, setRotation] = useState(0);
//     const rotateImage = () => {
//         setRotation(rotation + 90);
//     };
//     const rotateImageReverce = () => {
//         setRotation(rotation - 90);
//     };
//     const [image, setImage] = useState(imageURL ? imageURL : SOURCE_IMAGE);

//     const onCancel = () => {
//         navigation.goBack()
//     }
//     const onDone = () => {
//         ref.current.capture().then(uri => {
//             setImage(uri);
//             callBack && callBack(uri);
//             navigation.goBack();
//         });
//     }
//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.imageContainer}>
//                 <ViewShot ref={ref} options={{ format: "png", quality: 0.9 }}>
//                     <View style={styles.zoomViewStyle}>
//                         <PhotoZoom
//                             source={{ uri: image }}
//                             minimumZoomScale={1}
//                             maximumZoomScale={10}
//                             androidScaleType="centerCrop"
//                             onLoad={() => { }}
//                             style={{ width: 500, height: 450, transform: [{ rotate: `${rotation}deg` }], }} />
//                     </View>
//                 </ViewShot>
//             </View>
//             <View style={styles.bottomView}>
//                 <TouchableOpacity
//                     onPress={onCancel}
//                     style={styles.cancelButton}
//                 >
//                     <Text style={styles.cancelText}>Cancel</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     onPress={() => rotateImageReverce()}
//                     style={styles.button}
//                     activeOpacity={0.75}
//                 >
//                     <Image source={images.ROTATE_LEFT}
//                         style={styles.iconStyle} />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     onPress={() => rotateImage()}
//                     style={styles.button}
//                     activeOpacity={0.75}
//                 >
//                     <Image source={images.ROTATE_RIGHT}
//                         style={styles.iconStyle} />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     onPress={() => onDone()}
//                     style={[styles.cancelButton, { paddingRight: 10 }]}
//                 >
//                     <Text style={styles.text}>Done</Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     );
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'black',
//     },
//     button: {
//         margin: 5,
//         alignSelf: "center",
//         paddingBottom: 10
//     },
//     cancelButton: {
//         padding: 5,
//         margin: 5,
//         alignSelf: "center"
//     },
//     imageContainer: {
//         justifyContent: 'center',
//         flex: 0.9,
//     },
//     text: {
//         color: '#8B8000',
//     },
//     cancelText: {
//         color: '#7EB5F8',
//     },
//     zoomViewStyle: {
//         width: width * 0.99,
//         height: height * 0.5,
//         overflow: 'hidden',
//         borderColor: 'white',
//         borderWidth: 2
//     },
//     bottomView: {
//         justifyContent: 'space-between',
//         flex: 0.1,
//         flexDirection: "row",
//         backgroundColor: "#2E2E2E"
//     },
//     iconStyle: {
//         height: 35,
//         width: 35,
//         resizeMode: "contain",
//     }
// });
// export default Rotator;

// If not work this then open top code and rename this file to Rotator.js
import React, { useState, useRef } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import PhotoZoom from "react-native-photo-zoom";
import images from "../../assets/images/index";
import ViewShot from "react-native-view-shot";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const SOURCE_IMAGE =
  "https://upload.wikimedia.org/wikipedia/en/5/56/Warcraft_Teaser_Poster.jpg";

interface RotatorProps {
  navigation: any; // Replace with the actual type of navigation
  route: {
    params: {
      imageURL?: string;
      callBack?: (uri: string) => void;
    };
  };
}

const Rotator: React.FC<RotatorProps> = (props: any) => {
  const { navigation } = props;
  const ref = useRef<ViewShot>(null);
  const { imageURL, callBack } = props.route.params;
  const [rotation, setRotation] = useState(0);

  const rotateImage = () => {
    setRotation(rotation + 90);
  };

  const rotateImageReverce = () => {
    setRotation(rotation - 90);
  };

  const [image, setImage] = useState(imageURL ? imageURL : SOURCE_IMAGE);

  const onCancel = () => {
    navigation.goBack();
  };

  const onDone = () => {
    ref.current?.capture().then((uri: string | undefined) => {
      if (uri) {
        setImage(uri);
        callBack && callBack(uri);
        navigation.goBack();
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <ViewShot ref={ref} options={{ format: "png", quality: 0.9 }}>
          <View style={styles.zoomViewStyle}>
            <PhotoZoom
              source={{ uri: image }}
              minimumZoomScale={1}
              maximumZoomScale={10}
              androidScaleType="centerCrop"
              onLoad={() => { }}
              style={{
                width: 500,
                height: 450,
                transform: [{ rotate: `${rotation}deg` }],
              }}
            />
          </View>
        </ViewShot>
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => rotateImageReverce()}
          style={styles.button}
          activeOpacity={0.75}
        >
          <Image source={images.ROTATE_LEFT} style={styles.iconStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => rotateImage()}
          style={styles.button}
          activeOpacity={0.75}
        >
          <Image source={images.ROTATE_RIGHT} style={styles.iconStyle} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDone()}
          style={[styles.cancelButton, { paddingRight: 10 }]}
        >
          <Text style={styles.text}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  button: {
    margin: 5,
    alignSelf: "center",
    paddingBottom: 10,
  },
  cancelButton: {
    padding: 5,
    margin: 5,
    alignSelf: "center",
  },
  imageContainer: {
    justifyContent: "center",
    flex: 0.9,
  },
  text: {
    color: "#8B8000",
  },
  cancelText: {
    color: "#7EB5F8",
  },
  zoomViewStyle: {
    width: width * 0.99,
    height: height * 0.5,
    overflow: "hidden",
    borderColor: "white",
    borderWidth: 2,
  },
  bottomView: {
    justifyContent: "space-between",
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: "#2E2E2E",
  },
  iconStyle: {
    height: 35,
    width: 35,
    resizeMode: "contain",
  },
});

export default Rotator;
