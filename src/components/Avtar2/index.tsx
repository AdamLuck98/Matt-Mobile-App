import React, { useState } from 'react';
import { Image, ImageProps, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { Actionsheet, useDisclose, Box, Divider } from 'native-base'
import { theme } from '../../theme';
import ScreensButton from '../ScreenButtom';
import { t } from 'i18next';
import { SubTitle } from '../Typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



interface AvatarProps extends ImageProps {
    onChange?: (image: ImageOrVideo) => void;
    setpos: () => void;
    pos: number;
    show: boolean;
}

export const Avatar2 = (props: AvatarProps) => {
    const [uri, setUri] = React.useState(props.source?.uri || undefined);
    const [isOpen, setIsOpen] = useState(false);

    function onOpen() {
        setIsOpen(true);
        props.setpos();
    }

    function onClose() {
        setIsOpen(false);
    }

    const chooseImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
        })
            .then(image => {
                setUri(image.path);
                props.onChange?.(image);
            })
            .finally(onClose);


    };

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
        })
            .then(image => {
                setUri(image.path);
                props.onChange?.(image);

            })
            .finally(onClose);

    };
    return (
        <View>
            <TouchableOpacity style={{ width: 80, height: 80, justifyContent: 'center', alignItems: 'center', display: props.show == true ? 'flex' : 'none' }} onPress={onOpen}>
                <MaterialCommunityIcons name="camera-plus" size={50} />
            </TouchableOpacity>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Box w="100%" h={120} px={4} py={4} justifyContent="center">
                        <View style={styles.block}>
                            <TouchableOpacity style={styles.button} onPress={chooseImage}>
                                <FontAwesome name='picture-o' size={40} color="black" />
                                <SubTitle>Select from Gallery</SubTitle>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={openCamera}>
                                <FontAwesome name='camera' size={40} color="black" />
                                <SubTitle>Add from Camera</SubTitle>
                            </TouchableOpacity>
                        </View>
                    </Box>
                </Actionsheet.Content>
            </Actionsheet>
        </View>
    );


};

const styles = StyleSheet.create({
    avatar: {
        height: 100,
        width: 100,
    },
    block: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        padding: 5,
        alignItems: 'center',
    }
});