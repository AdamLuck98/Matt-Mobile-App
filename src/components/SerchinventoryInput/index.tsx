//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useDisclose, Actionsheet } from 'native-base';
import { theme } from '../../theme';
// import {
//     FONT_GOOGLE_BARLOW_REGULAR as FONT_GOOGLE_BARLOW,
//     FONT_GOOGLE_BARLOW_SEMIBOLD,
// } from "../screens/constants/fonts";

interface IProps {
    label: string;
}

function SearchInventoryInput(props: IProps) {
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclose();
    return (
        <>
            <TouchableWithoutFeedback
                onPress={onOpen}
            >
                <View>
                    <Text style={[styles.droptitle, { marginLeft: 10 }]}>
                        {props.label}
                    </Text>

                    <View style={styles.drop}>
                        <Text style={styles.selected}>
                            master text
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <Actionsheet isOpen={isOpen} onClose={onClose}>
                <Actionsheet.Content>
                    <Actionsheet.Item>Option 1</Actionsheet.Item>
                    <Actionsheet.Item>Option 2</Actionsheet.Item>
                    <Actionsheet.Item>Option 3</Actionsheet.Item>
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    droptitle: {
        fontSize: 14,
        color: "#808080",
        textTransform: 'capitalize',
        // fontFamily: FONT_GOOGLE_BARLOW_SEMIBOLD,
    },
    drop: {
        height: 50,
        borderBottomWidth: 1.5,
        borderBottomColor: "#b4b4b4",
        marginBottom: 25,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "flex-start",
    },
    selected: {
        fontSize: 16,
    }
});

export default SearchInventoryInput;
