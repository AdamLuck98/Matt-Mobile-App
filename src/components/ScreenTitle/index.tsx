/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../../theme';
// import {
//     FONT_GOOGLE_BARLOW_REGULAR as FONT_GOOGLE_BARLOW,
//     FONT_GOOGLE_BARLOW_SEMIBOLD,
// } from "../screens/constants/fonts";

interface IProps {
    title: string
}
function ScreensTitle(props: IProps) {
    return (
        <View style={styles.container}>
            <Text
                style={styles.title}>
                {props.title}
            </Text>
        </View>
    )
}

export default ScreensTitle;


const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: theme.colors.appWhite[600],
        paddingTop: 15,
        paddingBottom: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        textAlignVertical: "center",
        textTransform: 'uppercase',
        // fontFamily: FONT_GOOGLE_BARLOW_SEMIBOLD,
        color: theme.colors.black[1000]
    }
});

