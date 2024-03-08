import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Platform } from 'react-native';
import { ImageOrVideo } from "react-native-image-crop-picker";
import images from '../../assets/images';
import { theme } from '../../theme';
import { Avatar } from '../Avatar';
import ScreensButton from '../ScreenButtom';

interface IProps {
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    image5: string;
    image6: string;
    image7: string;
    image8: string;
    image9: string;
    image10: string;
    setImage1: (text: string) => void;
    setImage2: (text: string) => void;
    setImage3: (text: string) => void;
    setImage4: (text: string) => void;
    setImage5: (text: string) => void;
    setImage6: (text: string) => void;
    setImage7: (text: string) => void;
    setImage8: (text: string) => void;
    setImage9: (text: string) => void;
    setImage10: (text: string) => void;
    setimage_1o: (text: object) => void;
    setimage_2o: (text: object) => void;
    setimage_3o: (text: object) => void;
    setimage_4o: (text: object) => void;
    setimage_5o: (text: object) => void;
    setimage_6o: (text: object) => void;
    setimage_7o: (text: object) => void;
    setimage_8o: (text: object) => void;
    setimage_9o: (text: object) => void;
    setimage_10o: (text: object) => void;
    HandlePhotoBtn: () => void;
    showPics: boolean;
}

function CustomImageGallery(props: IProps) {
    const { image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, setImage1, setImage2, setImage3, setImage4, setImage5, setImage6, setImage7, setImage8, setImage9, setImage10, setimage_1o, setimage_2o, setimage_3o, setimage_4o, setimage_5o, setimage_6o, setimage_7o, setimage_8o, setimage_9o, setimage_10o, HandlePhotoBtn, showPics } = props;
    const { t, i18n } = useTranslation();
    const [imgposition, setimgposition] = useState(0);

    const onAvatarChange = (image: ImageOrVideo) => {
        var obj = {
            name: "image_" + imgposition + ".jpg",
            isset: 0,
            type: image.mime,
            uri:
                Platform.OS == "android"
                    ? image.path
                    : image.path.replace("", "file://"),
            size: image.size,
        };
        switch (imgposition) {
            case 1:
                setImage1(obj.uri);
                setimage_1o(obj);
                break;
            case 2:
                setImage2(obj.uri);
                setimage_2o(obj);
                break;
            case 3:
                setImage3(obj.uri);
                setimage_3o(obj);
                break;
            case 4:
                setImage4(obj.uri);
                setimage_4o(obj);
                break;
            case 5:
                setImage5(obj.uri);
                setimage_5o(obj);
                break;
            case 6:
                setImage6(obj.uri);
                setimage_6o(obj);
                break;
            case 7:
                setImage7(obj.uri);
                setimage_7o(obj);
                break;
            case 8:
                setImage8(obj.uri);
                setimage_8o(obj);
                break;
            case 9:
                setImage9(obj.uri);
                setimage_9o(obj);
                break;
            case 10:
                setImage10(obj.uri);
                setimage_10o(obj);
                break;
        }
    };

    return (
        <View>
            <ScreensButton
                bgcolor={
                    image1 == "" && image2 == "" && image3 == "" && image4 == ""
                        ? theme.colors.primary[500]
                        : theme.colors.yellow[400]
                }
                btnTitle={t("common:PHOTOS")}
                iconName=""
                onPress={HandlePhotoBtn}
            />
            {showPics ? <View style={styles.cameraContainer}>
                <View style={styles.imgBox}>
                    <Avatar
                        onChange={onAvatarChange}
                        setpos={() => setimgposition(1)}
                        pos={imgposition}
                        source={image1 ? { uri: image1 } : images.CAMERA}
                    />
                </View>

                <View style={styles.imgBox}>
                    <Avatar onChange={onAvatarChange}
                        setpos={() => setimgposition(2)}
                        pos={imgposition}
                        source={image2 ? { uri: image2 } : images.CAMERA_PLUS}
                    />
                </View>

                {image2 ?
                    <View style={styles.imgBox}>
                        <Avatar onChange={onAvatarChange}
                            setpos={() => setimgposition(3)}
                            pos={imgposition}
                            source={image3 ? { uri: image3 } : images.CAMERA_PLUS}
                        />
                    </View>
                    : null}

                {image3 ?
                    <View style={styles.imgBox}>
                        <Avatar onChange={onAvatarChange}
                            setpos={() => setimgposition(4)}
                            pos={imgposition}
                            source={image4 ? { uri: image4 } : images.CAMERA_PLUS}
                        />
                    </View>
                    : null}

                {image4 ?
                    <View style={styles.imgBox}>
                        <Avatar onChange={onAvatarChange}
                            setpos={() => setimgposition(5)}
                            pos={imgposition}
                            source={image5 ? { uri: image5 } : images.CAMERA_PLUS}
                        />
                    </View>
                    : null}

                {image5 ?
                    <View style={styles.imgBox}>
                        <Avatar onChange={onAvatarChange}
                            setpos={() => setimgposition(6)}
                            pos={imgposition}
                            source={image6 ? { uri: image6 } : images.CAMERA_PLUS}
                        />
                    </View>
                    : null}

                {image6 ?
                    <View style={styles.imgBox}>
                        <Avatar onChange={onAvatarChange}
                            setpos={() => setimgposition(7)}
                            pos={imgposition}
                            source={image7 ? { uri: image7 } : images.CAMERA_PLUS}
                        />
                    </View>
                    : null}

                {image7 ?
                    <View style={styles.imgBox}>
                        <Avatar onChange={onAvatarChange}
                            setpos={() => setimgposition(8)}
                            pos={imgposition}
                            source={image8 ? { uri: image8 } : images.CAMERA_PLUS}
                        />
                    </View>
                    : null}

                {image8 ?
                    <View style={styles.imgBox}>
                        <Avatar onChange={onAvatarChange}
                            setpos={() => setimgposition(9)}
                            pos={imgposition}
                            source={image9 ? { uri: image9 } : images.CAMERA_PLUS}
                        />
                    </View>
                    : null}

                {image9 ?
                    <View style={styles.imgBox}>
                        <Avatar onChange={onAvatarChange}
                            setpos={() => setimgposition(10)}
                            pos={imgposition}
                            source={image10 ? { uri: image10 } : images.CAMERA_PLUS}
                        />
                    </View>
                    : null}
            </View> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        marginTop: 10,
        flexWrap: "wrap",
    },
    imgBox: {
        width: "40%",
        height: 100,
        borderWidth: 0.2,
        marginVertical: 10,
        marginHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CustomImageGallery;
