import { theme } from 'native-base';
import React from 'react';
import { View, Image, StyleSheet, Dimensions, ImageSourcePropType } from 'react-native';
import images from '../../assets/images';

const width = Dimensions.get('window').width;

interface IProps {
    image: string;
}
function SearchResultImg(props: IProps) {
    const { image } = props
    return (
        <View style={styles.imgView}>
            <Image
                source={
                    image ? { uri: image } : images.LOGIN_LOGO
                }
                resizeMode='contain' style={styles.productImg} />
        </View>
    );
};

const styles = StyleSheet.create({
    imgView: {
        width: width * 0.2,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    productImg: {
        width: '100%',
        height: 75,
        borderRadius: 8
    }
});

export default SearchResultImg;
