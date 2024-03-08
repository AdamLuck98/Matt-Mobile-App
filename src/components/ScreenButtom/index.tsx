//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, GestureResponderEvent } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { theme } from '../../theme';
import { SubTitle } from '../../components/Typography/index'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface IProps {
    bgcolor: string;
    iconName: string;
    btnTitle: string | Element;
    onPress: (event: GestureResponderEvent) => void;
    veiryicon?: any;
}

// create a component
function ScreensButton(props: IProps) {

    const { bgcolor, iconName, btnTitle, onPress, veiryicon } = props

    return (
        <>
            <TouchableHighlight activeOpacity={0.7} underlayColor={theme.colors.appWhite[100]} style={[styles.btn]} onPress={onPress}>
                <View style={[styles.block, { backgroundColor: bgcolor }]}>
                    {iconName == '' ? null : <AntDesign name={iconName} color={theme.colors.appWhite[600]} size={25} />}

                    <SubTitle style={[styles.btnText, { marginLeft: iconName == '' ? 0 : 12 }]}>{btnTitle}</SubTitle>
                    {veiryicon ? <MaterialIcons style={{ marginLeft: 10 }} size={17} color={theme.colors.primary[500]} name="verified" /> : null}
                </View>
            </TouchableHighlight>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        width: '100%',
    },
    block: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 8,
    },
    btnText: {
        color: theme.colors.appWhite[600],
        fontSize: 16,
        textTransform: 'uppercase',
    }
});

//make this component available to the app
export default ScreensButton;
